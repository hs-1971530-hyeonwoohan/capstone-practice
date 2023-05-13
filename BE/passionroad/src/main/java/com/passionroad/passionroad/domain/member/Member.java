package com.passionroad.passionroad.domain.member;

import com.passionroad.passionroad.domain.BaseEntity;
import com.passionroad.passionroad.domain.freeboard.FreeBoard;
import com.passionroad.passionroad.domain.freeboard.FreeBoardComment;
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
public class Member extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
    private String mid;

    @Column
    private String mpw;

    @Column
    private String username;

    @Column
    private String nickname;

//    @Column(length = 320, unique = true)
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


    public Member(String nickname, String username, Role role) {
        this.nickname = nickname;
        this.username = username;
        this.role = role;
    }

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
