package com.passionroad.passionroad.studyroom.repository;

import com.passionroad.passionroad.member.domain.Member;
import com.passionroad.passionroad.studyroom.entity.EnterMember;
import com.passionroad.passionroad.studyroom.entity.StudyRoom;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EnterMemberRepository extends JpaRepository<EnterMember, Long> {

    List<EnterMember> findByStudyRoom(StudyRoom studyRoom);
//    EnterMember findAllByStudyRoom(StudyRoom studyRoom);

    EnterMember findByStudyRoomAndMember(StudyRoom studyRoom, Member member);

    EnterMember findAllByMember(Member member);

    /*EnterMember findByUser(Member member);
    EnterMember findAllByRoomId(String roomId);*/
}
