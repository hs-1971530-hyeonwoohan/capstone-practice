package com.passionroad.passionroad.repository;

import com.passionroad.passionroad.domain.member.Member;
import com.passionroad.passionroad.domain.member.Role;
import lombok.extern.log4j.Log4j2;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Optional;
import java.util.stream.IntStream;

@SpringBootTest
@Log4j2
public class MemberRepositoryTest {
    /*
    * Test Business Logic Service using UserRepository
    * Don't make 'delete' for Users Entity
    * */

    @Autowired
    private MemberRepository memberRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Test
    public void testInsert(){  // user register test
//
//        // make test Users Entity instance
//        IntStream.rangeClosed(1, 100).forEach(i -> {
//            Member member = Member.builder()
////                    .nickname("nickname......" + i)
//                    .build();
//
//            // insert or update result
//            Member result = memberRepository.save(member);
//            log.info("user_id: " + result.getId());
//        });

        IntStream.rangeClosed(1, 100).forEach(i -> {
            Member member = Member.builder()
                    .mid("user" + i)
                    .mpw(passwordEncoder.encode("1111"))
                    .role(Role.USER)
                    .build();

            memberRepository.save(member);
        });
    }

    @Test
    public void testSelect(){
        Long bno = 100L;

        Optional<Member> result = memberRepository.findById(bno);

        Member member = result.orElseThrow();

        log.info(member);
    }

    @Test
    public void testUpdate(){
        Long user_id = 100L;

        Optional<Member> result = memberRepository.findById(user_id);

        Member member = result.orElseThrow();
//
//        users.changePw("update..pw 100");    // title, content

        memberRepository.save(member);
    }

    @Test
    public void testDelete(){
        Long user_id = 1L;

        memberRepository.deleteById(user_id);
    }
}
