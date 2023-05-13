package com.passionroad.passionroad.studyroom.entity;

import com.passionroad.passionroad.domain.member.Member;

import javax.persistence.*;

public class BanMember {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn
    private Member member;

    @ManyToOne
    @JoinColumn(name = "room_id")
    private StudyRoom studyRoom;

    public BanMember(Member member, StudyRoom studyRoom) {
        this.member = member;
        this.studyRoom = studyRoom;
    }

    public BanMember() {

    }
}
