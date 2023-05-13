package com.passionroad.passionroad.service;

import com.passionroad.passionroad.freeboard.dto.FreeBoardCommentDTO;
import com.passionroad.passionroad.freeboard.repository.FreeBoardRepository;
import com.passionroad.passionroad.freeboard.service.FreeBoardCommentService;
import com.passionroad.passionroad.member.repository.MemberRepository;
import lombok.extern.log4j.Log4j2;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;

@SpringBootTest
@Log4j2
public class FreeBoardCommentServiceTests {

    @Autowired
    private FreeBoardCommentService freeBoardCommentService;

    @Autowired
    private MemberRepository memberRepository;

    @Autowired
    private FreeBoardRepository freeBoardRepository;

/*
    @Test
    public void testRegister(){
        // get post id, user info and comment dto
        // freeboard entity by post id, user entity by userdetails and comment entity by comment dto

        Long postId = 2L;
        FreeBoard freeBoard = freeBoardRepository.findById(postId).orElseThrow();

        Member member = memberRepository.findByEmail("kimhankimhan1111@gmail.com")
                .orElseThrow();

        // comment writer != post writer
        FreeBoardCommentDTO freeBoardCommentDTO = FreeBoardCommentDTO.builder()
                .authorId(member.getId())
                .postId(freeBoard.getPostId())
                .commentText("test service...")
//                .commentWriter(member.getName())
                .commentWriter(member.getMid())
                .build();

        Long commentId = freeBoardCommentService.register(freeBoardCommentDTO, member, freeBoard);

        log.info("commentId: " + commentId);
    }
*/

    @Test
    public void testListByPostId(){
        Long postId = 1L;

        List<FreeBoardCommentDTO> dtoList = freeBoardCommentService.listByPostId(postId);

        log.info(dtoList);
    }

    @Test
    public void testListByMemberId(){
        Long memberId = 2L;

        List<FreeBoardCommentDTO> dtoList = freeBoardCommentService.listByMemberId(memberId);

        log.info(dtoList);
    }

    @Test
    public void testModify(){

        FreeBoardCommentDTO freeBoardCommentDTO = FreeBoardCommentDTO.builder()
                .commentId(4L)
                .authorId(2L)
                .postId(2L)
                .commentText("test modify service...")
                .commentWriter("김한")
                .build();

        freeBoardCommentService.modify(freeBoardCommentDTO);

    }

    @Test
    public void testRemove(){
        Long commentId = 4L;
        freeBoardCommentService.remove(commentId);
    }
}
