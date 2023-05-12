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
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

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
    public ResponseEntity<String> modifyPost(
            @PathVariable Long postId,
            @RequestBody FreeBoardDTO freeBoardDTO){

        log.info("FreeBoardController: modifyPost -----------------------");

        FreeBoardDTO freeBoardDTOForMid = freeBoardService.readOne(postId);

        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        String mid = null;

        if(principal instanceof UserDetails){
            mid = ((UserDetails) principal).getUsername();
            log.info("mid(username): " + mid);
        }else{
            mid = principal.toString();
            log.info("mid(username): " + mid);
        }

        /*
         * FreeBoardDTO Json에 필요한 필드:
         * 1. title 2. content 3. postId
         * */
        log.info("FreeBoardDTO: " + freeBoardDTO);

        if(mid.equals(freeBoardDTOForMid.getWriter())){
            
            // 글 작성자와 토큰 mid가 같다: 수정 허용
            log.info("modifyPost >> writer == mid");
            
            freeBoardService.modify(freeBoardDTO);

            return new ResponseEntity<>("Modifying Post Succeed", HttpStatus.OK);
        }else{
            
            // 글 작성자와 토큰 mid가 다르다: 수정 불허
            log.info("modifyPost >> writer != mid");

            return new ResponseEntity<>("Modifying Post Failed", HttpStatus.METHOD_NOT_ALLOWED);
        }
    }

    // delete a specific post (error)
    @DeleteMapping("/{postId}")
    public ResponseEntity<String> removePost(@PathVariable Long postId){

        log.info("FreeBoardController: removePost -----------------------");

        FreeBoardDTO freeBoardDTOForMid = freeBoardService.readOne(postId);

        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        String mid = null;

        if(principal instanceof UserDetails){
            mid = ((UserDetails) principal).getUsername();
            log.info("mid(username): " + mid);
        }else{
            mid = principal.toString();
            log.info("mid(username): " + mid);
        }

        if(mid.equals(freeBoardDTOForMid.getWriter())){

            // 글 작성자와 토큰 mid가 같다: 삭제 허용
            log.info("removePost >> writer == mid");

            // 외래키 제약조건 때문에 댓글 먼저 전부 삭제
            List<FreeBoardCommentDTO> commentDTOList = freeBoardCommentService.listByPostId(postId);

            commentDTOList.forEach(commentDTO -> {
                freeBoardCommentService.remove(commentDTO.getCommentId());
            });
            freeBoardService.remove(postId);

            return new ResponseEntity<>("Remove Post Succeed", HttpStatus.OK);
        }else{

            // 글 작성자와 토큰 mid가 다르다: 삭제 불허
            log.info("removePost >> writer != mid");

            return new ResponseEntity<>("Remove Post Failed", HttpStatus.METHOD_NOT_ALLOWED);
        }
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
    public ResponseEntity<String> modifyComment(
            @PathVariable Long postId,
            @PathVariable Long commentId,
            @RequestBody @Valid FreeBoardCommentDTO freeBoardCommentDTO
    ){

        log.info("FreeBoardController: modifyComment -----------------------");

        FreeBoardCommentDTO commentDTOForMid = freeBoardCommentService.readComment(commentId);

        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        String mid = null;

        if(principal instanceof UserDetails){
            mid = ((UserDetails) principal).getUsername();
            log.info("mid(username): " + mid);
        }else{
            mid = principal.toString();
            log.info("mid(username): " + mid);
        }

        /*
         * FreeBoardCommentDTO Json에 필요한 필드:
         * 1. commentId 2. commentText
         * */
        log.info("FreeBoardCommentDTO: " + freeBoardCommentDTO);

        if(mid.equals(commentDTOForMid.getCommentWriter())){

            // 댓글 작성자와 토큰 mid가 같다: 수정 허용
            log.info("modifyComment >> commentWriter == mid");

            freeBoardCommentService.modify(freeBoardCommentDTO);

            return new ResponseEntity<>("Modifying Comment Succeed", HttpStatus.OK);
        }else{

            // 글 작성자와 토큰 mid가 다르다: 수정 불허
            log.info("modifyComment >> commentWriter != mid");

            return new ResponseEntity<>("Modifying Comment Failed", HttpStatus.METHOD_NOT_ALLOWED);
        }
    }


    // delete post's comment
    @DeleteMapping("/{postId}/{commentId}")
    public ResponseEntity<String> removeComment(
            @PathVariable Long postId,
            @PathVariable Long commentId
    ){

        log.info("FreeBoardController: removeComment -----------------------");

        FreeBoardCommentDTO commentDTOForMid = freeBoardCommentService.readComment(commentId);

        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        String mid = null;

        if(principal instanceof UserDetails){
            mid = ((UserDetails) principal).getUsername();
            log.info("mid(username): " + mid);
        }else{
            mid = principal.toString();
            log.info("mid(username): " + mid);
        }

        /*
         * FreeBoardCommentDTO Json에 필요한 필드:
         * 1. commentId
         * */

        if(mid.equals(commentDTOForMid.getCommentWriter())){

            // 댓글 작성자와 토큰 mid가 같다: 수정 허용
            log.info("removeComment >> commentWriter == mid");

            freeBoardCommentService.remove(commentId);

            return new ResponseEntity<>("Remove Comment Succeed", HttpStatus.OK);
        }else{

            // 글 작성자와 토큰 mid가 다르다: 수정 불허
            log.info("removeComment >> commentWriter != mid");

            return new ResponseEntity<>("Remove Comment Failed", HttpStatus.METHOD_NOT_ALLOWED);
        }
    }

}
