package com.passionroad.passionroad.dashboard.controller;

import com.passionroad.passionroad.dashboard.dto.DateStudyTimeRequestDTO;
import com.passionroad.passionroad.dashboard.dto.JoinedStudyRoomRequestDTO;
import com.passionroad.passionroad.dashboard.dto.PassionroadRequestDTO;
import com.passionroad.passionroad.member.domain.Member;
import com.passionroad.passionroad.member.repository.MemberRepository;
import com.passionroad.passionroad.security.exception.AccessTokenException;
import com.passionroad.passionroad.studyroom.entity.TodayPassionroad;
import com.passionroad.passionroad.studyroom.repository.TodayPassionroadRepository;
import com.passionroad.passionroad.studyroom.service.StudyRoomService;
import com.passionroad.passionroad.util.JWTUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.Map;

@RestController
@RequestMapping("/api/dashboard")
@RequiredArgsConstructor
public class DashBoardController {

    private final MemberRepository memberRepository;
    private final TodayPassionroadRepository todayPassionroadRepository;
    private final StudyRoomService studyRoomService;
    private final JWTUtil jwtUtil;


    @PostMapping("passionroad")
    public ResponseEntity<Long> getTotalPassionroad(
            @RequestBody PassionroadRequestDTO requestDTO
            ){
        // 총 열정도 반환
        
        String mid = requestDTO.getMid();
        Member member = memberRepository.findByMid(mid).orElseThrow();

        return new ResponseEntity<>(member.getTotalPassionroad(), HttpStatus.OK);
    }

    @PostMapping("dateStudyTime")
    public ResponseEntity<Long> getDateStudyTime(
            @RequestBody DateStudyTimeRequestDTO requestDTO
            ){
        // 특정 날짜의 누적 공부시간 반환
        
        String mid = requestDTO.getMid();
        LocalDate date = requestDTO.getDate();
        Member member = memberRepository.findByMid(mid).orElseThrow();

        TodayPassionroad todayPassionroad = todayPassionroadRepository.findTodayPassionroadByMemberAndDate(member, date).orElseThrow();

        return new ResponseEntity<>(todayPassionroad.getStudyTime(), HttpStatus.OK);
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


//    @PostMapping("joinedStudyRoom")
//    public ResponseEntity<Map<String, Object>> joinedStudyRoom(
//            @RequestBody JoinedStudyRoomRequestDTO requestDTO
//        ){
//        // 가입된 스터디룸들 반환
//
//        String mid = requestDTO.getMid();
//        Map<String, Object> joinedStudyRoomMap = studyRoomService.getJoinedStudyRoom(mid);
//
//        // key: Room Title, value: StudyRoom Entity
//        return new ResponseEntity<>(joinedStudyRoomMap, HttpStatus.OK);
//    }
}
