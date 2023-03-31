package com.passionroad.passionroad.repository;

import com.passionroad.passionroad.domain.user.User;
import lombok.extern.log4j.Log4j2;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.Optional;
import java.util.stream.IntStream;

@SpringBootTest
@Log4j2
public class UserRepositoryTest {
    /*
    * Test Business Logic Service using UserRepository
    * Don't make 'delete' for Users Entity
    * */

    @Autowired
    private UserRepository userRepository;

    @Test
    public void testInsert(){  // user register test

        // make test Users Entity instance
        IntStream.rangeClosed(1, 100).forEach(i -> {
            User user = User.builder()
//                    .nickname("nickname......" + i)
                    .build();

            // insert or update result
            User result = userRepository.save(user);
            log.info("user_id: " + result.getId());
        });
    }

    @Test
    public void testSelect(){
        Long bno = 100L;

        Optional<User> result = userRepository.findById(bno);

        User user = result.orElseThrow();

        log.info(user);
    }

    @Test
    public void testUpdate(){
        Long user_id = 100L;

        Optional<User> result = userRepository.findById(user_id);

        User user = result.orElseThrow();
//
//        users.changePw("update..pw 100");    // title, content

        userRepository.save(user);
    }

    @Test
    public void testDelete(){
        Long user_id = 1L;

        userRepository.deleteById(user_id);
    }
}
