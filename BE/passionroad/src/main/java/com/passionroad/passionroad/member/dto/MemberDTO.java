package com.passionroad.passionroad.member.dto;


import com.passionroad.passionroad.member.domain.Role;
import lombok.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.User;

import java.util.Collection;

@Getter
@Setter
@ToString
//@Builder
//@NoArgsConstructor
//@AllArgsConstructor
//@Data
public class MemberDTO extends User {

    private Long id;
    private String mid;
    private String mpw;
//    private String name;
//    private String email;
//    private String picture;
    private Role role;

    // User constructor
    public MemberDTO(String username, String password, Collection<? extends GrantedAuthority> authorities) {
        super(username, password, authorities);
        this.mid = username;
        this.mpw = password;
    }

    /*// DTO -> ENTITY
    public Member toEntity(){
        return Member.builder()
                .id(this.id)
                .mid(this.mid)
                .mpw(this.mpw)
//                .name(this.name)
//                .email(this.email)
//                .picture(this.picture)
                .role(this.role)
                .build();
    }

    // ENTITY -> DTO
    public static MemberDTO fromEntity(Member member){
        return MemberDTO.builder()
                .id(member.getId())
                .mid(member.getMid())
                .mpw(member.getMpw())
//                .name(member.getName())
//                .email(member.getEmail())
//                .picture(member.getPicture())
                .role(member.getRole())
                .build();
    }
*/
}
