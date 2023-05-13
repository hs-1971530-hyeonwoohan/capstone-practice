package com.passionroad.passionroad.studyroom.response;

import com.passionroad.passionroad.domain.member.Member;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class StudyRoomResponseDto {

    private String title;
    private String roomId;
    private Long userCount;
    private int maxUser;
    private String tag1;
    private String tag2;
    private String tag3;
    private LocalDateTime createAt;
    private Member member;


    public StudyRoomResponseDto(String title, String roomId, Long userCount, int maxUser, String tag1, String tag2, String tag3, LocalDateTime createAt, Member member) {
        this.title = title;
        this.roomId = roomId;
        this.userCount = userCount < 0 ? 0 : userCount;
        this.maxUser = maxUser;
        this.tag1 = tag1;
        this.tag2 = tag2;
        this.tag3 = tag3;
        this.createAt = createAt;
        this.member = member;
    }
}
