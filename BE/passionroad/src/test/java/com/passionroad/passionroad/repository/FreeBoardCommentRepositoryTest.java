package com.passionroad.passionroad.repository;

import com.passionroad.passionroad.freeboard.domain.freeboard.FreeBoard;
import com.passionroad.passionroad.freeboard.domain.freeboard.FreeBoardComment;
import com.passionroad.passionroad.freeboard.repository.FreeBoardCommentRepository;
import com.passionroad.passionroad.freeboard.repository.FreeBoardRepository;
import com.passionroad.passionroad.member.domain.Member;
import com.passionroad.passionroad.member.repository.MemberRepository;
import lombok.extern.log4j.Log4j2;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;
import java.util.Random;
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

    @Test
    public void testInsert(){
        Random random = new Random();
        random.setSeed(System.currentTimeMillis());

        IntStream.rangeClosed(0, 299).forEach(i -> {

            Long postId = (long) ( i % 100 + 1 ); // 1 - 100 3번 순환
            Long commentId = (long) (random.nextInt(100) + 1);    // 1 - 100 사이 랜덤 정수

            FreeBoard freeBoard = freeBoardRepository.findById(postId).orElseThrow();
            Member member = memberRepository.findById(commentId).orElseThrow();    // user 1- 100번 사이의 댓글 작성자

            // 1 - 100번 게시물의 각 댓글
            FreeBoardComment freeBoardComment = FreeBoardComment.builder()
                    .commentText("comment text..." + (i + 1))
                    .commentWriter(member.getMid()) // 댓글작성자 ID
                    .freeBoard(freeBoard)   // 댓글달린 게시글
                    .member(member) // 댓글작성자 계정
                    .build();

            FreeBoardComment result = freeBoardCommentRepository.save(freeBoardComment);
            log.info("commentId: " + result.getCommentId());
        });


        // real post_id,  in free_board table, find post
//        Long postId = 1L;
//        FreeBoard freeBoard = freeBoardRepository.findById(postId).orElseThrow();

        // find user
//        Member member = memberRepository.findByEmail("kimhankimhan1111@gmail.com").orElseThrow();

    }

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
