package com.passionroad.passionroad.service;

import com.passionroad.passionroad.domain.Users;
import com.passionroad.passionroad.dto.FreeBoardDTO;
import com.passionroad.passionroad.repository.UsersRepository;
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
    private UsersRepository usersRepository;

    @Test
    public void testRegister(){
        log.info(freeBoardService.getClass().getName());

        // user who will post
        Long userId = 100L;
        Users users = usersRepository.findById(userId).orElseThrow();
        // post made by user
        FreeBoardDTO boardDTO = FreeBoardDTO.builder()
                .title("sample title...")
                .content("sample content...")
                .build();

        Long postId = freeBoardService.register(boardDTO, users);

        log.info("postId: " + postId); // post_id of user 100
    }

    @Test
    public void testReadOne(){
        Long postId = 101L;
        FreeBoardDTO freeBoardDTO = freeBoardService.readOne(postId);
        log.info(freeBoardDTO);
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
