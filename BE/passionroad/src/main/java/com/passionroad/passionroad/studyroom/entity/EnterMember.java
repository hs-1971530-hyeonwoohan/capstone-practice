package com.passionroad.passionroad.studyroom.entity;

import com.passionroad.passionroad.member.domain.Member;
import com.passionroad.passionroad.studyroom.Timestamped;
import lombok.*;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class EnterMember extends Timestamped {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn
    private Member member;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "room_id")
    private StudyRoom studyRoom;

    @Column(nullable = false)
    private Long lastEnteredAt; // 스터디룸에 들어간 시간

    @Column
    private Long lastLeftAt; // 스터디룸에서 나간 시간을 저장할 필드

    public EnterMember(Member member, StudyRoom studyRoom) {
        this.member = member;
        this.studyRoom = studyRoom;
    }

    // 스터디룸에서 나간 시간을 업데이트하는 메소드
    public Long setLastLeftAt() {
        this.lastLeftAt = System.currentTimeMillis();
        return this.lastLeftAt;
    }

    public Long setLastEnterAt(){
        this.lastEnteredAt = System.currentTimeMillis();
        return this.lastEnteredAt;
    }
}
