package com.passionroad.passionroad.studyroom.controller;


import com.passionroad.passionroad.studyroom.dto.StudyRoomDto;
import com.passionroad.passionroad.studyroom.entity.StudyRoom;
import com.passionroad.passionroad.studyroom.service.StudyRoomService;

import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RestController
public class StudyRoomController {

    private final Logger logger = LoggerFactory.getLogger(this.getClass());
    private final StudyRoomService studyRoomService;

    @GetMapping("code")
    @ApiOperation(value = "미팅 코드 조회", notes = "미팅 코드로 이 미팅이 유효한지 반환한다", response = String.class)
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "OK"),
            @ApiResponse(code = 400, message = "Bad Request"),
            @ApiResponse(code = 401, message = "Unauthorized"),
            @ApiResponse(code = 403, message = "Forbidden"),
            @ApiResponse(code = 404, message = "Not Found")
    })
    private String getValidCode() {
        logger.debug(String.format("get rood valid 호출"));
        return studyRoomService.getCode();
    }

    @PutMapping("finish/{roomId}")
    @ApiOperation(value = "미팅 종료", notes = "미팅을 종료하고 종료 시각을 기록한다.", response = String.class)
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "OK"),
            @ApiResponse(code = 400, message = "Bad Request"),
            @ApiResponse(code = 401, message = "Unauthorized"),
            @ApiResponse(code = 403, message = "Forbidden"),
            @ApiResponse(code = 404, message = "Not Found")
    })
    private ResponseEntity<StudyRoom> finishRoom(
            @ApiParam(value = "미팅 id와 종료 시각",required = true) @PathVariable long roomId){
        logger.debug(String.format("finishRoom Room {%s} 호출",roomId));
        return new ResponseEntity<StudyRoom>(studyRoomService.finishRoom(roomId), HttpStatus.OK);
    }

    @PostMapping("{code}/host")
    @ApiOperation(value = "진짜 미팅 시작 API, 호스트 정보와 룸 정보 넘겨주기", notes = "초기 정보 업데이트", response = StudyRoomDto.RoomResponse.class)
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "OK"),
            @ApiResponse(code = 400, message = "Bad Request"),
            @ApiResponse(code = 401, message = "Unauthorized"),
            @ApiResponse(code = 403, message = "Forbidden"),
            @ApiResponse(code = 404, message = "Not Found")
    })
    private ResponseEntity<StudyRoomDto.RoomResponse> UpdateHost(
            @ApiParam(value = "방 코드",required = true, example = "A1B2C3D4E5") @PathVariable String code,
            @ApiParam(value = "호스트 유저 id와 시작 시각", required = true) @RequestBody StudyRoomDto.InsertHostInfo insertHostInfo) {
        logger.debug("update host in Room 호출\n" );
        //방 제목 추가
        StudyRoomDto.RoomResponse roomResponse = studyRoomService.addBycode(code, insertHostInfo);
        //방에 태그 추가
        studyRoomService.addTags(insertHostInfo.getTags(), roomResponse.getRoomId());
        //호스트 닉네임 업데이트
        studyRoomService.addMember(code, insertHostInfo.getHostId(), insertHostInfo.getHostNickName(), 1);
        return new ResponseEntity<>(roomResponse, HttpStatus.OK);
    }
}


