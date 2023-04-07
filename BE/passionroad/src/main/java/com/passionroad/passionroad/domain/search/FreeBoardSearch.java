package com.passionroad.passionroad.domain.search;

import com.passionroad.passionroad.domain.FreeBoard;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface FreeBoardSearch {
    // querydsl interface
    Page<FreeBoard> search1(Pageable pageable);

    Page<FreeBoard> searchAll(String[] types, String keyword, Pageable pageable);
}
