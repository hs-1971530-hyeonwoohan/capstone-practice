package com.passionroad.passionroad.studyroom.entity;

import com.passionroad.passionroad.member.domain.Member;
import com.passionroad.passionroad.studyroom.Timestamped;
import lombok.Getter;
import lombok.Setter;
import org.springframework.security.core.userdetails.UserDetails;

import javax.persistence.*;

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

    @ManyToOne
    @JoinColumn(name = "room_id")
    private StudyRoom studyRoom;

    public EnterMember(Member member, StudyRoom studyRoom) {
        this.member = member;
        this.studyRoom = studyRoom;
    }

    public EnterMember() {

    }
}
