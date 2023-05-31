package com.passionroad.passionroad.studyroom.dto;

import com.passionroad.passionroad.studyroom.entity.StudyRoom;
import lombok.*;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class StudyRoomDTO {

    private Long id;
    private String roomId;
    private String title;
    private int memberCount;
    private int maxMember;
//    private boolean studying;


    // Entity -> DTO
    public static StudyRoomDTO fromEntity (StudyRoom studyRoom){
        return StudyRoomDTO.builder()
                .id(studyRoom.getId())
                .roomId(studyRoom.getRoomId())
                .title(studyRoom.getTitle())
                .memberCount(studyRoom.getMemberCount())
                .maxMember(studyRoom.getMaxMember())
//                .studying(studyRoom.getStudying)
                .build();
    }

}

