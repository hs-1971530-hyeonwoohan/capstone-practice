package com.passionroad.passionroad.studyroom.controller;


import com.passionroad.passionroad.security.exception.AccessTokenException;
import com.passionroad.passionroad.studyroom.entity.StudyRoom;
import com.passionroad.passionroad.studyroom.request.RequestDTO;
import com.passionroad.passionroad.studyroom.service.StudyRoomService;

import com.passionroad.passionroad.util.JWTUtil;
import io.openvidu.java.client.*;
import lombok.RequiredArgsConstructor;
import org.hibernate.TypeMismatchException;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/studyroom")
public class StudyRoomController {

    private final StudyRoomService studyRoomService;
    private final JWTUtil jwtUtil;

    // 세션 생성, 세션 객체의 sessionId 반환, 사용자의 방 정보를 담은 StudyRoom 엔티티 생성
    @PostMapping
    public ResponseEntity<String> getOrCreateSession(@RequestBody RequestDTO requestDTO) throws OpenViduJavaClientException, OpenViduHttpException {

        // 사용자가 입력한 방 이름인 customSessionId 를 담은 session properties 생성
        Map<String, Object> params = Map.of("customSessionId", requestDTO.getCustomSessionId());
        SessionProperties properties = SessionProperties.fromJson(params).build();

        // String sessionId 반환
        String result = studyRoomService.getOrCreateRoom(requestDTO, properties);
        if (result.equals("studyroom is full")) {
            return new ResponseEntity<>(result, HttpStatus.FORBIDDEN);
        }

        // result sessionId 반환
        return new ResponseEntity<>(result, HttpStatus.OK);
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

        if (result.equals("Not Found Error")) {
            // session null 예외 처리
            return new ResponseEntity<>(result, HttpStatus.NOT_FOUND);
        }

        // 생성한 connection 의 token 을 클라이언트로 전송
        return new ResponseEntity<>(result, HttpStatus.OK);
    }


    // 현재 내가 참여 중인 방 검색
    // 매개변수: jwt 혹은 mid (?)
    // return: StudyRoom 이름, 참여 인원, 마지막 입장시간
    @GetMapping("joinedStudyRoom")
    public ResponseEntity<Map<String, Object>> joinedStudyRoom(
            @RequestHeader("Authorization") String jwtHeader
    ) throws AccessTokenException {

        // TokenCheckFilter 의해 JWT 검증했으므로 바로 사용
        String tokenStr = jwtHeader.substring(7);   // 토큰 문자열 (인증값)

        // payload 검출 (key = mid)
        Map<String, Object> values = jwtUtil.validateToken(tokenStr);

        // 참여중인 스터디룸 map
        Map<String, Object> joinedStudyRoom = studyRoomService.getJoinedStudyRoom((String) values.get("mid"));

        // 참여중인 스터디룸 반환
        return new ResponseEntity<>(joinedStudyRoom, HttpStatus.OK);
    }

    // 스터디룸 목록 전체 조회
    @GetMapping("all")
    public ResponseEntity<List<StudyRoom>> readAllRoom() {
        return new ResponseEntity<>(studyRoomService.readAllRoom(), HttpStatus.OK);
    }

    // 메인 페이지에 필요한 스터디룸 전체목록 페이지
    // 쿼리스트링 파라미터 : page, size
    // return : 페이지 정보, StudyRoom List
    @GetMapping("pages")
    public ResponseEntity<Map<String, Object>> getStudyRoomPage(
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "6") int size
    ) throws TypeMismatchException {

        Page<StudyRoom> studyRoomPage = studyRoomService.getStudyRoomPage(page - 1, size);

        Map<String, Object> responseDTO = Map.of(
                "page", studyRoomPage.getNumber(),
                "size", studyRoomPage.getSize(),
                "hasPrevious", studyRoomPage.hasPrevious(),
                "hasNext", studyRoomPage.hasNext(),
                "totalPages", studyRoomPage.getTotalPages(),
                "totalElements", studyRoomPage.getTotalElements(),
                "contentList", studyRoomPage.getContent()
        );

        return new ResponseEntity<>(responseDTO, HttpStatus.OK);
    }

    // Connection 활성화된 시간 측정 -> 매일 열정도 누적
    @PostMapping("studytime")
    public ResponseEntity<String> saveStudyTime(
            @RequestBody RequestDTO requestDTO  // sessionId, mid
    ) {
        // 세션에 참여한시간 TodayPassionroad, Member에 누적
        return new ResponseEntity<>(studyRoomService.setStudyTime(requestDTO.getCustomSessionId(), requestDTO.getMid()), HttpStatus.OK);
    }

}