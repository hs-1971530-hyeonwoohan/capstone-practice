package com.passionroad.passionroad.studyroom.repository;

import com.passionroad.passionroad.member.domain.Member;
import com.passionroad.passionroad.studyroom.entity.BanMember;
import com.passionroad.passionroad.studyroom.entity.StudyRoom;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BanMemberRepository extends JpaRepository<BanMember, Long> {

    List<BanMember> findAllByRoom(StudyRoom studyRoom);

    BanMember findByRoomAndMember(StudyRoom studyRoom, Member member);
}
