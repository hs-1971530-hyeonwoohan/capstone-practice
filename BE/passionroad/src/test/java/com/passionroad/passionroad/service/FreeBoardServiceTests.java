package com.passionroad.passionroad.service;

import com.passionroad.passionroad.domain.user.User;
import com.passionroad.passionroad.dto.FreeBoardDTO;
import com.passionroad.passionroad.dto.PageRequestDTO;
import com.passionroad.passionroad.dto.PageResponseDTO;
import com.passionroad.passionroad.repository.UserRepository;
import lombok.extern.log4j.Log4j2;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
@Log4j2
public class FreeBoardServiceTests {

    @Autowired
    private FreeBoardService freeBoardService;
    @Autowired
    private UserRepository userRepository;

    @Test
    public void testRegister(){
        log.info(freeBoardService.getClass().getName());

        // user who will post
        Long userId = 100L;
        User user = userRepository.findById(userId).orElseThrow();
        // post made by user
        FreeBoardDTO boardDTO = FreeBoardDTO.builder()
                .title("sample title...")
                .content("sample content...")
                .build();

        Long postId = freeBoardService.register(boardDTO, user);

        log.info("postId: " + postId); // post_id of user 100
    }

    @Test
    public void testReadOne(){
        Long postId = 101L;
        FreeBoardDTO freeBoardDTO = freeBoardService.readOne(postId);
        log.info(freeBoardDTO);
    }

    @Test
    public void testList(){

        PageRequestDTO pageRequestDTO = PageRequestDTO.builder()
                .type("tcw")    // title, content, writer
                .keyword("1")   // posts that contain "1"
                .page(1)    // page 1, 2
                .size(10)
                .build();

        PageResponseDTO<FreeBoardDTO> pageResponseDTO = freeBoardService.list(pageRequestDTO);

        log.info(pageResponseDTO);
    }

    @Test
    public void testModify(){
        FreeBoardDTO freeBoardDTO = FreeBoardDTO.builder()
                .postId(101L)
                .title("updated for service test... 101")
                .content("updated for service test... 101")
                .build();

        freeBoardService.modify(freeBoardDTO);
    }

    @Test
    public void testDelete(){
        freeBoardService.remove(2L);
    }
}
