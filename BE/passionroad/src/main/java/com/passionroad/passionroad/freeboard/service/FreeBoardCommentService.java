package com.passionroad.passionroad.freeboard.service;

import com.passionroad.passionroad.freeboard.domain.freeboard.FreeBoard;
import com.passionroad.passionroad.freeboard.domain.freeboard.FreeBoardComment;
import com.passionroad.passionroad.freeboard.dto.FreeBoardCommentDTO;
import com.passionroad.passionroad.member.domain.Member;
import com.passionroad.passionroad.freeboard.repository.FreeBoardCommentRepository;
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
    public Long register(FreeBoardCommentDTO freeBoardCommentDTO, Member member, FreeBoard freeBoard){

        FreeBoardComment freeBoardComment = freeBoardCommentDTO.toEntity(member, freeBoard);

        return freeBoardCommentRepository.save(freeBoardComment).getCommentId();
    }

    // read comments by post_id : post page
    public List<FreeBoardCommentDTO> listByPostId(Long postId){
        List<FreeBoardComment> comments = freeBoardCommentRepository.findAllByFreeBoard_PostId(postId).orElseThrow();

        return comments.stream().map(FreeBoardCommentDTO::fromEntity).collect(Collectors.toList());
    }

    // read comments by (user) id (fk) : dashboard page
    public List<FreeBoardCommentDTO> listByMemberId(Long memberId){

        List<FreeBoardComment> comments = freeBoardCommentRepository.findAllByMember_Id(memberId).orElseThrow();

        return comments.stream().map(FreeBoardCommentDTO::fromEntity).collect(Collectors.toList());
    }

    public FreeBoardCommentDTO readComment(Long commentId){
        FreeBoardComment freeBoardComment = freeBoardCommentRepository.findById(commentId).orElseThrow();

        return FreeBoardCommentDTO.fromEntity(freeBoardComment);
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
