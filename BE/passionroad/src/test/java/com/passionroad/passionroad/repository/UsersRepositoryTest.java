package com.passionroad.passionroad.repository;

import com.passionroad.passionroad.domain.Users;
import lombok.extern.log4j.Log4j2;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.Optional;
import java.util.stream.IntStream;

@SpringBootTest
@Log4j2
public class UsersRepositoryTest {
    /*
    * Test Business Logic Service using UserRepository
    * Don't make 'delete' for Users Entity
    * */

    @Autowired
    private UsersRepository usersRepository;

    @Test
    public void testInsert(){  // user register test

        // make test Users Entity instance
        IntStream.rangeClosed(1, 100).forEach(i -> {
            Users users = Users.builder()
                    .id("id......" + i)
                    .pw("pw......" + i)
                    .nickname("nickname......" + i)
                    .build();

            // insert or update result
            Users result = usersRepository.save(users);
            log.info("user_id: " + result.getUser_id());
        });
    }

    @Test
    public void testSelect(){
        Long bno = 100L;

        Optional<Users> result = usersRepository.findById(bno);

        Users users = result.orElseThrow();

        log.info(users);
    }

    @Test
    public void testUpdate(){
        Long user_id = 100L;

        Optional<Users> result = usersRepository.findById(user_id);

        Users users = result.orElseThrow();

        users.changePw("update..pw 100");    // title, content

        usersRepository.save(users);
    }

    @Test
    public void testDelete(){
        Long user_id = 1L;

        usersRepository.deleteById(user_id);
    }
}
