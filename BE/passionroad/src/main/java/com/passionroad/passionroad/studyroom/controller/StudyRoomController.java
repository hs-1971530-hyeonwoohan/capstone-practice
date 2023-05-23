package com.passionroad.passionroad.studyroom.controller;


import com.passionroad.passionroad.member.dto.MemberDTO;
import com.passionroad.passionroad.studyroom.entity.EnterMember;;
import com.passionroad.passionroad.studyroom.entity.StudyRoom;
import com.passionroad.passionroad.studyroom.request.RequestDTO;
import com.passionroad.passionroad.studyroom.response.EnterMemberResponseDto;
import com.passionroad.passionroad.studyroom.request.StudyRoomEnterRequestDto;
import com.passionroad.passionroad.studyroom.request.StudyRoomRequestDto;
import com.passionroad.passionroad.studyroom.response.StudyRoomResponseDto;
import com.passionroad.passionroad.studyroom.service.StudyRoomService;

import io.openvidu.java.client.*;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/studyroom")
public class StudyRoomController {

    private final StudyRoomService studyRoomService;

    // 세션 생성, 세션 객체의 sessionId 반환, 사용자의 방 정보를 담은 StudyRoom 엔티티 생성
    @PostMapping
    public ResponseEntity<String> getOrCreateSession(@RequestBody RequestDTO requestDTO) throws OpenViduJavaClientException, OpenViduHttpException {

        // 사용자가 입력한 방 이름인 customSessionId 를 담은 session properties 생성
        Map<String, Object> params = Map.of("customSessionId", requestDTO.getCustomSessionId());
        SessionProperties properties = SessionProperties.fromJson(params).build();

        // String sessionId 반환
        // ok() 메소드는 HTTP 상태 코드를 200 OK로 설정하는 ResponseEntity.Builder를 반환
        return ResponseEntity.ok().body(studyRoomService.getOrCreateRoom(requestDTO, properties));
    }

    // createRoom() 직후 실행될 createConnection()
    @PostMapping("{sessionId}/connections")
    public ResponseEntity<String> createConnection(
            @PathVariable("sessionId") String sessionId,
            @RequestBody(required = false) Map<String, Object> params)
            throws OpenViduJavaClientException, OpenViduHttpException {

        // 클라이언트에서 받은 connection properties json -> connection properties java instance
        ConnectionProperties properties = ConnectionProperties.fromJson(params).build();

        // Connection 에서 Token 혹은 에러메세지 반환
        String result = studyRoomService.createConnection(sessionId, properties);

        if(result.equals("Not Found Error")){
            // session null 예외 처리
            return new ResponseEntity<>(result, HttpStatus.NOT_FOUND);
        }

        // 생성한 connection 의 token 을 클라이언트로 전송
        return new ResponseEntity<>(result, HttpStatus.OK);
    }





    // 스터디룸에 입장  userEnter 테이블 조인(현재 방에 접속 중인 유저 확인 테이블)
//    @PostMapping("/user-enter")
//    public ResponseEntity<List<EnterMemberResponseDto>> enterRoom(@RequestBody StudyRoomEnterRequestDto studyRoomEnterRequestDto) throws OpenViduJavaClientException, OpenViduHttpException {
//        // enterRoom 컨트롤러 메소드의 userName 매개변수 지워버림 -> requestDTO에서 username 받아서 한번에 처리
//        return ResponseEntity.ok().body(studyRoomService.enterRoom(studyRoomEnterRequestDto, userName));
//    }


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
//    @GetMapping("/room-page/{page}/{size}/{sortBy}/{recruit}/{tag1}/{tag2}/{tag3}/{keyword}")
//    @ResponseBody
//    public Page<StudyRoom> getTagRoom(@PathVariable int page,
//                                      @PathVariable int size,
//                                      @PathVariable String sortBy,
//                                      @PathVariable String recruit,
//                                      @PathVariable(required = false) String tag1,
//                                      @PathVariable(required = false) String tag2,
//                                      @PathVariable(required = false) String tag3,
//                                      @PathVariable(required = false) String keyword
//    ) {
//        page = page - 1;
//        return studyRoomService.getTagRoom(page, size, sortBy, recruit, tag1 ,tag2 ,tag3, keyword);
//    }



    // 스터디룸에 입장한 유저들 정보 조회
    @GetMapping("/user-enter/{roomId}")
    public List<EnterMember> enterUsers(@PathVariable String roomId) {
        return studyRoomService.enterUsers(roomId);
    }

    // 스터디룸에서 퇴장 enterUser 삭제
    @DeleteMapping("/user-quit/{roomId}")
    public void quitRoom(@PathVariable String roomId,
                         @AuthenticationPrincipal String userName) throws OpenViduJavaClientException, OpenViduHttpException {
        studyRoomService.quitRoom(roomId, userName);
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


