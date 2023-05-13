package com.passionroad.passionroad.studyroom.service;

import com.passionroad.passionroad.exception.MemberException;
import com.passionroad.passionroad.exception.MemberExceptionType;
import com.passionroad.passionroad.member.domain.Member;
import com.passionroad.passionroad.member.dto.MemberDTO;
import com.passionroad.passionroad.security.APIUserDetailsService;
import com.passionroad.passionroad.studyroom.entity.BanMember;
import com.passionroad.passionroad.studyroom.entity.EnterMember;
import com.passionroad.passionroad.studyroom.entity.StudyRoom;
import com.passionroad.passionroad.studyroom.repository.BanMemberRepository;
import com.passionroad.passionroad.studyroom.repository.EnterMemberRepository;
import com.passionroad.passionroad.studyroom.repository.StudyRoomRepository;
import com.passionroad.passionroad.studyroom.repository.StudyRoomSpecification;
import com.passionroad.passionroad.studyroom.request.StudyRoomEnterRequestDto;
import com.passionroad.passionroad.studyroom.request.StudyRoomRequestDto;
import com.passionroad.passionroad.studyroom.response.EnterMemberResponseDto;
import com.passionroad.passionroad.studyroom.response.StudyRoomResponseDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class StudyRoomService {

    private final StudyRoomRepository studyRoomRepository; // 스터디룸
    private final EnterMemberRepository enterMemberRepository;
    private final BanMemberRepository banMemberRepository;

    private final APIUserDetailsService apiUserDetailsService;


    public StudyRoomResponseDto createRoom(StudyRoomRequestDto requestDto, MemberDTO memberDTO){

        if (studyRoomRepository.findByTitle(requestDto.getTitle()) != null) {
            throw new IllegalArgumentException("이미 존재하는 방 이름입니다.");
        }

        if (requestDto.getTitle() == null || requestDto.getTitle().equals(" ")) {
            throw new IllegalArgumentException("방 이름을 입력해주세요.");
        }

        if (requestDto.getTag1() == null) {
            throw new IllegalArgumentException("기업분류를 선택해주세요");
        } else if (requestDto.getTag2() == null) {
            throw new IllegalArgumentException("신입/경력을 선택해주세요");
        } else if (requestDto.getTag3() == null) {
            throw new IllegalArgumentException("면접 유형을 선택해주세요");
        }

        int maxUser = requestDto.getMaxUser();
        if(maxUser < 2){
            throw new IllegalArgumentException("인원수를 선택해주세요");
        }


        Member member = memberDTO.toEntity();
        StudyRoom studyRoom = StudyRoom.create(requestDto, member, maxUser);
        StudyRoom createRoom = studyRoomRepository.save(studyRoom);
        String title = createRoom.getTitle();
        String roomId = createRoom.getRoomId();
        Long userCount = 0L;
        String tag1 = createRoom.getTag1();
        String tag2 = createRoom.getTag2();
        String tag3 = createRoom.getTag3();
        LocalDateTime createAt = createRoom.getCreatedAt();

        return new StudyRoomResponseDto(title, roomId, userCount, maxUser, tag1, tag2, tag3, createAt, memberDTO);
    }

    //방 진입
    public List<EnterMemberResponseDto> enterRoom(StudyRoomEnterRequestDto roomEnterRequestDto, String userName) {
//        Member member = memberDetails.getMember();
        UserDetails userDetails = apiUserDetailsService.loadUserByUsername(userName);
        MemberDTO memberDTO = (MemberDTO) userDetails;
        Member member = memberDTO.toEntity();
        String roomId = roomEnterRequestDto.getRoomId();
        // 받은 룸id로 내가 입장할 받을 찾음
        StudyRoom studyRoom = studyRoomRepository.findByRoomId(roomId).orElseThrow(
                () -> new IllegalArgumentException("해당 방이 존재하지 않습니다."));

        // 들어갈 방에서 유저를 찾음
        EnterMember enterCheck = enterMemberRepository.findByStudyRoomAndMember(studyRoom, member);

        // 내가 입장할 방이 추방당한 방인지 확인
        BanMember banMemberCheck = banMemberRepository.findByStudyRoomAndMember(studyRoom, member);
        if (banMemberCheck != null) {
            throw new MemberException(MemberExceptionType.BAN_USER_ROOM);
        }

        boolean roomStatusCheck = studyRoom.isStudying();

        // 스터디가 진행중이라면 입장 불가.
        if (roomStatusCheck == true) {
            throw new MemberException(MemberExceptionType.ROOM_STATUS_TRUE);
        }

        // 해당 방에 입장 되어있는 경우 (이미 입장한 방인경우)
        if (enterCheck != null) {
            throw new MemberException(MemberExceptionType.HAS_ENTER_ROOM);
        }
        //들어갈 방을 찾음? (들어온 유저가 몇명인지 체크 ?) (동일한 룸이 몇개인지 확인하여 리스트에 담아 몇명인지를 확인)
        List<EnterMember> enterMemberSize = enterMemberRepository.findByStudyRoom(studyRoom);

        //방을 입장할때마다 몇명이 있는지 확인하는 로직(입장인원 초과 확인)
        int maxMember = studyRoom.getMaxMember();
        if (enterMemberSize.size() > 0) {
            if (maxMember < enterMemberSize.size() + 1) {
                throw new MemberException(MemberExceptionType.ENTER_MAX_USER);
            }
        }

        // 나가기 처리가 되지않아 내가 아직 특정방에 남아있는상태라면
        EnterMember enterMemberCheck = enterMemberRepository.findAllByMember(member);
        if (enterMemberCheck != null) {
            enterMemberRepository.delete(enterMemberCheck);
        }

        Long memberCount = studyRoom.getMemberCount() + 1;
        //유저카운터 증가
        studyRoom.setMemberCount(memberCount);
        studyRoomRepository.save(studyRoom);

        //방에 입장시 유저 한명이되는꼴

        EnterMember enterMember = new EnterMember(member, studyRoom);
        enterMemberRepository.save(enterMember);

        // 방에 입장한 사람들을 리스트에 담음
        List<EnterMember> enterMembers = enterMemberRepository.findByStudyRoom(studyRoom);
        List<EnterMemberResponseDto> enterStudyRoomMembers = new ArrayList<>();
        for (EnterMember enterMember2 : enterMembers) {
            enterStudyRoomMembers.add(new EnterMemberResponseDto(
                    //방에 입장한 유저의 이름
                    enterMember2.getMember().getMid()
                    //방에 입장한 유저의 프로필
//                    enterMember2.getMember().getProfileImg()
            ));
        }
        return enterStudyRoomMembers;
    }

    //방 나가기
    @Transactional
    public void quitRoom(String roomId, String userName) {

        UserDetails userDetails = apiUserDetailsService.loadUserByUsername(userName);
        MemberDTO memberDTO = (MemberDTO) userDetails;
        Member member = memberDTO.toEntity();

        //내가입장한 방을 찾음
        StudyRoom studyRoom = studyRoomRepository.findByRoomId(roomId).orElseThrow(()-> new IllegalArgumentException("해당 방이 존재하지 않습니다."));
        //방에서 내가 입장했던 스터디룸을 찾은다음
        EnterMember enterMember =  enterMemberRepository.findByStudyRoomAndMember(studyRoom, member);
        // 그 기록을 지워서 내가 들어가있던 상태를 나간 상태로 만든다.
        enterMemberRepository.delete(enterMember);
        //내가 방을 나갔으니, room의 유저 카운터를 -1 해준다
        Long memberCount = studyRoom.getMemberCount() - 1;
        //유저카운터 감소
        studyRoom.setMemberCount(memberCount);
        studyRoomRepository.save(studyRoom);

        //userCount 체크하여 0이면 다 나간것으로 간주하여 방 폭파
        if (studyRoom.getMemberCount() == 0) {
            List<BanMember> banMember = banMemberRepository.findAllByStudyRoom(studyRoom);
            if (banMember != null) {
                banMemberRepository.deleteAll(banMember);
            }
            studyRoomRepository.delete(studyRoom);
        }
    }
    // 스터디 목록 페이지 전체 화상 채팅방 조회
    public List<StudyRoom> allReadRoom() {
        return studyRoomRepository.findAllByOrderByCreatedAtDesc();
    }

    //메인페이지 상위 8개 화상 채팅방 조회
    @Transactional
    public List<StudyRoom> mainPageReadRoom() {
        return studyRoomRepository.findTop8ByOrderByCreatedAtDesc();
    }

    // 스터디 목록 페이징처리
    @Transactional
    public Page<StudyRoom> getPageRoom(int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        return studyRoomRepository.findAllByOrderByCreatedAtDesc(pageable);
    }

    // 스터디목록 페이지 조회
    @Transactional
    public Page<StudyRoom> getTagRoom(int page, int size, String sortBy, String recruit, String tag1, String tag2, String tag3, String keyword) {
        Sort.Direction direction = Sort.Direction.DESC;
        Sort sort = Sort.by(direction, sortBy);
        Pageable pageable = PageRequest.of(page, size, sort);
        Specification<StudyRoom> spec = (root, query, criteriaBuilder) -> null;
        if(recruit.equals("recruiting"))
            spec = spec.and(StudyRoomSpecification.equalStudying(false));
        if (!tag1.equals("null"))
            spec = spec.and(StudyRoomSpecification.equalTag1(tag1));
        if (!tag2.equals("null"))
            spec = spec.and(StudyRoomSpecification.equalTag2(tag2));
        if (!tag3.equals("null"))
            spec = spec.and(StudyRoomSpecification.equalTag3(tag3));
        if (!keyword.equals("null"))
            spec = spec.and(StudyRoomSpecification.equalTitle(keyword));
        return studyRoomRepository.findAll(spec, pageable);
    }

    // 스터디룸의 입장 유저정보 조회
    public List<EnterMember> enterUsers(String roomId) {
        StudyRoom studyRoom = studyRoomRepository.findByRoomId(roomId).orElseThrow();
        return enterMemberRepository.findByStudyRoom(studyRoom);
    }

    // 스터디룸 검색 기능
    public Page<StudyRoom> roomSearch(int page, int size, String keyword) {
        Pageable pageable = PageRequest.of(page, size);
        return studyRoomRepository.findAllByTitleContainingIgnoreCaseOrderByCreatedAtDesc(pageable, keyword);
    }
}
