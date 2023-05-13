package com.passionroad.passionroad.studyroom.repository;

import com.passionroad.passionroad.member.domain.Member;
import com.passionroad.passionroad.studyroom.entity.EnterMember;
import com.passionroad.passionroad.studyroom.entity.StudyRoom;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface EnterMemberRepository extends JpaRepository<EnterMember, Long> {

    List<EnterMember> findByRoom(StudyRoom studyRoom);
    EnterMember findAllByRoom(StudyRoom studyRoom);

    EnterMember findByRoomAndUser(StudyRoom studyRoom, Member member);
    EnterMember findAllByUser(Member member);

    EnterMember findByUser(Member member);
    EnterMember findAllByRoomId(String roomId);
}
