package com.passionroad.passionroad.studyroom.repository;

import com.passionroad.passionroad.member.domain.Member;
import com.passionroad.passionroad.studyroom.entity.EnterMember;
import com.passionroad.passionroad.studyroom.entity.StudyRoom;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface EnterMemberRepository extends JpaRepository<EnterMember, Long> {

    Optional<List<EnterMember>> findByStudyRoom(StudyRoom studyRoom);
//    EnterMember findAllByStudyRoom(StudyRoom studyRoom);

    Optional<EnterMember> findByStudyRoomAndMember(StudyRoom studyRoom, Member member);

    Optional<List<EnterMember>> findAllByMember(Member member);

    boolean existsByStudyRoomAndMember(StudyRoom studyRoom, Member member);

    /*EnterMember findByUser(Member member);
    EnterMember findAllByRoomId(String roomId);*/
}
