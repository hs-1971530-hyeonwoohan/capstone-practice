package com.passionroad.passionroad.service;

import com.passionroad.passionroad.domain.FreeBoard;
import com.passionroad.passionroad.domain.Users;
import com.passionroad.passionroad.dto.FreeBoardDTO;
import com.passionroad.passionroad.repository.FreeBoardRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
@Service
@Log4j2
@RequiredArgsConstructor
@Transactional
public class FreeBoardService {
    private final FreeBoardRepository freeBoardRepository;

    // write post & save into DB
    public Long register(FreeBoardDTO freeBoardDTO, Users users) {

        FreeBoard freeBoard = freeBoardDTO.toEntity(users);

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

/* ************* not finished *************

    public Page<FreeBoardDTO> readAll(){

        Pageable pageable = PageRequest.of(0, 10, Sort.by("postId").descending());

        Page<FreeBoard> result = freeBoardRepository.findAll(pageable);

        List<FreeBoard> freeBoardList = result.getContent();
        freeBoardList.forEach(freeBoard -> log.info(freeBoard));


    }
**********************************************/

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
