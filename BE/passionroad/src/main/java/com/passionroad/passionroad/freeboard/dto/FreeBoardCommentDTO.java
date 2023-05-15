package com.passionroad.passionroad.freeboard.dto;

import com.passionroad.passionroad.freeboard.domain.freeboard.FreeBoard;
import com.passionroad.passionroad.freeboard.domain.freeboard.FreeBoardComment;
import com.passionroad.passionroad.member.domain.Member;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotEmpty;
import java.time.LocalDateTime;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class FreeBoardCommentDTO {

    private Long commentId; // comment_id
    private Long authorId; // user id(author_id)
    private Long postId;    // post id
    @NotEmpty
    private String commentText;
    private String commentWriter;
    private LocalDateTime regDate, modDate; // data format: 2021-01-01T00:00

    // DTO -> ENTITY
    public FreeBoardComment toEntity(Member member, FreeBoard freeBoard){
        return FreeBoardComment.builder()
                .commentId(this.commentId)
                .commentText(this.commentText)
                .commentWriter(this.commentWriter)
                .member(member)
                .freeBoard(freeBoard)
                .build();
    }

    // ENTITY -> DTO
    public static FreeBoardCommentDTO fromEntity(FreeBoardComment freeBoardComment){
        return FreeBoardCommentDTO.builder()
                .commentId(freeBoardComment.getCommentId())
                .authorId(freeBoardComment.getMember().getId())
                .postId(freeBoardComment.getFreeBoard().getPostId())
                .commentText(freeBoardComment.getCommentText())
//                OAuth2 비활성화 & Member 엔티티 name column 삭제
//                .commentWriter(freeBoardComment.getMember().getName())
                .commentWriter(freeBoardComment.getMember().getMid())
                .regDate(freeBoardComment.getRegDate())
                .modDate(freeBoardComment.getModDate())
                .build();
    }

}
