package com.passionroad.passionroad.studyroom.controller;


import com.passionroad.passionroad.domain.member.Member;
import com.passionroad.passionroad.studyroom.entity.EnterMember;
import com.passionroad.passionroad.studyroom.entity.MemberDetailsImpl;
import com.passionroad.passionroad.studyroom.entity.StudyRoom;
import com.passionroad.passionroad.studyroom.response.EnterMemberResponseDto;
import com.passionroad.passionroad.studyroom.request.StudyRoomEnterRequestDto;
import com.passionroad.passionroad.studyroom.request.StudyRoomRequestDto;
import com.passionroad.passionroad.studyroom.response.StudyRoomResponseDto;
import com.passionroad.passionroad.studyroom.service.StudyRoomService;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@RestController
public class StudyRoomController {

    private final StudyRoomService studyRoomService;

    //방 생성
    @PostMapping("/room")
    public ResponseEntity<StudyRoomResponseDto> createRoom(@RequestBody StudyRoomRequestDto requestDto,
                                                           @AuthenticationPrincipal MemberDetailsImpl memberDetails) {
        Member member = memberDetails.getMember();
        return ResponseEntity.ok().body(studyRoomService.createRoom(requestDto, member));
    }


    // 스터디룸 목록 전체 조회
    @GetMapping("/room/all")
    public List<StudyRoom> allReadRoom() {
        return studyRoomService.allReadRoom();
    }

    // 최신순 스터디룸 TOP8  조회
    @GetMapping("/room")
    public List<StudyRoom> mainPageReadRoom() {
        return studyRoomService.mainPageReadRoom();
    }

    //  방 조회 페이지 처리
    @GetMapping("/room-page/{page}/{size}")
    @ResponseBody
    public Page<StudyRoom> roomscrooll(@PathVariable int page,
                                       @PathVariable int size
    ) {
        page = page - 1;
        return studyRoomService.getPageRoom(page, size);
    }

    // 스터디목록 페이지 스터디룸 조회
    @GetMapping("/room-page/{page}/{size}/{sortBy}/{recruit}/{tag1}/{tag2}/{tag3}/{keyword}")
    @ResponseBody
    public Page<StudyRoom> getTagRoom(@PathVariable int page,
                                      @PathVariable int size,
                                      @PathVariable String sortBy,
                                      @PathVariable String recruit,
                                      @PathVariable(required = false) String tag1,
                                      @PathVariable(required = false) String tag2,
                                      @PathVariable(required = false) String tag3,
                                      @PathVariable(required = false) String keyword
    ) {
        page = page - 1;
        return studyRoomService.getTagRoom(page, size, sortBy, recruit, tag1 ,tag2 ,tag3, keyword);
    }

    // 스터디룸에 입장  userEnter 테이블 조인(현재 방에 접속 중인 유저 확인 테이블)
    @PostMapping("/user-enter")
    public ResponseEntity<List<EnterMemberResponseDto>> enterRoom(@RequestBody StudyRoomEnterRequestDto studyRoomEnterRequestDto,
                                                                  @AuthenticationPrincipal MemberDetailsImpl memberDetails) {
        return ResponseEntity.ok().body(studyRoomService.enterRoom(studyRoomEnterRequestDto, memberDetails));
    }

    // 스터디룸에 입장한 유저들 정보 조회
    @GetMapping("/user-enter/{roomId}")
    public List<EnterMember> enterUsers(@PathVariable String roomId) {
        return studyRoomService.enterUsers(roomId);
    }

    // 스터디룸에서 퇴장 enterUser 삭제
    @DeleteMapping("/user-quit/{roomId}")
    public void quitRoom(@PathVariable String roomId,
                         @AuthenticationPrincipal MemberDetailsImpl memberDetails) {
        studyRoomService.quitRoom(roomId, memberDetails);
    }

    // 스터디룸 검색 기능
    @GetMapping("/room-page/{page}/{size}/{keyword}")
    @ResponseBody
    public Page<StudyRoom> roomSearch(@PathVariable int page,
                                      @PathVariable int size,
                                      @PathVariable String keyword
    ) {
        page = page - 1;
        return studyRoomService.roomSearch(page, size, keyword);
    }
}


