package com.passionroad.passionroad.studyroom.request;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class StudyRoomRequestDto {
    String title;
    String roomId;
    Long userCount;
    int maxUser;
//    String tag1;
//    String tag2;
//    String tag3;
    Boolean studying;
}
