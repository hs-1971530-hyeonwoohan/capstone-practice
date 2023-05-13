package com.passionroad.passionroad.studyroom.response;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class EnterMemberResponseDto {

    private String nickname;

    public EnterMemberResponseDto(String nickname) {
        this.nickname = nickname;
    }

}
