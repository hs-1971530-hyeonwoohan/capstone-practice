package com.passionroad.passionroad.studyroom.entity;

import com.passionroad.passionroad.BaseEntity;
import com.passionroad.passionroad.member.domain.Member;
import lombok.*;
import org.hibernate.annotations.ColumnDefault;

import javax.persistence.*;
import java.time.LocalDate;

@Entity
@Builder
@Getter
@AllArgsConstructor
@NoArgsConstructor
@ToString(exclude = "member")
public class TodayPassionroad extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column
    private Long id;

    @Column(name = "study_time", nullable = false)
    @ColumnDefault("0")
    private Long studyTime;

    @Column
    private LocalDate date;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn
    private Member member;

    public Long accumulateStudyTime(Long studyTime){
        this.studyTime += studyTime;
        return this.studyTime;
    }

}
