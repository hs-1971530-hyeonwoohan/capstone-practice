package com.passionroad.passionroad.studyroom.entity;

import com.passionroad.passionroad.member.domain.Member;
import com.passionroad.passionroad.studyroom.Timestamped;
import com.passionroad.passionroad.studyroom.request.StudyRoomRequestDto;
import lombok.*;

import javax.persistence.*;
import java.io.Serializable;
import java.util.UUID;

@Entity
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class StudyRoom extends Timestamped {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "room_id")
    private String roomId;  // sessionId

    @Column
    private String title;

    @Column(name = "member_count")
    private int memberCount;

    @Column(name = "max_member")
    private int maxMember;

    @Column(nullable = false)
    private boolean studying;

    // 최대인원을 6명으로 고정 => maxUser 인자 삭제, 생성시 6으로 고정
    public static StudyRoom create(String title) {
        StudyRoom studyRoom = new StudyRoom();
        studyRoom.roomId = UUID.randomUUID().toString();
        studyRoom.title = title;
        studyRoom.memberCount = 0;
        studyRoom.maxMember = 6;
        studyRoom.studying = false;
        return studyRoom;
    }

    // 1. 스터디에서 헤어질 때 -1
    // exception: 0명이면 -1 반환
    public int minusMemberCount(){
        return (this.memberCount <= 0) ? (-1) : (this.memberCount - 1) ;
    }

    // 2. 새로운 스터디원이 들어올 때 +1
    // exception: maxMember와 멤버수가 같으면 -1 반환
    public int plusMemberCount(){
        return (this.memberCount >= this.maxMember) ? (-1) : (this.memberCount + 1);
    }

    // 공부 상황 바꾸기
    public boolean changeStudying(){
        this.studying = !this.studying;
        return this.studying;
    }
}
