package com.passionroad.passionroad.studyroom.service;

import com.passionroad.passionroad.member.domain.Member;
import com.passionroad.passionroad.member.repository.MemberRepository;
import com.passionroad.passionroad.studyroom.entity.EnterMember;
import com.passionroad.passionroad.studyroom.entity.StudyRoom;
import com.passionroad.passionroad.studyroom.repository.EnterMemberRepository;
import com.passionroad.passionroad.studyroom.repository.StudyRoomRepository;
import com.passionroad.passionroad.studyroom.request.RequestDTO;
import io.openvidu.java.client.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;

//@Slf4j
@Log4j2
@Service
@Transactional
@RequiredArgsConstructor
public class StudyRoomService {

    private final StudyRoomRepository studyRoomRepository; // 스터디룸
    private final MemberRepository memberRepository;
    private final EnterMemberRepository enterMemberRepository;
    private final TodayPassionroadService todayPassionroadService;
    private final OpenVidu openVidu;

    // 1. StudyRoom 생성 : StudyRoom 이 없다면 생성 후 반환, 있다면 원래 것 반환
    // 2. Session 생성 : Session 이 없다면 생성 후 반환, 있다면 원래 것 반환
    // 3. EnterMember 생성 : StudyRoom과 Session을 생성하고 StudyRoom 을 join하는 EnterMember 생성
    // 3-1. EnterMember 엔티티 : StudyRoom에 입장한 Member 각각을 하나의 레코드로 저장
    public String getOrCreateRoom(RequestDTO requestDTO, SessionProperties properties) throws OpenViduJavaClientException, OpenViduHttpException {

        log.info("StudyRoomService: getOrCreateRoom() ---------------------");

        // openvidu 서버와 Spring 서버의 active session 동기화
        if(openVidu.fetch()){
            log.info("openvidu fetch changed");
        }else{
            log.info("openvidu fetch changed nothing");
        }

        String customSessionId = requestDTO.getCustomSessionId();
        //  값이 없으면 null 반환
        StudyRoom studyRoom = studyRoomRepository.findByTitle(customSessionId).orElse(null);
        Member member = memberRepository.findByMid(requestDTO.getMid()).orElseThrow();

        for(Session session : openVidu.getActiveSessions()){

            String sessionId = session.getSessionId();

            if(sessionId.equals(customSessionId)){
                if(studyRoom != null){
                    // 1. session, studyroom 모두 존재
                    // 전에 생성된 적 있고, 지금 회의중
                    log.info("1. session, studyroom 모두 존재 : " + session);

                    // 스터디룸 회원인지 확인하고 아니면 가입
                    if(enterRoom(studyRoom, member)){
                        log.info("EnterMember 입장");
                    }else{
                        log.info("studyroom is full");
                        return "studyroom is full";
                    }

                    return sessionId;
                }

                // 2. session 존재, studyroom 없음
                // studyroom 생성 오류, 지금 회의중
                log.info("2. session 존재, studyroom 없음 : " + session);

                studyRoom = StudyRoom.create(customSessionId);
                studyRoomRepository.save(studyRoom);

                // 스터디룸 회원인지 확인하고 아니면 가입
                if(enterRoom(studyRoom, member)){
                    log.info("EnterMember 입장");
                }else{
                    log.info("studyroom is full");
                    return "studyroom is full";
                }

                return sessionId;
            }
        }

        // 3. session 없음, studyroom 존재
        // 전에 생성된 적 있음, 현재 회의중 아님
        if(studyRoom != null){
            log.info("3. session 없음, studyroom 존재");

            Session createdSession = openVidu.createSession(properties);
            // 스터디룸 회원인지 확인하고 아니면 가입
            if(enterRoom(studyRoom, member)){
                log.info("EnterMember 입장");
            }else{
                log.info("studyroom is full");
                return "studyroom is full";
            }

            return createdSession.getSessionId();
        }

        // 4. session 없음, studyroom 없음
        // 전에 생성된 적도 없고, 회의중도 아님
        log.info("4. session 없음, studyroom 없음");

        studyRoom = StudyRoom.create(customSessionId);
        studyRoomRepository.save(studyRoom);
        Session createdSession = openVidu.createSession(properties);

        // 스터디룸 회원인지 확인하고 아니면 가입
        // 스터디룸 회원인지 확인하고 아니면 가입
        if(enterRoom(studyRoom, member)){
            log.info("EnterMember 입장");
        }else{
            log.info("studyroom is full");
            return "studyroom is full";
        }

        return createdSession.getSessionId();
    }

