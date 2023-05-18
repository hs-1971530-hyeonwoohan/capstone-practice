package com.passionroad.passionroad.freeboard.domain.freeboard;

import com.passionroad.passionroad.BaseEntity;
import com.passionroad.passionroad.member.domain.Member;
import lombok.*;

import javax.persistence.*;

@Entity
@Getter
@ToString(exclude = {"freeBoard", "member"})
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class FreeBoardComment extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "comment_id")
    private Long commentId;

    @Column(name = "comment_text", columnDefinition = "TEXT")
    private String commentText;

    @Column(name = "comment_writer")
    private String commentWriter;

    // many FreeBoardComment entities can join with one FreeBoard
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "post_id") // make fk named 'post_id'
    private FreeBoard freeBoard;            // entity for join

    // many freeboard entities can join with one user
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "author_id") // make fk named 'author_id'
    private Member member;            // entity for join

    public void changeText(String newCommentText){
        this.commentText = newCommentText;
    }
}
