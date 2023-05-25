package com.passionroad.passionroad.member.domain;

import com.passionroad.passionroad.freeboard.domain.freeboard.FreeBoard;
import com.passionroad.passionroad.freeboard.domain.freeboard.FreeBoardComment;
import com.passionroad.passionroad.BaseEntity;
import lombok.*;
import org.hibernate.annotations.ColumnDefault;

import javax.persistence.*;
import java.util.List;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@ToString(exclude = {"freeBoardList", "freeBoardCommentList"})
@Entity
public class Member extends BaseEntity{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
    private String mid;

    @Column
    private String mpw;

    @Column(name = "total_passionroad", nullable = false)
    @ColumnDefault("0")
    private Long totalPassionroad; // 분 단위의 누적 사용시간

    @Enumerated(EnumType.STRING)
    @Column
    private Role role;

    @OneToMany(mappedBy = "member", fetch = FetchType.LAZY)
    private List<FreeBoard> freeBoardList;

    @OneToMany(mappedBy = "member", fetch = FetchType.LAZY)
    private List<FreeBoardComment> freeBoardCommentList;

    public String getRoleKey() {
        return this.role.getKey();
    }

    // 열정도 누적하고 총 열정도 반환
    public Long accumulatePassionroad(Long passionroad){
        this.totalPassionroad += passionroad;
        return this.totalPassionroad;
    }
}
