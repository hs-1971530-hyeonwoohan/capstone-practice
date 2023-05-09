package com.passionroad.passionroad.group.entity;

import lombok.Getter;

import javax.persistence.Embeddable;
import java.io.Serializable;

@Getter
@Embeddable // roomId, userId를 하나의 객체로 묶어줌
public class GroupId implements Serializable {

    private long roomId;
    private long userId;

    public GroupId() {

    }

    public GroupId(long roomId, long userId) {
        this.roomId = roomId;
        this.userId = userId;
    }
}
