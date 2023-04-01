package com.passionroad.passionroad.domain.search;

import com.passionroad.passionroad.domain.FreeBoard;
import com.passionroad.passionroad.domain.QFreeBoard;
import com.querydsl.core.BooleanBuilder;
import com.querydsl.jpa.JPQLQuery;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.support.QuerydslRepositorySupport;

import java.util.List;
import java.util.Objects;

public class FreeBoardSearchImpl extends QuerydslRepositorySupport implements FreeBoardSearch {
    // QueryDSL class for JPQL query
    // use Qdomain to make JPQL query
    public FreeBoardSearchImpl(){
        super(FreeBoard.class);
    }

    @Override
    public Page<FreeBoard> search1(Pageable pageable) {

        QFreeBoard freeBoard = QFreeBoard.freeBoard;   // Qdomain instance

        // query language
        JPQLQuery<FreeBoard> query = from(freeBoard); // select... from free_board
        query.where(freeBoard.title.contains("1"));    // where title like ...

        // paging with QuerydslRepositorySupport class method
        Objects.requireNonNull(this.getQuerydsl()).applyPagination(pageable, query);

        List<FreeBoard> list = query.fetch();

        long count = query.fetchCount();

        return null;
    }

    // search for posts with types and postId > 0
    @Override
    public Page<FreeBoard> searchAll(String[] types, String keyword, Pageable pageable){

        // Entity for making JPQL query
        QFreeBoard freeBoard = QFreeBoard.freeBoard;
        JPQLQuery<FreeBoard> query = from(freeBoard);

        if((types != null && types.length > 0) && keyword != null){
            // search types and keyword is not empty
            BooleanBuilder booleanBuilder = new BooleanBuilder();

            // This is to unite 'or' of SQL because operators have different priorities.
            for(String type: types){
                switch(type){
                    case "t":
                        booleanBuilder.or(freeBoard.title.contains(keyword));
                        break;
                    case "c":
                        booleanBuilder.or(freeBoard.content.contains(keyword));
                        break;
                    case "w":
                        booleanBuilder.or(freeBoard.writer.contains(keyword));
                        break;
                }
            } // end for
            query.where(booleanBuilder);
        } // end if

        // postId > 0
        query.where(freeBoard.postId.gt(0L));

        // paging
        this.getQuerydsl().applyPagination(pageable, query);

        List<FreeBoard> list = query.fetch();

        long count = query.fetchCount();

        return new PageImpl<>(list, pageable, count);

    }
}
