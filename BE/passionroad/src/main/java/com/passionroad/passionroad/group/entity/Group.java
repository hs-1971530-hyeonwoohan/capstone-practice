package com.passionroad.passionroad.group.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import java.io.Serializable;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Group implements Serializable {
    // 객체를 바이트 스트림으로 변환하여 저장하거나 네트워크를 통해 전송하기 위해 직렬화

    @Id
    @Column(nullable = false, updatable = false)
    private long roomId;

    @Id
    @Column(nullable = false, updatable = false)
    private long userId;

    @Column(nullable = true)
    private String nickname;

    @Column(nullable = false, updatable = false)
    private int ishost;
}
