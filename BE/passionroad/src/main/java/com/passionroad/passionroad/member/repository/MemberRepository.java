package com.passionroad.passionroad.member.repository;

import com.passionroad.passionroad.member.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface MemberRepository extends JpaRepository<Member, Long> {

    @Query(value = "select nickname from member "
            + "where room_id = :roomId and ishost = 2 ",
            nativeQuery = true)
    List<String> findNicknameByroomId(@Param("roomId") long roomId);

    @Query(value = "select nickname from member "
            + "where room_id = :roomId and ishost = 1 ",
            nativeQuery = true)
    String findHostnameByroomId(@Param("roomId") long roomId);

    @Query(value = "select  from member "
            + "where room_id = :roomId and userId = :userId ",
            nativeQuery = true)
    Member findOneByRoomIdAndUserId(@Param("roomId") long roomId, @Param("userId") long userId);
}
