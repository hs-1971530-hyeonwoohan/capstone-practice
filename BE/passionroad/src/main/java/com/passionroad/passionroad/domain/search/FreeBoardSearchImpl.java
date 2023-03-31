package com.passionroad.passionroad.domain.search;

import com.passionroad.passionroad.domain.FreeBoard;
import com.passionroad.passionroad.domain.QFreeBoard;
import com.querydsl.jpa.JPQLQuery;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.support.QuerydslRepositorySupport;

import java.util.List;

public class FreeBoardSearchImpl extends QuerydslRepositorySupport implements FreeBoardSearch {
    // QueryDSL class for JPQL query
    // use Qdomain to make JPQL query
    public FreeBoardSearchImpl(){
        super(FreeBoard.class);
    }

    @Override
    public Page<FreeBoard> search1(Pageable pageable) {

        QFreeBoard qFreeBoard = QFreeBoard.freeBoard;   // Qdomain instance

        // query language
        JPQLQuery<FreeBoard> query = from(qFreeBoard); // select.. from free_board
        query.where(qFreeBoard.title.contains("1"));    // where title like ...

        // paging with QuerydslRepositorySupport class method
        this.getQuerydsl().applyPagination(pageable, query);

        List<FreeBoard> list = query.fetch();

        long count = query.fetchCount();

        return null;
    }
}
