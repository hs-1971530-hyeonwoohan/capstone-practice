package com.passionroad.passionroad.studyroom.repository;

import com.passionroad.passionroad.studyroom.entity.StudyRoom;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface StudyRoomRepository extends JpaRepository<StudyRoom, Long> {

    StudyRoom findOneByCode(String code);
    StudyRoom findOneByRoomId(long roomId);

    @Query(value = "select r.* from room r inner join member m on r.room_id = m.room_id "
            + "where m.user_id = :userId and room_name not like ''",
            nativeQuery = true)
    List<StudyRoom> getRoomsInfo(@Param("userId") long userId);

    @Query(value = "select r.code from room r", nativeQuery = true)
    List<String> findAllCode();

    @Query(value = "select DATE_FORMAT(start_time ,'%Y-%m-%d') date "
            + "from room r join user_record ur on r.room_id = ur.room_id "
            + "where user_id = :userId "
            + "group by DATE_FORMAT(start_time ,'%Y-%m-%d') "
            + "limit 10",
            nativeQuery = true)
    List<String> get10days(@Param("userId") long userId);

    @Query(value = "select * from room "
            + "where is_public = 1 and end_time is NULL "
            + "lIMIT :start,:end",
            nativeQuery = true)
    List<StudyRoom> getPublicRoomsInfo(@Param("start") int start, @Param("end") int end);

    @Query(value = "select r.is_public, r.room_id, r.start_time, r.end_time, r.host_id, r.code, r.room_name, t.tag_name "
            + "from room r left join tag t on r.room_id = t.room_id "
            + "where r.is_public = 1 and r.end_time is NULL and (r.room_name like %:keyword% or t.tag_name like %:keyword%) "
            + "group by r.room_id "
            + "lIMIT :start,:end",
            nativeQuery = true)
    List<StudyRoom> getPublicRoomsByRoomNameOrTag(@Param("keyword") String keyword, @Param("start") int start, @Param("end") int end);

    @Query(value = "select *"
            + "from room "
            + "where is_public = 1 and end_time is NULL and room_name like %:roomName% "
            + "lIMIT :start,:end",
            nativeQuery = true)
    List<StudyRoom> getPublicRoomsByRoomName(@Param("roomName") String roomName, @Param("start") int start, @Param("end") int end);

    @Query(value = "select r.is_public, r.room_id, r.start_time, r.end_time, r.host_id, r.code, r.room_name, t.tag_name "
            + "from room r join tag t on r.room_id = t.room_id "
            + "where r.is_public = 1 and r.end_time is NULL and t.tag_name like %:tag% "
            + "group by r.room_id "
            + "lIMIT :start,:end",
            nativeQuery = true)
    List<StudyRoom> getPublicRoomsByTag(@Param("tag") String tag, @Param("start") int start, @Param("end") int end);

    @Query(value = "select COUNT(*) from room "
            + "where is_public = 1 and end_time is NULL",
            nativeQuery = true)
    long getPublicRoomsCount();

    @Query(value = "select count(t.room_id)"
            + "from ( select r.room_id room_id "
            + "		  from room r join tag t on r.room_id = t.room_id "
            + "		  where r.is_public = 1 and r.end_time is NULL and (r.room_name like %:keyword% or t.tag_name like %:keyword%) "
            + "		  group by r.room_id) as t",
            nativeQuery = true)
    long getPublicRoomsSearchCount(@Param("keyword") String keyword);

}