    // studyroom에 사용자 가입 ( EnterMember 반환하고 외부에서 lastEnterAt 변경 하도록 수정 )
    public boolean enterRoom(StudyRoom studyRoom, Member member){

        // StudyRoom 에 처음 입장한다면
        if(!enterMemberRepository.existsByStudyRoomAndMember(studyRoom, member)){
            // studyroom 정원이 가득찼다면
            if(studyRoom.plusMemberCount() == -1){
                return false;
            }else{
                // enterMember 엔티티에 추가
                EnterMember enterMember = EnterMember.builder()
                        .studyRoom(studyRoom)
                        .member(member)
                        .lastEnteredAt(System.currentTimeMillis())  // 입장시간 초기화
                        .build();
                enterMemberRepository.save(enterMember);

                // studyRoom memberCount + 1 완료
                studyRoomRepository.save(studyRoom);    // +1 후 db 저장

                return true;
            }
        }else{
            // 이미 member가 studyroom 의 구성원임
            EnterMember enterMember = enterMemberRepository.findByStudyRoomAndMember(studyRoom, member).orElseThrow();

            // 입장시간 초기화
            enterMember.setLastEnterAt();

            return true;
        }

    }



    // 1. sessionId 로 session 을 찾고 하나의 session 을 위한 인증 token 반환
    // 2. session 이 없다면 에러메세지 전송
    public String createConnection(String sessionId, ConnectionProperties properties) throws OpenViduJavaClientException, OpenViduHttpException{
        log.info("StudyRoomService: createConnection() -----------------");

        // openvidu 서버와 Spring 서버의 active session 동기화
        if(openVidu.fetch()){
            log.info("openvidu fetch changed");
        }else{
            log.info("openvidu fetch changed nothing");
        }

        // getOrCreateSession() 에서 반환한 sessionId를 다시 받아서 session 객체 찾기
        Session session = openVidu.getActiveSession(sessionId);
        log.info("active session : " + session);

        // 생성된 session이 없다면
        if (session == null) {
            // session 을 찾지 못했다는 에러 메세지 전송
            log.info("Not Found Error");
            return "Not Found Error";
        }
        // connection properties 객체로 connection 생성
        Connection connection = session.createConnection(properties);

        return connection.getToken();
    }

    // 스터디 목록 페이지 전체 화상 채팅방 조회
    public List<StudyRoom> readAllRoom() {
        return studyRoomRepository.findAllByOrderByCreatedAtDesc();
    }

    // 스터디 목록 페이징처리
    public Page<StudyRoom> getStudyRoomPage(int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        return studyRoomRepository.findAllByOrderByCreatedAtDesc(pageable);
    }

    // 사용자가 참여한 스터디룸 반환
    public Map<String, Object> getJoinedStudyRoom(String mid){

        Member member = memberRepository.findByMid(mid).orElseThrow();
        List<EnterMember> enterMemberList = enterMemberRepository.findAllByMember(member).orElseThrow();

        // studyroom 저장할 map
        HashMap<String, Object> joinedStudyRoom = new HashMap<>();

        // enterMember가 참여한 StudyRoom 을 Map에 저장(key 중복x)
        enterMemberList.forEach(enterMember -> {
            StudyRoom studyRoom = enterMember.getStudyRoom();
            joinedStudyRoom.put(studyRoom.getTitle(), studyRoom);
        });

        return joinedStudyRoom;
    }


    // 클라이언트가 연결 종료버튼 누르면 발생
    public String setStudyTime(String roomTitle, String mid) {

        StudyRoom studyRoom = studyRoomRepository.findByTitle(roomTitle).orElseThrow();
        Member member = memberRepository.findByMid(mid).orElseThrow();

        EnterMember enterMember = enterMemberRepository.findByStudyRoomAndMember(studyRoom, member).orElseThrow();

        // 해당 멤버의 마지막 공부시간 수정
        Long leftAt = enterMember.setLastLeftAt();

        // 해당 세션에서 공부한 시간 (밀리초)
        Long studyTime = leftAt - enterMember.getLastEnteredAt();

        // 공부한시간 변환
        Long studyTimeMinutes = studyTime / 1000 / 60;  // ex 63745ms -> 63s -> 1m

        // 오늘 공부한 시간에 누적, member 총 열정도에 누적
        Long todayStudyTime = todayPassionroadService.accumulateTodayPassionroad(member, studyTimeMinutes);

        return "오늘 공부한시간 " + todayStudyTime;
    }


