package com.passionroad.passionroad.repository;

import com.passionroad.passionroad.domain.freeboard.FreeBoard;
import com.passionroad.passionroad.domain.freeboard.FreeBoardComment;
import com.passionroad.passionroad.domain.member.Member;
import lombok.extern.log4j.Log4j2;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;
import java.util.stream.IntStream;

@SpringBootTest
@Log4j2
public class FreeBoardCommentRepositoryTest {

    @Autowired
    FreeBoardCommentRepository freeBoardCommentRepository;

    @Autowired
    FreeBoardRepository freeBoardRepository;

    @Autowired
    MemberRepository memberRepository;

/*    @Test
    public void testInsert(){
        // real post_id,  in free_board table, find post
        Long postId = 1L;
        FreeBoard freeBoard = freeBoardRepository.findById(postId).orElseThrow();

        // find user
        Member member = memberRepository.findByEmail("kimhankimhan1111@gmail.com").orElseThrow();


        IntStream.rangeClosed(1, 3).forEach(i -> {
            FreeBoardComment freeBoardComment = FreeBoardComment.builder()
                    .freeBoard(freeBoard)
                    .member(member)
                    .commentText("comment text..." + i)
                    .commentWriter("comment writer..." + i)
                    .build();

            FreeBoardComment result = freeBoardCommentRepository.save(freeBoardComment);
            log.info("commentId: " + result.getCommentId());
        });
    }*/

    @Test
    public void testSelectAllByPostId(){
        // find comments by post_id (fk)
        Long postId = 1L;
        FreeBoard freeBoard = freeBoardRepository.findById(postId).orElseThrow();

        List<FreeBoardComment> comments = freeBoardCommentRepository.findAllByFreeBoard_PostId(freeBoard.getPostId()).orElseThrow();

        comments.forEach(log::info);
    }

/*
    @Test
    public void testSelectAllByMemberId(){
        // find comments by (user) id (fk)
        Member member = memberRepository.findByEmail("kimhankimhan1111@gmail.com").orElseThrow();

        List<FreeBoardComment> comments = freeBoardCommentRepository.findAllByMember_Id(member.getId()).orElseThrow();

        comments.forEach(log::info);
    }
*/

    @Test
    public void testUpdate(){
//        update a comment text

        FreeBoardComment comment = freeBoardCommentRepository.findById(1L).orElseThrow();

        comment.changeText("UPDATED COMMENT TEXT..." + comment.getCommentId());

        freeBoardCommentRepository.save(comment);
    }

    @Test
    public void testDelete(){
//        delete a comment
        Long commentId = 2L;
        freeBoardCommentRepository.deleteById(commentId);
    }
}
