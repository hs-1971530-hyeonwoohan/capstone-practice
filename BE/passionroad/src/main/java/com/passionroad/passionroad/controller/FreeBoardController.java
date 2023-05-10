package com.passionroad.passionroad.controller;

import com.passionroad.passionroad.domain.freeboard.FreeBoard;
import com.passionroad.passionroad.domain.member.Member;
import com.passionroad.passionroad.dto.FreeBoardCommentDTO;
import com.passionroad.passionroad.dto.FreeBoardDTO;
import com.passionroad.passionroad.dto.PageRequestDTO;
import com.passionroad.passionroad.dto.PageResponseDTO;
import com.passionroad.passionroad.repository.FreeBoardRepository;
import com.passionroad.passionroad.repository.MemberRepository;
import com.passionroad.passionroad.service.FreeBoardCommentService;
import com.passionroad.passionroad.service.FreeBoardService;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/freeboards")
@RequiredArgsConstructor
@Log4j2
public class FreeBoardController {

    // Service DI
    private final FreeBoardService freeBoardService;
    private final FreeBoardCommentService freeBoardCommentService;

    // Repository DI
    private final MemberRepository memberRepository;
    private final FreeBoardRepository freeBoardRepository;

    @PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE)
    public Map<String, Long> writePost(
            @RequestBody @Valid FreeBoardDTO freeBoardDTO){

        /*
        * FreeBoardDTO Json 필수 필드:
        * 1. title 2. content 3. writer
        * */

        log.info("FreeBoardController: writePost -----------------------");
        log.info("FreeBoardDTO: " + freeBoardDTO);

        Member member = memberRepository.findByMid(freeBoardDTO.getWriter()).orElseThrow();
        Long postId = freeBoardService.register(freeBoardDTO, member);

        return Map.of("postId", postId);
    }


    @GetMapping
    public ResponseEntity<PageResponseDTO<FreeBoardDTO>> listPosts(
            @RequestParam(defaultValue = "1") String page,
            @RequestParam(defaultValue = "10") String size,
            @RequestParam(required = false) String type,
            @RequestParam(required = false) String keyword) {

        log.info("FreeBoardController: listPosts -----------------------");

        // make page request dto with url parameter
        PageRequestDTO pageRequestDTO = PageRequestDTO.builder()
                .page(Integer.parseInt(page))
                .size(Integer.parseInt(size))
                .type(type)
                .keyword(keyword)
                .build();

        // make page response dto with page request dto
        PageResponseDTO<FreeBoardDTO> pageResponseDTO = freeBoardService.list(pageRequestDTO);

        return ResponseEntity.ok(pageResponseDTO);
    }

    // read a specific post
    @GetMapping("/{postId}")
    public ResponseEntity<FreeBoardDTO> readPost(@PathVariable Long postId){

        log.info("FreeBoardController: readPost -----------------------");

        FreeBoardDTO freeBoardDTO = freeBoardService.readOne(postId);

        return ResponseEntity.ok(freeBoardDTO);
    }

    // modify a specific post
    @PutMapping(value = "/{postId}", consumes = MediaType.APPLICATION_JSON_VALUE)
    public Map<String, String> modifyPost(
            @PathVariable Long postId,
            @RequestBody FreeBoardDTO freeBoardDTO){

        /*
         * FreeBoardDTO Json에 필요한 필드:
         * 1. postId 2. title 3. content
         * */
        log.info("FreeBoardController: modifyPost -----------------------");
        log.info("FreeBoardDTO: " + freeBoardDTO);

        freeBoardService.modify(freeBoardDTO);

        return Map.of("result", "success");
    }

    // delete a specific post (error)
    @DeleteMapping("/{postId}")
    public Map<String, String> removePost(@PathVariable Long postId){

        log.info("FreeBoardController: removePost -----------------------");

        freeBoardService.remove(postId);

        return Map.of("result", "success");
    }


    // write post's comment
    @PostMapping(value = "/{postId}/comment", consumes = MediaType.APPLICATION_JSON_VALUE)
    public Map<String, Long> writeComment(
            @PathVariable Long postId,
            @RequestBody @Valid FreeBoardCommentDTO freeBoardCommentDTO){

        /*
         * FreeBoardCommentDTO Json에 필요한 필드:
         * 1. commentText 2. commentWriter
         * */

        log.info("FreeBoardController: writeComment -----------------------");
        log.info("FreeBoardCommentDTO: " + freeBoardCommentDTO);

        FreeBoard freeBoard = freeBoardRepository.findById(postId).orElseThrow();
        Member member = memberRepository.findByMid(freeBoardCommentDTO.getCommentWriter()).orElseThrow();
        Long commentId = freeBoardCommentService.register(freeBoardCommentDTO, member, freeBoard);

        return Map.of("commentId", commentId);
    }

    // read post's comments
    @GetMapping("/{postId}/comment")
    public ResponseEntity<List<FreeBoardCommentDTO>> readComments(@PathVariable Long postId){

        log.info("FreeBoardController: readComments -----------------------");

        List<FreeBoardCommentDTO> dtoList = freeBoardCommentService.listByPostId(postId);

        return ResponseEntity.ok(dtoList);
    }

    // modify post's comment
    @PutMapping(value = "/{postId}/{commentId}", consumes = MediaType.APPLICATION_JSON_VALUE)
    public Map<String, String> modifyComment(
            @PathVariable Long postId,
            @PathVariable Long commentId,
            @RequestBody @Valid FreeBoardCommentDTO freeBoardCommentDTO
    ){
        /*
         * FreeBoardCommentDTO Json에 필요한 필드:
         * 1. commentId 2. commentText
         * */
        log.info("FreeBoardController: modifyComment -----------------------");
        log.info("FreeBoardCommentDTO: " + freeBoardCommentDTO);

        freeBoardCommentService.modify(freeBoardCommentDTO);

        return Map.of("result", "success");
    }


    // delete post's comment
    @DeleteMapping("/{postId}/{commentId}")
    public Map<String, String> removeComment(
            @PathVariable Long postId,
            @PathVariable Long commentId
    ){

        log.info("FreeBoardController: removeComment -----------------------");

        freeBoardCommentService.remove(commentId);

        return Map.of("result", "success");
    }

}
