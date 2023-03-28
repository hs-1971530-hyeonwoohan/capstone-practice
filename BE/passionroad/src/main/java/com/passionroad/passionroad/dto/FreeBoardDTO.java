package com.passionroad.passionroad.dto;

import com.passionroad.passionroad.domain.FreeBoard;
import com.passionroad.passionroad.domain.Users;
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
public class FreeBoardDTO {

    private Long postId;   // post_id
    private Long authorId; // user_id(author_id)
    @NotEmpty
    private String title;
    @NotEmpty
    private String content;
    private String writer;  // user nickname
    private LocalDateTime regDate, modDate; // data format: 2021-01-01T00:00

    // DTO -> ENTITY
    public FreeBoard toEntity(Users users) {
        return FreeBoard.builder()
                .postId(this.postId)
                .title(this.title)
                .content(this.content)
                .users(users)
                .build();
    }

    // ENTITY -> DTO
    public static FreeBoardDTO fromEntity(FreeBoard freeBoard) {
        return FreeBoardDTO.builder()
                .postId(freeBoard.getPostId())
                .authorId(freeBoard.getUsers().getUserId())
                .title(freeBoard.getTitle())
                .content(freeBoard.getContent())
                .writer(freeBoard.getUsers().getNickname()) // user nickname
                .regDate(freeBoard.getRegDate())
                .modDate(freeBoard.getModDate())
                .build();
    }

}
