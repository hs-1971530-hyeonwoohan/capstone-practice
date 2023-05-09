package com.passionroad.passionroad.member.entity;

import lombok.Getter;

import javax.persistence.Embeddable;
import java.io.Serializable;

@Getter
@Embeddable // roomId, userId를 하나의 객체로 묶어줌
public class MemberId implements Serializable {

    private long roomId;
    private long userId;

    public MemberId() {

    }

    public MemberId(long roomId, long userId) {
        this.roomId = roomId;
        this.userId = userId;
    }
}
