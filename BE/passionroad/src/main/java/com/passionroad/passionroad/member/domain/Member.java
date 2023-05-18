package com.passionroad.passionroad.member.domain;

import com.passionroad.passionroad.freeboard.domain.freeboard.FreeBoard;
import com.passionroad.passionroad.freeboard.domain.freeboard.FreeBoardComment;
import com.passionroad.passionroad.BaseEntity;
import lombok.*;

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

    @Column(nullable = false)
    private Long accumulatedTime = 0L; // 분 단위의 누적 사용시간

//    @Column
//    private String username;
//
//    @Column
//    private String nickname;

//    @Column(length = 320, unique = true)x
//    private String email;

//    @Column
//    private String picture;

    @Enumerated(EnumType.STRING)
    @Column
    private Role role;

    @OneToMany(mappedBy = "member", fetch = FetchType.LAZY)
    private List<FreeBoard> freeBoardList;

    @OneToMany(mappedBy = "member", fetch = FetchType.LAZY)
    private List<FreeBoardComment> freeBoardCommentList;


    /*public Member(String nickname, String username, Role role) {
        this.mid = username;
        this.role = role;
    }*/

//    public Member update(String name, String picture) {
//        this.name = name;
//        this.picture = picture;
//
//        return this;
//    }

    public String getRoleKey() {
        return this.role.getKey();
    }
}
