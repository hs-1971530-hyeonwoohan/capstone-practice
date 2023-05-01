package com.passionroad.passionroad.repository;

import com.passionroad.passionroad.domain.freeboard.FreeBoard;
import com.passionroad.passionroad.domain.user.User;
import lombok.extern.log4j.Log4j2;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;
import java.util.stream.IntStream;

@SpringBootTest
@Log4j2
public class FreeBoardRepositoryTest {
    /*
    * - Test Business Logic Service using FreeBoardRepository
    * - insert, select by user & title & content (pageable), selectAll(pageable), update, delete
    * -
    * */

    @Autowired
    private FreeBoardRepository freeBoardRepository;
    @Autowired
    private UserRepository userRepository;

    @Test
    public void testInsert(){
        User user = userRepository.findByEmail("kimhankimhan1111@gmail.com").orElseThrow();

        IntStream.rangeClosed(1, 100).forEach(i -> {
            FreeBoard freeBoard = FreeBoard.builder()
                    .title("title..." + i)
                    .content("content..." + i)
                    .writer("writer..." + i)
                    .user(user)
                    .build();

            FreeBoard result = freeBoardRepository.save(freeBoard);
            log.info("post_id: " + result.getPostId());
        });
    }

    @Test
    public void testSelect(){
        Long post_id = 100L;

        Optional<FreeBoard> result = freeBoardRepository.findById(post_id);

        FreeBoard freeBoard = result.orElseThrow();

        log.info(freeBoard);
    }

    @Test
    @Transactional
    public void testSelectAll(){

        Pageable pageable = PageRequest.of(0, 10, Sort.by("postId").descending());

        Page<FreeBoard> result = freeBoardRepository.findAll(pageable);

        log.info("total count: " + result.getTotalElements());
        log.info("total pages: " + result.getTotalPages());
        log.info("page number: " + result.getNumber());
        log.info("page size: " + result.getSize());

        List<FreeBoard> freeBoardList = result.getContent();
        freeBoardList.forEach(freeBoard -> log.info(freeBoard));
    }

    @Test
    @Transactional
    public void testUpdate(){
        Long postId = 101L;

        Optional<FreeBoard> result = freeBoardRepository.findById(postId);

        FreeBoard freeBoard = result.orElseThrow();

        freeBoard.change("updated...title 101", "updated content 101");

        freeBoardRepository.save(freeBoard);

        log.info(freeBoard);
    }

    @Test
    public void testDelete(){
        Long post_id = 1L;

        freeBoardRepository.deleteById(post_id);
    }

    // Querydsl JPQLQuery method test
    @Test
    public void testSearch1(){
        // page order by postId desc
        Pageable pageable = PageRequest.of(1, 10, Sort.by("postId").descending());

        freeBoardRepository.search1(pageable);  // return Page<FreeBoard>
    }

    @Test
    public void testSearchAll(){
        String[] types = {"t", "c", "w"};

        String keyword = "1";

        Pageable pageable = PageRequest.of(0, 10, Sort.by("postId").descending());

        Page<FreeBoard> result = freeBoardRepository.searchAll(types, keyword, pageable);

        // total pages
        log.info(result.getTotalPages());

        // page size
        log.info(result.getSize());

        // page number
        log.info(result.getNumber());

        // prev next
        log.info(result.hasPrevious() + " : " + result.hasNext());

        result.getContent().forEach(freeBoard -> log.info(freeBoard));
    }


}
