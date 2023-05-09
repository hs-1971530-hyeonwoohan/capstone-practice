package com.passionroad.passionroad.studyroom.entity;

import com.passionroad.passionroad.tag.entity.Tag;
import lombok.*;

import javax.persistence.*;
import java.util.Date;
import java.util.List;

@Entity
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class StudyRoom {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(nullable = false, updatable = false)
    private long roomId;

    @Column(nullable =false)
    private long hostId;

    @Column(nullable = true)
    private String roomName;

    @Column
    private Date startTime;

    @Column
    private Date endTime;

    @Column(nullable = false)
    private String code;

    public void updateEndTime(Date endTime) {
        this.endTime = endTime;
    }

    @Column(nullable = false, columnDefinition = "TINYINT", length=1)
    private int isPublic;

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "roomId")
    private List<Tag> tags;


}
