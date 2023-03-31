package com.passionroad.passionroad.service;

import com.passionroad.passionroad.domain.FreeBoard;
import com.passionroad.passionroad.domain.user.User;
import com.passionroad.passionroad.dto.FreeBoardDTO;
import com.passionroad.passionroad.repository.FreeBoardRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@Service
@Log4j2
@RequiredArgsConstructor
@Transactional
public class FreeBoardService {
    private final FreeBoardRepository freeBoardRepository;

    // write post & save into DB
    public Long register(FreeBoardDTO freeBoardDTO, User user) {

        FreeBoard freeBoard = freeBoardDTO.toEntity(user);

        Long postId = freeBoardRepository.save(freeBoard).getPostId();
        return postId;
    }

    // read one by post_id
    public FreeBoardDTO readOne(Long postId){

        // return entity
        FreeBoard freeBoard = freeBoardRepository.findById(postId).orElseThrow();
        // return dto
        return FreeBoardDTO.fromEntity(freeBoard);
    }


    public List<FreeBoard> readAll(){

        Pageable pageable = PageRequest.of(1, 10, Sort.by("postId").descending());

        Page<FreeBoard> result = freeBoardRepository.findAll(pageable);

        List<FreeBoard> freeBoardList = result.getContent();    // return Page<FreeBoard> List
        freeBoardList.forEach(freeBoard -> log.info(freeBoard));

        return freeBoardList;
    }

    // (GET) readOne() to modify original data -> (POST) make dto with modified data -> modify(dto)
    public void modify(FreeBoardDTO freeBoardDTO) {

        FreeBoard freeBoard = freeBoardRepository.findById(freeBoardDTO.getPostId()).orElseThrow();

        log.info(freeBoard);

        freeBoard.change(freeBoardDTO.getTitle(), freeBoardDTO.getContent());

        freeBoardRepository.save(freeBoard);
    }

    //
    public void remove(Long postId){
        freeBoardRepository.deleteById(postId);
    }

}
