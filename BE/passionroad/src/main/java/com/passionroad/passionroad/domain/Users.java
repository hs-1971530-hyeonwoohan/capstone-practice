package com.passionroad.passionroad.domain;

import lombok.*;
import javax.persistence.*;

@Entity
@Getter
@Builder
@AllArgsConstructor // make constructor with all args
@NoArgsConstructor // make constructor without args
@ToString
public class Users extends BaseEntity{

    // think next time -> In Korean... VARCHAR(255) == @Column(length = 255 ...) is it correct?

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) // make pk (mysql, mariadb : auto increment)
    private Long user_id;   // Users table primary key

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

    @Column(length = 20, nullable = true)
    private String phone_num;

    @Column(length = 320, nullable = true) // 320 is maximum length of email
    private String email;   // email address

    @Column(length = 20, nullable = true)
    private String student_id;  // college student id

    public void changePw(String pw){
        this.pw = pw;
    }

}
