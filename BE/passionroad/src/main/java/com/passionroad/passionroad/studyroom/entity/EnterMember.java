package com.passionroad.passionroad.studyroom.entity;

import com.passionroad.passionroad.member.domain.Member;
import com.passionroad.passionroad.studyroom.Timestamped;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Getter
@Setter
public class EnterMember extends Timestamped {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn
    private Member member;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "room_id")
    private StudyRoom studyRoom;

    @Column(nullable = false)
    private LocalDateTime enteredAt; // 스터디룸에 들어간 시간

    private LocalDateTime leftAt; // 스터디룸에서 나간 시간을 저장할 필드

    public EnterMember(Member member, StudyRoom studyRoom) {
        this.member = member;
        this.studyRoom = studyRoom;
    }

    public EnterMember() {

    }

    // 스터디룸에서 나간 시간을 업데이트하는 메소드
    public void leaveStudyRoom() {
        this.leftAt = LocalDateTime.now();
    }
}
