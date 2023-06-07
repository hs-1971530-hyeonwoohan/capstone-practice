package com.passionroad.passionroad.freeboard.repository;

import com.passionroad.passionroad.freeboard.domain.freeboard.FreeBoard;
import com.passionroad.passionroad.freeboard.domain.search.FreeBoardSearch;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface FreeBoardRepository extends JpaRepository<FreeBoard, Long>, FreeBoardSearch { // <Entity type, PK type>
//    findAllByOrderByCreatedAtDesc

    Optional<List<FreeBoard>> findAllByWriterOrderByRegDateDesc(String mid);
}
