package com.passionroad.passionroad.security;

import com.passionroad.passionroad.domain.member.Member;
import com.passionroad.passionroad.dto.MemberDTO;
import com.passionroad.passionroad.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@Log4j2
@RequiredArgsConstructor
public class APIUserDetailsService implements UserDetailsService {

    // 주입
    private final MemberRepository memberRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException{
        
        // 해당 사용자가 존재할 때 APIUserDTO 를 반환
        Optional<Member> result = memberRepository.findByMid(username);
        Member member = result.orElseThrow(() -> new UsernameNotFoundException("Cannot find mid"));

        log.info("APIUserDetailsService apiUser --------------------------");

        MemberDTO dto = new MemberDTO(    // entity -> dto
                member.getMid(),           // id
                member.getMpw(),           // pw
                List.of(new SimpleGrantedAuthority("ROLE_USER")));  // authority

        log.info(dto);

        return dto;
    }
}
