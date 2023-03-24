package com.passionroad.passionroad.domain;

import lombok.*;

import javax.persistence.*;

@Entity
@Builder
@Getter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class FreeBoard extends BaseEntity{
    // free_board entity

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long post_id;

    @Column
    private String title;

    @Column(columnDefinition = "TEXT")
    private String content;

    // many freeboard entities can join with one user
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "author_id") // make fk named 'author_id'
    private Users users;            // entity for join

}
