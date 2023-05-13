package com.passionroad.passionroad.freeboard.domain.freeboard;

import com.passionroad.passionroad.member.domain.BaseEntity;
import com.passionroad.passionroad.member.domain.Member;
import lombok.*;

import javax.persistence.*;
import java.util.List;

@Entity
@Builder
@Getter
@AllArgsConstructor
@NoArgsConstructor
@ToString(exclude = "member")
public class FreeBoard extends BaseEntity {
    // free_board entity

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "post_id")
    private Long postId;    // 식별자

    @Column
    private String title;   // 제목

    @Column(columnDefinition = "TEXT")
    private String content; // 내용

    @Column
    private String writer;  // 작성자

    // many freeboard entities can join with one user
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "author_id") // make fk named 'author_id'
    private Member member;            // entity for join

    @OneToMany(mappedBy = "freeBoard", fetch = FetchType.LAZY)
    private List<FreeBoardComment> freeBoardCommentList;

    public void change(String title, String content) {
        this.title = title;
        this.content = content;
    }
}
