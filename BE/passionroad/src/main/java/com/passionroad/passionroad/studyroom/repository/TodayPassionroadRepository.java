package com.passionroad.passionroad.studyroom.repository;

import com.passionroad.passionroad.member.domain.Member;
import com.passionroad.passionroad.studyroom.entity.TodayPassionroad;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.Optional;

@Repository
public interface TodayPassionroadRepository extends JpaRepository<TodayPassionroad, Long> {

    Optional<TodayPassionroad> findTodayPassionroadByMemberAndDate(Member member, LocalDate date);
}
