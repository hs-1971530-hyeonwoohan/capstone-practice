package com.passionroad.passionroad.dto;

import com.passionroad.passionroad.domain.freeboard.FreeBoard;
import com.passionroad.passionroad.domain.freeboard.FreeBoardComment;
import com.passionroad.passionroad.domain.user.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class FreeBoardCommentDTO {

    private Long commentId; // comment_id
    private Long authorId; // user id(author_id)
    private Long postId;    // post id
    private String commentText;
    private String commentWriter;
    private LocalDateTime regDate, modDate; // data format: 2021-01-01T00:00

    // DTO -> ENTITY
    public FreeBoardComment toEntity(User user, FreeBoard freeBoard){
        return FreeBoardComment.builder()
                .commentId(this.commentId)
                .commentText(this.commentText)
                .commentWriter(this.commentWriter)
                .user(user)
                .freeBoard(freeBoard)
                .build();
    }

    // ENTITY -> DTO
    public static FreeBoardCommentDTO fromEntity(FreeBoardComment freeBoardComment){
        return FreeBoardCommentDTO.builder()
                .commentId(freeBoardComment.getCommentId())
                .authorId(freeBoardComment.getUser().getId())
                .postId(freeBoardComment.getFreeBoard().getPostId())
                .commentText(freeBoardComment.getCommentText())
                .commentWriter(freeBoardComment.getUser().getName())
                .regDate(freeBoardComment.getRegDate())
                .modDate(freeBoardComment.getModDate())
                .build();
    }

}
