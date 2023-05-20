package com.passionroad.passionroad.studyroom.entity;

import com.passionroad.passionroad.member.domain.Member;
import com.passionroad.passionroad.studyroom.Timestamped;
import com.passionroad.passionroad.studyroom.request.StudyRoomRequestDto;
import lombok.*;

import javax.persistence.*;
import java.io.Serializable;
import java.util.UUID;

@Getter
@Setter
@Entity
@NoArgsConstructor
@AllArgsConstructor
public class StudyRoom extends Timestamped implements Serializable {

    private static final long serialVersionUID = 6529685098267757690L;  // 이건 필수

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "room_id")
    private String roomId;

    @Column
    private String title;

    @Column(name = "member_count")
    private Long memberCount;

    @ManyToOne
    @JoinColumn
    private Member member;

    @Column(name = "max_member")
    private int maxMember;

    @Column(nullable = false)
    private String tag1;

    @Column(nullable = false)
    private String tag2;

    @Column(nullable = false)
    private String tag3;

    @Column(nullable = false)
    private boolean studying;

    public static StudyRoom create(StudyRoomRequestDto studyRoomDto, Member member, int maxUser) {
        StudyRoom studyRoom = new StudyRoom();
        studyRoom.roomId = UUID.randomUUID().toString();
        studyRoom.title = studyRoomDto.getTitle();
        studyRoom.member = member;
        studyRoom.memberCount = 0L;
        studyRoom.maxMember = maxUser;
        studyRoom.tag1 = studyRoomDto.getTag1();
        studyRoom.tag2 = studyRoomDto.getTag2();
        studyRoom.tag3 = studyRoomDto.getTag3();
        studyRoom.studying = false;
        return studyRoom;
    }
}
