package com.passionroad.passionroad.service;

import com.passionroad.passionroad.domain.freeboard.FreeBoard;
import com.passionroad.passionroad.domain.freeboard.FreeBoardComment;
import com.passionroad.passionroad.domain.user.User;
import com.passionroad.passionroad.dto.FreeBoardCommentDTO;
import com.passionroad.passionroad.repository.FreeBoardCommentRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Log4j2
@Transactional

public class FreeBoardCommentService {

    private final FreeBoardCommentRepository freeBoardCommentRepository;

    // write comment
    public Long register(FreeBoardCommentDTO freeBoardCommentDTO, User user, FreeBoard freeBoard){

        FreeBoardComment freeBoardComment = freeBoardCommentDTO.toEntity(user, freeBoard);

        return freeBoardCommentRepository.save(freeBoardComment).getCommentId();
    }

    // read comments by post_id : post page
    public List<FreeBoardCommentDTO> listByPostId(Long postId){
        List<FreeBoardComment> comments = freeBoardCommentRepository.findAllByFreeBoard_PostId(postId).orElseThrow();

        return comments.stream().map(FreeBoardCommentDTO::fromEntity).collect(Collectors.toList());
    }

    // read comments by (user) id (fk) : dashboard page
    public List<FreeBoardCommentDTO> listByUserId(Long userId){

        List<FreeBoardComment> comments = freeBoardCommentRepository.findAllByUser_Id(userId).orElseThrow();

        return comments.stream().map(FreeBoardCommentDTO::fromEntity).collect(Collectors.toList());
    }

    // modify comments
    public void modify(FreeBoardCommentDTO dto){

        FreeBoardComment comment = freeBoardCommentRepository.findById(dto.getCommentId()).orElseThrow();

        comment.changeText(dto.getCommentText());

        freeBoardCommentRepository.save(comment);
    }

    // delete comment
    public void remove (Long commentId) {
        freeBoardCommentRepository.deleteById(commentId);
    }

}
