package com.passionroad.passionroad.domain.user;

import com.passionroad.passionroad.domain.BaseEntity;
import com.passionroad.passionroad.domain.freeboard.FreeBoard;
import com.passionroad.passionroad.domain.freeboard.FreeBoardComment;
import lombok.*;

import javax.persistence.*;
import java.util.List;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@ToString(exclude = "freeBoardList")
@Entity
public class User extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
    private String name;

    @Column(length = 320, unique = true)
    private String email;

    @Column
    private String picture;

    @Enumerated(EnumType.STRING)
    @Column
    private Role role;

    @OneToMany(mappedBy = "user", fetch = FetchType.LAZY)
    private List<FreeBoard> freeBoardList;

    @OneToMany(mappedBy = "user", fetch = FetchType.LAZY)
    private List<FreeBoardComment> freeBoardCommentList;

    @Builder
    public User(String name, String email, String picture, Role role) {
        this.name = name;
        this.email = email;
        this.picture = picture;
        this.role = role;
    }

    public User update(String name, String picture) {
        this.name = name;
        this.picture = picture;

        return this;
    }

    public String getRoleKey() {
        return this.role.getKey();
    }
}
