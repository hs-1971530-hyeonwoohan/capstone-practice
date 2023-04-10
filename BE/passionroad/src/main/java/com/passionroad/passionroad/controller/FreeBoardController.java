package com.passionroad.passionroad.controller;

import com.passionroad.passionroad.dto.FreeBoardDTO;
import com.passionroad.passionroad.dto.PageRequestDTO;
import com.passionroad.passionroad.dto.PageResponseDTO;
import com.passionroad.passionroad.repository.FreeBoardRepository;
import com.passionroad.passionroad.repository.UserRepository;
import com.passionroad.passionroad.service.FreeBoardService;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

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
    private final UserRepository userRepository;

    // write freeboard post
    @PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<FreeBoardDTO> writePost(
            @RequestBody @Valid FreeBoardDTO freeBoardDTO,
            @AuthenticationPrincipal UserDetails userDetails){

        // get user info
//        userDetails.getUsername()

        return null;
    }

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
    @GetMapping("/{id}")
    public ResponseEntity<FreeBoardDTO> readPost(@PathVariable Long id){

        FreeBoardDTO freeBoardDTO = freeBoardService.readOne(id);

        return ResponseEntity.ok(freeBoardDTO);
    }

}