    // 스터디룸의 입장 유저정보 조회
    public List<EnterMember> enterUsers(String roomId) {
        StudyRoom studyRoom = studyRoomRepository.findByRoomId(roomId).orElseThrow();
        return enterMemberRepository.findByStudyRoom(studyRoom).orElseThrow();
    }



    //방 진입
//    public List<EnterMemberResponseDto> enterRoom(StudyRoomEnterRequestDto roomEnterRequestDto, String userName) throws OpenViduJavaClientException, OpenViduHttpException {
//
//        // 사용자정보 담은 Member 찾기
//        UserDetails userDetails = apiUserDetailsService.loadUserByUsername(userName);
//        MemberDTO memberDTO = (MemberDTO) userDetails;
//        Member member = memberDTO.toEntity();
//        String roomId = roomEnterRequestDto.getRoomId();
//
//        // 받은 룸id로 내가 입장할 받을 찾음
//        StudyRoom studyRoom = studyRoomRepository.findByRoomId(roomId).orElseThrow(
//                () -> new IllegalArgumentException("해당 방이 존재하지 않습니다."));
//
//        // 들어갈 방에서 유저를 찾음
//        EnterMember enterCheck = enterMemberRepository.findByStudyRoomAndMember(studyRoom, member);
//
//        // 내가 입장할 방이 추방당한 방인지 확인
//        BanMember banMemberCheck = banMemberRepository.findByStudyRoomAndMember(studyRoom, member);
//        if (banMemberCheck != null) {
//            throw new MemberException(MemberExceptionType.BAN_USER_ROOM);
//        }
//
//        boolean roomStatusCheck = studyRoom.isStudying();
//
//        // 스터디가 진행중이라면 입장 불가.
//        if (roomStatusCheck == true) {
//            throw new MemberException(MemberExceptionType.ROOM_STATUS_TRUE);
//        }
//
//        // 해당 방에 입장 되어있는 경우 (이미 입장한 방인경우)
//        if (enterCheck != null) {
//            throw new MemberException(MemberExceptionType.HAS_ENTER_ROOM);
//        }
//        //들어갈 방을 찾음? (들어온 유저가 몇명인지 체크 ?) (동일한 룸이 몇개인지 확인하여 리스트에 담아 몇명인지를 확인)
//        List<EnterMember> enterMemberSize = enterMemberRepository.findByStudyRoom(studyRoom);
//
//        //방을 입장할때마다 몇명이 있는지 확인하는 로직(입장인원 초과 확인)
//        int maxMember = studyRoom.getMaxMember();
//        if (enterMemberSize.size() > 0) {
//            if (maxMember < enterMemberSize.size() + 1) {
//                throw new MemberException(MemberExceptionType.ENTER_MAX_USER);
//            }
//        }
//
//        // 나가기 처리가 되지않아 내가 아직 특정방에 남아있는상태라면
//        EnterMember enterMemberCheck = enterMemberRepository.findAllByMember(member);
//        if (enterMemberCheck != null) {
//            enterMemberRepository.delete(enterMemberCheck);
//        }
//
//        Long memberCount = studyRoom.getMemberCount() + 1;
//        //유저카운터 증가
//        studyRoom.setMemberCount(memberCount);
//        studyRoomRepository.save(studyRoom);
//
//        //방에 입장시 유저 한명이되는꼴
//        EnterMember enterMember = new EnterMember(member, studyRoom);
//        enterMember.setEnteredAt(LocalDateTime.now()); // 방에 입장한 시간 설정
//        enterMemberRepository.save(enterMember);
//
//        // OpenVidu 세션에 사용자 추가
//        Session session = (Session) redisTemplate.opsForValue().get(roomEnterRequestDto.getRoomId());
//        if (session == null) {
//            throw new IllegalArgumentException("세션을 찾을 수 없습니다.");
//        }
//        String token = session.generateToken();
//        // Token은 클라이언트에게 반환하여 사용자가 세션에 접속할 수 있도록 함
//
//        // 방에 입장한 사람들을 리스트에 담음
//        List<EnterMember> enterMembers = enterMemberRepository.findByStudyRoom(studyRoom);
//        List<EnterMemberResponseDto> enterStudyRoomMembers = new ArrayList<>();
//        for (EnterMember enterMember2 : enterMembers) {
//            String tokenForUser = session.generateToken(); // 각 사용자에 대해 고유한 토큰 생성
//            enterStudyRoomMembers.add(new EnterMemberResponseDto(
//                    //방에 입장한 유저의 이름
//                    enterMember2.getMember().getMid(),
//                    // 방에 입장한 유저의 OpenVidu 세션 토큰
//                    tokenForUser
//            ));
//        }
//        return enterStudyRoomMembers;
//    }

