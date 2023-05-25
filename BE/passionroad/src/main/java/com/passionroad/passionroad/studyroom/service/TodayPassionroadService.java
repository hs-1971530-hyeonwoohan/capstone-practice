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
}
