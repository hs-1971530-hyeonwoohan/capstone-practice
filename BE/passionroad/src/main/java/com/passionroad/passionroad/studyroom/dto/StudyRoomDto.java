package com.passionroad.passionroad.studyroom.dto;

import com.passionroad.passionroad.tag.entity.Tag;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import io.swagger.annotations.ApiModelProperty;

import java.util.Date;
import java.util.List;

public class StudyRoomDto {

    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    public static class RoomInfo {
        @ApiModelProperty(value = "Room id")
        private long roomId;

        @ApiModelProperty(value = "Host id", example = "1404739104")
        private long hostId;

        @ApiModelProperty(value = "Start time", example = "")
        private Date startTime;

        @ApiModelProperty(value = "End time", example = "")
        private Date endTime;

        @ApiModelProperty(value = "Room code", example = "A1B2C3D4E5")
        private String code;

        @ApiModelProperty(value = "Room Name", example = "자바 스터디")
        private String roomName;

        @ApiModelProperty(value = "Tag Info", example = "태그 이름들")
        private List<Tag> tags;

        @ApiModelProperty(value = "Open info", example = "공개 여부")
        private int isPublic;
    }

    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    public static class InsertHostInfo {
        @ApiModelProperty(value = "Host id", example = "1404739104")
        private long hostId;

        @ApiModelProperty(value = "Host nickname", example = "지은")
        private String hostNickName;

        @ApiModelProperty(value = "Room Name", example = "오늘은 내가 술게임최강자")
        private String roomName;

        @ApiModelProperty(value = "public of private", example = "1(public) 0(private)")
        private int isPublic;

        @ApiModelProperty(value = "Room Tags", example = "")
        private List<String> tags;

    }

    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    public static class RoomResponse {
        @ApiModelProperty(value = "Room id", example = "1")
        private long roomId;

        @ApiModelProperty(value = "Room code", example = "A1B2C3D4E5")
        private String code;
    }

    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    public static class UpdateMemberInfo {
        @ApiModelProperty(value = "User Nickname")
        private String nickName;
    }

    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    public static class UpdateRoomInfo {
        @ApiModelProperty(value = "Room id", example = "1")
        private long roomId;

        @ApiModelProperty(value = "Room Name", example = "오늘은 내가 술게임최강자")
        private String roomName;

        @ApiModelProperty(value = "Room Tags", example = "")
        private List<String> tags;

        @ApiModelProperty(value = "Room Public 여부", example = "1(public), 0(private)")
        private int isPublic;
    }
}
