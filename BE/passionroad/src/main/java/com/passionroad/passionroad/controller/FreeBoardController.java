package com.passionroad.passionroad.controller;

import com.passionroad.passionroad.dto.FreeBoardCommentDTO;
import com.passionroad.passionroad.dto.FreeBoardDTO;
import com.passionroad.passionroad.dto.PageRequestDTO;
import com.passionroad.passionroad.dto.PageResponseDTO;
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

@RestController
@RequestMapping("/api/freeboards")
@RequiredArgsConstructor
@Log4j2
public class FreeBoardController {

    /* GET PROCESS:
     * 1. browser requests GET to Server to read post.
     * 2. Controller gets the request.
     * 3. Service method returns the post dto.
     * 4. Controller send json data after dto -> json.
     *
     * POST PROCESS:
     * 1. browser requests POST to Server with data to write post.
     * 2. Controller gets the request.
     * 3. Controller method converts json -> dto (@RequestBody parameter)
     * 4. Service method gets dto and save the data in DB.
     * */

    private final FreeBoardService freeBoardService;
    private final MemberRepository memberRepository;
    private final FreeBoardCommentService freeBoardCommentService;

     /* write freeboard post
     *  GET: return user name by UserDetails
     *  POST: create freeboard post*/

    /*@PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<FreeBoardDTO> writePost(
            @RequestBody @Valid FreeBoardDTO freeBoardDTO,
            @AuthenticationPrincipal UserDetails userDetails){

        // get user info
//        userDetails.getUsername()

        return null;
    }*/


    @GetMapping
    public ResponseEntity<PageResponseDTO<FreeBoardDTO>> listPosts(
            @RequestParam(defaultValue = "1") String page,
            @RequestParam(defaultValue = "10") String size,
            @RequestParam(required = false) String type,
            @RequestParam(required = false) String keyword) {

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

        FreeBoardDTO freeBoardDTO = freeBoardService.readOne(postId);

        return ResponseEntity.ok(freeBoardDTO);
    }

    // modify a specific post
    @PostMapping("/{postId}")
    public ResponseEntity<Void> modifyPost(
            @PathVariable Long postId,
            @RequestParam(required = false) String title,
            @RequestParam(required = false) String content){

        FreeBoardDTO freeBoardDTO = FreeBoardDTO.builder()
                .postId(postId)
                .title(title)
                .content(content)
                .build();

        freeBoardService.modify(freeBoardDTO);

        return ResponseEntity.noContent().build();
    }

    // delete a specific post (error)
    /*@DeleteMapping("/{postId}")
    public ResponseEntity<Void> removePost(@PathVariable Long postId){

        freeBoardService.remove(postId);

        return ResponseEntity.noContent().build();
    }*/

    // write post's comment
    @PostMapping("/{postId}/comments")
    public ResponseEntity<Void> writeComment(){

        return null;
    }

    // read post's comments
    @GetMapping("/{postId}/comments")
    public ResponseEntity<List<FreeBoardCommentDTO>> readComments(@PathVariable Long postId){

        List<FreeBoardCommentDTO> dtoList = freeBoardCommentService.listByPostId(postId);

        return ResponseEntity.ok(dtoList);
    }

    // modify post's comment
    @PostMapping(value = "/{postId}/{commentId}", consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Void> modifyComment(
            @PathVariable Long postId,
            @PathVariable Long commentId,
            @RequestBody @Valid FreeBoardCommentDTO freeBoardCommentDTO
    ){
        // necessary dto parameter: commentId, commentText
        log.info("FreeBoardController: modifyComment -----------------------");
        log.info("FreeBoardCommentDTO: " + freeBoardCommentDTO);

        freeBoardCommentService.modify(freeBoardCommentDTO);

        return ResponseEntity.noContent().build();
    }


    // delete post's comment
    @DeleteMapping("/{postId}/{commentId}")
    public ResponseEntity<Void> removeComment(
            @PathVariable Long postId,
            @PathVariable Long commentId
    ){
        freeBoardCommentService.remove(commentId);

        return ResponseEntity.noContent().build();
    }

}
