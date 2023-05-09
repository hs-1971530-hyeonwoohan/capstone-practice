package com.passionroad.passionroad.studyroom.service;

import com.passionroad.passionroad.exception.RoomNotFoundException;
import com.passionroad.passionroad.member.entity.Member;
import com.passionroad.passionroad.member.repository.MemberRepository;
import com.passionroad.passionroad.studyroom.Util;
import com.passionroad.passionroad.studyroom.dto.StudyRoomDto;
import com.passionroad.passionroad.studyroom.entity.StudyRoom;
import com.passionroad.passionroad.studyroom.entity.StudyRoomMapper;
import com.passionroad.passionroad.studyroom.repository.StudyRoomRepository;
import com.passionroad.passionroad.tag.entity.Tag;
import com.passionroad.passionroad.tag.repository.TagRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.HashSet;
import java.util.List;

@Service
@RequiredArgsConstructor
public class StudyRoomService {

    private final StudyRoomRepository studyRoomRepository;
    private final MemberRepository memberRepository;
    private final TagRepository tagRepository;

    public StudyRoomDto.RoomResponse addBycode(String code, StudyRoomDto.InsertHostInfo insertHostInfo) {
        StudyRoom studyRoom = StudyRoom.builder()
                .hostId(insertHostInfo.getHostId())
                .code(code)
                .startTime(new Date())
                .isPublic(insertHostInfo.getIsPublic())
                .roomName(insertHostInfo.getRoomName())
                .build();
        return StudyRoomMapper.INSTANCE.toResponse(
                studyRoomRepository.save(studyRoom)
        );
    }

    public StudyRoom finishRoom(long roomId) {
        StudyRoom room= studyRoomRepository.findOneByRoomId(roomId);
        System.out.println(room);
        room.updateEndTime(new Date());
        System.out.println(room);
        return studyRoomRepository.save(room);
    }

    public String getCode() {
        String code;
        // 무한루프는 그대로지만 HashSet 활용해서 DB 접근 최소화!
        HashSet<String> set = new HashSet<>(studyRoomRepository.findAllCode());
        while (true) {
            code = Util.getRandomCode();
            if(!set.contains(code)) break;
        }

        return code;
    }


    public long getRoomValid(String code) {
        StudyRoom studyRoom = studyRoomRepository.findOneByCode(code);
        if(studyRoom != null)
            return studyRoom.getRoomId();
        else
            return 0;
    }

    public long addMember(String code, long userId, String nickName, int ishost) {

        StudyRoom studyRoom = studyRoomRepository.findOneByCode(code);
        // Room Not Found or Room is closed
        if(studyRoom == null || studyRoom.getEndTime() != null)
            throw new RoomNotFoundException(code);
        Member member = new Member(studyRoom.getRoomId(), userId, nickName, ishost);
        return memberRepository.save(member).getRoomId();
    }

    public StudyRoomDto.RoomInfo updateRoom(StudyRoomDto.UpdateRoomInfo updateRoomInfo) {
        StudyRoom studyRoom= studyRoomRepository.findOneByRoomId(updateRoomInfo.getRoomId());
        StudyRoom newRoom = StudyRoom.builder()
                .hostId(studyRoom.getHostId())
                .startTime(studyRoom.getStartTime())
                .code(studyRoom.getCode())
                .roomId(studyRoom.getRoomId())
                .roomName(updateRoomInfo.getRoomName())
                .isPublic(updateRoomInfo.getIsPublic())
                .build();
        return StudyRoomMapper.INSTANCE.toInfoOne(studyRoomRepository.save(newRoom));
    }

    //태그 추가
    public void addTags(List<String> tags, long roomId) {
        //기존 태그 삭제
        tagRepository.deleteAllByRoomId(roomId);
        if(tags != null) {
            //saveAll 사용하면 한번에 넣을 수 있기는 함
            for(String tagname : tags) {
                Tag tag = Tag.builder()
                        .roomId(roomId)
                        .tagName(tagname)
                        .build();
                tagRepository.save(tag);
            }
        }
    }

    public List<StudyRoomDto.RoomInfo> get(long userId) {
        return StudyRoomMapper.INSTANCE.toInfo(studyRoomRepository.getRoomsInfo(userId));
    }

    public long getRoomValid(String code) {
        StudyRoom studyRoom = studyRoomRepository.findOneByCode(code);
        if(studyRoom != null)
            return studyRoom.getRoomId();
        else
            return 0;
    }

    public StudyRoomDto.RoomInfo updateRoom(StudyRoomDto.UpdateRoomInfo updateRoomInfo) {
        StudyRoom studyRoom= studyRoomRepository.findOneByRoomId(updateRoomInfo.getRoomId());
        StudyRoom newRoom = StudyRoom.builder()
                .hostId(studyRoom.getHostId())
                .startTime(studyRoom.getStartTime())
                .code(studyRoom.getCode())
                .roomId(studyRoom.getRoomId())
                .roomName(updateRoomInfo.getRoomName())
                .isPublic(updateRoomInfo.getIsPublic())
                .build();
        return StudyRoomMapper.INSTANCE.toInfoOne(studyRoomRepository.save(newRoom));
    }
}
