package com.passionroad.passionroad.studyroom.repository;

import com.passionroad.passionroad.member.domain.Member;
import com.passionroad.passionroad.studyroom.entity.BanMember;
import com.passionroad.passionroad.studyroom.entity.StudyRoom;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BanMemberRepository extends JpaRepository<BanMember, Long> {

    List<BanMember> findAllByStudyRoom(StudyRoom studyRoom);

    BanMember findByStudyRoomAndMember(StudyRoom studyRoom, Member member);
}
