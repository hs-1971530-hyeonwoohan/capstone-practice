package com.passionroad.passionroad.freeboard.dto;

import com.passionroad.passionroad.freeboard.domain.freeboard.FreeBoard;
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
public class FreeBoardDTO {

    private Long postId;   // post_id
    private Long authorId; // user id(author_id)
    @NotEmpty
    private String title;
    @NotEmpty
    private String content;
    private String writer;  // user nickname
    private LocalDateTime regDate, modDate; // data format: 2021-01-01T00:00

    // DTO -> ENTITY
    public FreeBoard toEntity(Member member) {
        return FreeBoard.builder()
                .postId(this.postId)
                .title(this.title)
                .content(this.content)
                .writer(this.writer)
                .member(member)
                .build();
    }

    // ENTITY -> DTO
    public static FreeBoardDTO fromEntity(FreeBoard freeBoard) {
        return FreeBoardDTO.builder()
                .postId(freeBoard.getPostId())
                .authorId(freeBoard.getMember().getId())
                .title(freeBoard.getTitle())
                .content(freeBoard.getContent())
//                OAuth2 비활성화 & Member 엔티티 name column 삭제
//                .writer(freeBoard.getMember().getName())
                .writer(freeBoard.getMember().getMid())
                .regDate(freeBoard.getRegDate())
                .modDate(freeBoard.getModDate())
                .build();
    }

}
