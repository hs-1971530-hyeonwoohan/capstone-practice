package com.passionroad.passionroad.tag.entity;

import lombok.*;

import javax.persistence.*;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
public class Tag {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(nullable = false, updatable = false)
    private long tagId;

    @Column(nullable = false)
    private long roomId;

    @Column(nullable = false)
    private String tagName;
}