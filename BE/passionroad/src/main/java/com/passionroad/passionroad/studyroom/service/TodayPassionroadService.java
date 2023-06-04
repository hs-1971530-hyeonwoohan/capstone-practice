package com.passionroad.passionroad.studyroom.service;

import com.passionroad.passionroad.member.domain.Member;
import com.passionroad.passionroad.member.repository.MemberRepository;
import com.passionroad.passionroad.studyroom.entity.TodayPassionroad;
import com.passionroad.passionroad.studyroom.repository.TodayPassionroadRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.time.LocalDate;
import java.util.Map;

@Service
@Log4j2
@Transactional
@RequiredArgsConstructor
public class TodayPassionroadService {

    private final TodayPassionroadRepository todayPassionroadRepository;
    private final MemberRepository memberRepository;

    // 세션 종료 후 공부시간을 TodayPassionroad, Member에 누적 및 저장
    // 오늘 총 누적시간 반환
    public Long accumulateTodayPassionroad(Member member, Long studyTimeMinutes) {
        log.info("TodayPassionroad: accumulateTodayPassionroad -------------------");

        LocalDate today = LocalDate.now();
        TodayPassionroad todayPassionroad = todayPassionroadRepository.findTodayPassionroadByMemberAndDate(member, today).orElseGet(() -> {
            // null 이라면
            return TodayPassionroad.builder()
                    .studyTime(0L)
                    .date(today)
                    .member(member)
                    .build();
        });

        // todayPassionroad 에 studyTimeMinutes 누적
        Long todayStudyTime = todayPassionroad.accumulateStudyTime(studyTimeMinutes);

        // todayPassionroad insert, update
        todayPassionroadRepository.save(todayPassionroad);

        // Member의 accumulatedPassionroad(총 누적 열정도) 에 studyTimeMinutes 누적
        Long totalPassionroad = member.accumulatePassionroad(studyTimeMinutes);

        // Member update
        memberRepository.save(member);
        log.info("누적된 총 열정도 : " + totalPassionroad);

        // 오늘 누적된 공부시간 반환
        return todayStudyTime;
    }

    public Map<String, Object> getThreeDaysStudyTimes(Member member){
        log.info("TodayPassionroad: getThreeDaysStudyTimes --------------------------------");
        // 중요: 데이터가 없으면 기본값 0으로 데이터 만들어서 출력 (데이터 없다고 에러나면 안됨)
        // 각 날짜의 TodayPassionroad 엔티티 불러오고 save (새로운 엔티티를 insert 하기위해)

        LocalDate today = LocalDate.now();  // 오늘 날짜 YYYY-MM-DD
        TodayPassionroad todayPassionroad = todayPassionroadRepository.findTodayPassionroadByMemberAndDate(member, today).orElseGet(() -> {
            // 값이 null 이면
            return TodayPassionroad.builder()
                    .studyTime(0L)
                    .date(today)
                    .member(member)
                    .build();
        });
        todayPassionroadRepository.save(todayPassionroad);

        LocalDate yesterday = today.minusDays(1);
        TodayPassionroad yesterdayPassionroad = todayPassionroadRepository.findTodayPassionroadByMemberAndDate(member, yesterday).orElseGet(() -> {
            // 값이 null 이면
            return TodayPassionroad.builder()
                    .studyTime(0L)
                    .date(yesterday)
                    .member(member)
                    .build();
        });
        todayPassionroadRepository.save(yesterdayPassionroad);

        LocalDate dayBeforeYesterday = today.minusDays(2);
        TodayPassionroad dayBeforeYesterdayPassionroad = todayPassionroadRepository.findTodayPassionroadByMemberAndDate(member, dayBeforeYesterday).orElseGet(() -> {
            // 값이 null 이면
            return TodayPassionroad.builder()
                    .studyTime(0L)
                    .date(dayBeforeYesterday)
                    .member(member)
                    .build();
        });
        todayPassionroadRepository.save(dayBeforeYesterdayPassionroad);

        Map<String, Object> studyTimeMap = Map.of(
                "today", todayPassionroad.getStudyTime(),
                "yesterday", yesterdayPassionroad.getStudyTime(),
                "dayBeforeYesterday", dayBeforeYesterdayPassionroad.getStudyTime()
        );

        return studyTimeMap;
    }


}
