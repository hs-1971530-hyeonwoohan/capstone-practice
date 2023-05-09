package com.passionroad.passionroad.studyroom.service;

import com.passionroad.passionroad.exception.RoomNotFoundException;
import com.passionroad.passionroad.group.entity.Group;
import com.passionroad.passionroad.group.repository.GroupRepository;
import com.passionroad.passionroad.studyroom.Util;
import com.passionroad.passionroad.studyroom.dto.StudyRoomDto;
import com.passionroad.passionroad.studyroom.entity.StudyRoom;
import com.passionroad.passionroad.studyroom.entity.StudyRoomMapper;
import com.passionroad.passionroad.studyroom.repository.StudyRoomRepository;
import com.passionroad.passionroad.tag.entity.Tag;
import com.passionroad.passionroad.tag.repository.TagRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Date;
import java.util.HashSet;
import java.util.List;

@Service
@RequiredArgsConstructor
public class StudyRoomService {

    private final StudyRoomRepository studyRoomRepository; // 스터디룸
    private final GroupRepository groupRepository; // 스터디룸 구성원
    private final TagRepository tagRepository; // 태그들

    public StudyRoomDto.RoomResponse addBycode(String code, StudyRoomDto.InsertHostInfo insertHostInfo) {
        StudyRoom studyRoom = StudyRoom.builder()
                .hostId(insertHostInfo.getHostId())
                .code(code)
                .startTime(new Date())
                .isPublic(insertHostInfo.getIsPublic())
                .roomName(insertHostInfo.getRoomName())
                .build();
        return StudyRoomMapper.INSTANCE.toResponse(studyRoomRepository.save(studyRoom)
        );
    }

    public StudyRoom finishRoom(long roomId) { // 방 종료
        StudyRoom room= studyRoomRepository.findOneByRoomId(roomId);
        System.out.println(room);
        room.updateEndTime(new Date()); // endTime을 업데이트
        System.out.println(room);
        return studyRoomRepository.save(room); // 변경된 endTime을 저장
    }

    public String getCode() {
        String code;
        // 무한루프는 그대로지만 HashSet 활용해서 DB 접근 최소화
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

    public long addGroup(String code, long userId, String nickName, int ishost) {

        StudyRoom studyRoom = studyRoomRepository.findOneByCode(code);
        // 방이 없거나 종료된 경우
        if(studyRoom == null || studyRoom.getEndTime() != null)
            throw new RoomNotFoundException(code);
        Group group = new Group(studyRoom.getRoomId(), userId, nickName, ishost);
        return groupRepository.save(group).getRoomId();
    }

    public StudyRoomDto.StudyRoomInfo updateRoom(StudyRoomDto.UpdateStudyRoomInfo updateRoomInfo) {
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

    public List<StudyRoomDto.StudyRoomInfo> get(long userId) {
        return StudyRoomMapper.INSTANCE.toInfo(studyRoomRepository.getRoomsInfo(userId));
    }

    public List<StudyRoomDto.StudyRoomInfoPlus> getPublicRooms(int pagenum){
        List<StudyRoomDto.StudyRoomInfoPlus> roomlist = new ArrayList<>();
        List<StudyRoomDto.StudyRoomInfo> roominfolist = StudyRoomMapper.INSTANCE.toInfo(studyRoomRepository.getPublicRoomsInfo((pagenum-1)*12,pagenum*12));
        for(int i=0; i<roominfolist.size(); i++) {
            StudyRoomDto.StudyRoomInfoPlus roominfoplus = new StudyRoomDto.StudyRoomInfoPlus();
            roominfoplus.setStudyRoominfo(roominfolist.get(i));
            roominfoplus.setHost(groupRepository.findHostnameByroomId(roominfoplus.getStudyRoominfo().getRoomId()));
            roominfoplus.setUsers(groupRepository.findNicknameByroomId(roominfoplus.getStudyRoominfo().getRoomId()));
            roomlist.add(roominfoplus);
        }
        return roomlist;
    }

    public List<StudyRoomDto.StudyRoomInfoPlus> getPublicRoomsByNameOrTag(String keyword, int pagenum) {
        List<StudyRoomDto.StudyRoomInfoPlus> roomlist = new ArrayList<>();
        List<StudyRoomDto.StudyRoomInfo> roominfolist = StudyRoomMapper.INSTANCE.toInfo(studyRoomRepository.getPublicRoomsByRoomNameOrTag(keyword, (pagenum-1)*12,pagenum*12));
        for(int i=0; i<roominfolist.size(); i++) {
            StudyRoomDto.StudyRoomInfoPlus studyRoominfoplus = new StudyRoomDto.StudyRoomInfoPlus();
            studyRoominfoplus.setStudyRoominfo(roominfolist.get(i));
            studyRoominfoplus.setHost(groupRepository.findHostnameByroomId(studyRoominfoplus.getStudyRoominfo().getRoomId()));
            studyRoominfoplus.setUsers(groupRepository.findNicknameByroomId(studyRoominfoplus.getStudyRoominfo().getRoomId()));
            roomlist.add(studyRoominfoplus);
        }
        return roomlist;
    }

    public long getPublicRoomsCount() {
        return studyRoomRepository.getPublicRoomsCount();
    }

    public long getPublicRoomsSearchCount(String keyword) {
        return studyRoomRepository.getPublicRoomsSearchCount(keyword);
    }

    public StudyRoomDto.StudyRoomInfo getRoomByRoomId(long roomId){
        return StudyRoomMapper.INSTANCE.toInfoOne(studyRoomRepository.findOneByRoomId(roomId));
    }

    public List<String> getAllTags(){
        return tagRepository.findAllTags();
    }
}