    //방 나가기
//    @Transactional
//    public void quitRoom(String roomId, String userName) throws OpenViduJavaClientException, OpenViduHttpException {
//
//        UserDetails userDetails = apiUserDetailsService.loadUserByUsername(userName);
//        MemberDTO memberDTO = (MemberDTO) userDetails;
//        Member member = memberDTO.toEntity();
//
//        //내가입장한 방을 찾음
//        StudyRoom studyRoom = studyRoomRepository.findByRoomId(roomId).orElseThrow(
//                ()-> new IllegalArgumentException("해당 방이 존재하지 않습니다."));
//
//        // OpenVidu 세션 종료
//        Session session = (Session) redisTemplate.opsForValue().get(roomId);
//        if (session != null) {
//            Connection connection = session.getConnection(member.getMid());
//            if (connection != null) {
//                session.forceDisconnect(connection);
//            }
//        }
//
//        //방에서 내가 입장했던 스터디룸을 찾은다음
//        EnterMember enterMember =  enterMemberRepository.findByStudyRoomAndMember(studyRoom, member);
//        enterMember.setLeftAt(LocalDateTime.now()); // 떠난 시간을 현재 시간으로 설정
//
//        // 누적 사용시간 계산
//        Duration duration = Duration.between(enterMember.getEnteredAt(), enterMember.getLeftAt());
//        long seconds = duration.getSeconds(); // 초 단위로 시간 변환
//        long minutes = seconds / 60; // 초 단위로 받은 시간을 분으로 변경 (열정도는 분 단위이기 때문)
//
//        memberService.addAccumulatedTime(member, minutes); // MemberService를 이용하여 누적 사용시간 추가
//
//        enterMemberRepository.save(enterMember); // 변화된 시간을 업데이트
//
//        enterMemberRepository.delete(enterMember); // 방을 나간 상태로 만듦
//
//        //내가 방을 나갔으니, room의 유저 카운터를 -1 해준다
//        Long memberCount = studyRoom.getMemberCount() - 1;
//        //유저카운터 감소
//        studyRoom.setMemberCount(memberCount);
//        studyRoomRepository.save(studyRoom);
//
//        //userCount 체크하여 0이면 다 나간것으로 간주하여 방 폭파
//        if (studyRoom.getMemberCount() == 0) {
//            List<BanMember> banMember = banMemberRepository.findAllByStudyRoom(studyRoom);
//            if (banMember != null) {
//                banMemberRepository.deleteAll(banMember);
//            }
//            studyRoomRepository.delete(studyRoom);
//            // Redis에서 해당 방의 세션 제거
//            redisTemplate.delete(roomId);
//        }
//    }





//
//    //메인페이지 상위 8개 화상 채팅방 조회
//    @Transactional
//    public List<StudyRoom> mainPageReadRoom() {
//        return studyRoomRepository.findTop8ByOrderByCreatedAtDesc();
//    }



    // 스터디목록 페이지 조회
//    @Transactional
//    public Page<StudyRoom> getTagRoom(int page, int size, String sortBy, String recruit, String tag1, String tag2, String tag3, String keyword) {
//        Sort.Direction direction = Sort.Direction.DESC;
//        Sort sort = Sort.by(direction, sortBy);
//        Pageable pageable = PageRequest.of(page, size, sort);
//        Specification<StudyRoom> spec = (root, query, criteriaBuilder) -> null;
//        if(recruit.equals("recruiting"))
//            spec = spec.and(StudyRoomSpecification.equalStudying(false));
//        if (!tag1.equals("null"))
//            spec = spec.and(StudyRoomSpecification.equalTag1(tag1));
//        if (!tag2.equals("null"))
//            spec = spec.and(StudyRoomSpecification.equalTag2(tag2));
//        if (!tag3.equals("null"))
//            spec = spec.and(StudyRoomSpecification.equalTag3(tag3));
//        if (!keyword.equals("null"))
//            spec = spec.and(StudyRoomSpecification.equalTitle(keyword));
//        return studyRoomRepository.findAll(spec, pageable);
//    }


    // 스터디룸 검색 기능
//    public Page<StudyRoom> roomSearch(int page, int size, String keyword) {
//        Pageable pageable = PageRequest.of(page, size);
//        return studyRoomRepository.findAllByTitleContainingIgnoreCaseOrderByCreatedAtDesc(pageable, keyword);
//    }
}