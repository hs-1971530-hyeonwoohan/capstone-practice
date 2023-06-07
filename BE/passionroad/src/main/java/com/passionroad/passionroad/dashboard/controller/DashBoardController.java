package com.passionroad.passionroad.dashboard.controller;

import com.passionroad.passionroad.freeboard.service.FreeBoardService;
import com.passionroad.passionroad.member.domain.Member;
import com.passionroad.passionroad.member.repository.MemberRepository;
import com.passionroad.passionroad.security.exception.AccessTokenException;
import com.passionroad.passionroad.studyroom.entity.TodayPassionroad;
import com.passionroad.passionroad.studyroom.repository.TodayPassionroadRepository;
import com.passionroad.passionroad.studyroom.service.StudyRoomService;
import com.passionroad.passionroad.studyroom.service.TodayPassionroadService;
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
    private final TodayPassionroadService todayPassionroadService;
    private final FreeBoardService freeBoardService;
    private final StudyRoomService studyRoomService;
    private final JWTUtil jwtUtil;


    @GetMapping("passionroad")
    public ResponseEntity<Long> getTotalPassionroad(
            @RequestHeader("Authorization") String jwtHeader
    ){
        // 총 열정도 반환

        // TokenCheckFilter 의해 JWT 검증했으므로 바로 사용
        String tokenStr = jwtHeader.substring(7);   // 토큰 문자열 (인증값)

        // payload 검출 (key = mid)
        Map<String, Object> values = jwtUtil.validateToken(tokenStr);
        String mid = (String)values.get("mid");

        Member member = memberRepository.findByMid(mid).orElseThrow();

        return new ResponseEntity<>(member.getTotalPassionroad(), HttpStatus.OK);
    }

    @GetMapping("dateStudyTime")
    public ResponseEntity<Long> getDateStudyTime(
            @RequestHeader("Authorization") String jwtHeader,
            @RequestParam String year,
            @RequestParam String month,
//            @RequestParam String date,
            @RequestParam String dateParam
    ){
        // 특정 날짜의 누적 공부시간 반환

        // TokenCheckFilter 의해 JWT 검증했으므로 바로 사용
        String tokenStr = jwtHeader.substring(7);   // 토큰 문자열 (인증값)

        // payload 검출 (key = mid)
        Map<String, Object> values = jwtUtil.validateToken(tokenStr);
        String mid = (String)values.get("mid");

        LocalDate date = LocalDate.parse(dateParam);
        Member member = memberRepository.findByMid(mid).orElseThrow();

        TodayPassionroad todayPassionroad = todayPassionroadRepository.findTodayPassionroadByMemberAndDate(member, date).orElseGet(() -> TodayPassionroad.builder()
                .studyTime(0L)
                .member(member)
                .date(date)
                .build());

        return new ResponseEntity<>(todayPassionroad.getStudyTime(), HttpStatus.OK);
    }

    @GetMapping("recentStudyTimes")
    public ResponseEntity<Map<String, Object>> getRecentStudyTimes(
            @RequestHeader("Authorization") String jwtHeader
    ){
        // TokenCheckFilter 의해 JWT 검증했으므로 바로 사용
        String tokenStr = jwtHeader.substring(7);   // 토큰 문자열 (인증값)

        // payload 검출 (key = mid)
        Map<String, Object> values = jwtUtil.validateToken(tokenStr);
        String mid = (String)values.get("mid");

        Member member = memberRepository.findByMid(mid).orElseThrow();

//        String today = year + "-" + month + "-" + date; // 2023-05-31
//        LocalDate todayDate = LocalDate.parse(today);

        // todayPassionroadService : 오늘, 어제, 그제의 StudyTime 출력
        Map<String, Object> studyTimesMap = todayPassionroadService.getThreeDaysStudyTimes(member);

        return new ResponseEntity<>(studyTimesMap, HttpStatus.OK);
    }

    // 현재 내가 참여 중인 방 검색
    // 매개변수: jwt 혹은 mid (?)
    // return: StudyRoom 이름, 참여 인원, 마지막 입장시간
    @GetMapping("joinedStudyRooms")
    public ResponseEntity<Map<String, Object>> getJoinedStudyRooms(
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

    @GetMapping("myPosts")
    public ResponseEntity<Map<String, Object>> getMyPosts(
            @RequestHeader("Authorization") String jwtHeader
    ){
        // TokenCheckFilter 의해 JWT 검증했으므로 바로 사용
        String tokenStr = jwtHeader.substring(7);   // 토큰 문자열 (인증값)

        // payload 검출 (key = mid)
        Map<String, Object> values = jwtUtil.validateToken(tokenStr);
        String mid = (String)values.get("mid");

        Map<String, Object> myPosts =freeBoardService.getMyPosts(mid);

        return new ResponseEntity<>(myPosts, HttpStatus.OK);
    }

}
