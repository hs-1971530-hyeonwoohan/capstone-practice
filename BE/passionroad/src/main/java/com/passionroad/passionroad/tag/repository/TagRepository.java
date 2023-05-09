package com.passionroad.passionroad.tag.repository;

import com.passionroad.passionroad.tag.entity.Tag;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.util.List;

@Repository
public interface TagRepository extends JpaRepository<Tag, Long> {

    @Transactional
    long deleteAllByRoomId(long roomId);

    @Query(value = "select distinct tag_name from tag ", nativeQuery = true)
    List<String> findAllTags();
}
