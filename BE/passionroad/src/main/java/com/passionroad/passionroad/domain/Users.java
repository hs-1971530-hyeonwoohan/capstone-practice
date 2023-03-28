package com.passionroad.passionroad.domain;

import lombok.*;
import javax.persistence.*;
import java.util.List;

@Entity
@Getter
@Builder
@AllArgsConstructor // make constructor with all args
@NoArgsConstructor // make constructor without args
@ToString(exclude = "freeBoardList") // exclude property : prevent circular reference
public class Users extends BaseEntity{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) // make pk (mysql, mariadb : auto increment)
    @Column(name = "user_id")
    private Long userId;   // Users table primary key

    @Column(length = 255, nullable = false) // NOT NULL
    private String id;  // user id for login

    @Column(length = 255, nullable = false) // NOT NULL
    private String pw;  // user pw for login

    @Column(length = 255, nullable = false) // NOT NULL
    private String nickname;    // user nickname

    @Column(length = 255, nullable = true)
    private String name;    // real name

    @Column(length = 10, nullable = true)
    private String gender;

    @Column(name = "phone_num", length = 20, nullable = true)
    private String phoneNum;

    @Column(length = 320, unique = true) // 320 is maximum length of email
    private String email;   // email address

    @Column(name = "student_id", length = 20, nullable = true)
    private String studentId;  // college student id

    // one User can join with many freeboard entities
    @OneToMany(mappedBy = "users", fetch = FetchType.LAZY)
    private List<FreeBoard> freeBoardList;

    public void changePw(String pw){
        this.pw = pw;
    }

}
