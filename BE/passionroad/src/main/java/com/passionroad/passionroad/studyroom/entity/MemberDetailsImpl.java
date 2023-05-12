package com.passionroad.passionroad.studyroom.entity;

import com.passionroad.passionroad.domain.member.Member;
import org.springframework.security.core.userdetails.UserDetails;

public class MemberDetailsImpl implements UserDetails {

    private final Member member;

    public MemberDetailsImpl(Member member) {
        this.member = member;
    }

    public Member getMember() {
        return member;
    }

    @Override
    public String getUsername() {
        return member.getUsername();
    }

}
