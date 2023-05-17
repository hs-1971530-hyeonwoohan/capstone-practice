package com.passionroad.passionroad.studyroom.response;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class EnterMemberResponseDto {

    private String mid;
    private String token;

    public EnterMemberResponseDto(String mid, String token) {
        this.mid = mid;
        this.token = token;
    }

}
