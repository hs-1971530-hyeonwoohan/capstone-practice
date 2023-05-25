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
            if(studyRoom.getMemberCount() >= studyRoom.getMaxMember()){
                // 현재 멤버 수 >= 최대 멤버 수
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
                studyRoom.plusMemberCount();
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

}