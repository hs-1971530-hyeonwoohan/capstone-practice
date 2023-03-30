package com.passionroad.passionroad.repository;

import com.passionroad.passionroad.domain.FreeBoard;
import com.passionroad.passionroad.domain.search.FreeBoardSearch;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FreeBoardRepository extends JpaRepository<FreeBoard, Long>, FreeBoardSearch { // <Entity type, PK type>
}
