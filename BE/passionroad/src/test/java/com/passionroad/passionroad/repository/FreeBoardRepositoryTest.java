package com.passionroad.passionroad.repository;

import com.passionroad.passionroad.freeboard.domain.freeboard.FreeBoard;
import com.passionroad.passionroad.freeboard.repository.FreeBoardRepository;
import com.passionroad.passionroad.member.domain.Member;
import com.passionroad.passionroad.member.repository.MemberRepository;
import lombok.extern.log4j.Log4j2;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;

import javax.transaction.Transactional;
import java.sql.Array;
import java.util.*;
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
    private MemberRepository memberRepository;

    @Test
    public void testInsert(){
//        Member member = memberRepository.findByEmail("kimhankimhan1111@gmail.com").orElseThrow();

        String[] arr = {
                "안녕하세요 가입했습니다!",
                "오늘 면접보고 왔어요..",
                "합격자분들 팁같은거 있나요?",
                "합격했습니다 질문받아요 ~",
                "프론트를 해야할까요 백엔드를 해야할까요?",
                "오늘부터 진짜 열심히 할거에요",
                "같이 스터디 하실분 있나요?",
                "순공부 10시간 찍었습니다 !!!",
                "알고리즘 스터디원 구합니다",
                "SpringBoot 스터디하실분 구해요"
        };
        List<String> titlesAndContents = new ArrayList<>(Arrays.asList(arr));

        IntStream.rangeClosed(1, 100).forEach(i -> {

            Random random = new Random();
            int randomInt = random.nextInt(10);

            Member member = memberRepository.findByMid("user" + (i % 10 + 1)).orElseThrow();

            FreeBoard freeBoard = FreeBoard.builder()
                    .title(titlesAndContents.get(randomInt))
                    .content(titlesAndContents.get(randomInt))
                    .writer(member.getMid())
                    .member(member)
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
