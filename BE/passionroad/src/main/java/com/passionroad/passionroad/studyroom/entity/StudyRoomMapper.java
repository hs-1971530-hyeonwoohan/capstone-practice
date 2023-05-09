package com.passionroad.passionroad.studyroom.entity;

import com.passionroad.passionroad.studyroom.dto.StudyRoomDto;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

import java.util.List;

@Mapper
public interface StudyRoomMapper {
    StudyRoomMapper INSTANCE = Mappers.getMapper(StudyRoomMapper.class);

    StudyRoomDto.RoomResponse toResponse(StudyRoom studyRoom);
    List<StudyRoomDto.RoomInfo> toInfo(List<StudyRoom> rooms);
    StudyRoomDto.RoomInfo toInfoOne(StudyRoom studyRoom);
}
