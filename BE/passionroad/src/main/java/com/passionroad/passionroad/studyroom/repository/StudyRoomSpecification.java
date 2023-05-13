package com.passionroad.passionroad.studyroom.repository;

import com.passionroad.passionroad.studyroom.entity.StudyRoom;
import org.springframework.data.jpa.domain.Specification;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;

public class StudyRoomSpecification {

    public static Specification<StudyRoom> equalTag1(String tag1) {
        return new Specification<StudyRoom>() {
            @Override
            public Predicate toPredicate(Root<StudyRoom> root, CriteriaQuery<?> query, CriteriaBuilder criteriaBuilder) {
                return criteriaBuilder.equal(root.get("tag1"), tag1);
            }
        };
    }

    public static Specification<StudyRoom> equalTag2(String tag2) {
        return new Specification<StudyRoom>() {
            @Override
            public Predicate toPredicate(Root<StudyRoom> root, CriteriaQuery<?> query, CriteriaBuilder criteriaBuilder) {
                return criteriaBuilder.equal(root.get("tag2"), tag2);
            }
        };
    }

    public static Specification<StudyRoom> equalTag3(String tag3) {
        return new Specification<StudyRoom>() {
            @Override
            public Predicate toPredicate(Root<StudyRoom> root, CriteriaQuery<?> query, CriteriaBuilder criteriaBuilder) {
                return criteriaBuilder.equal(root.get("tag3"), tag3);
            }
        };
    }

    public static Specification<StudyRoom> equalTitle(String keyword) {
        return new Specification<StudyRoom>() {
            @Override
            public Predicate toPredicate(Root<StudyRoom> root, CriteriaQuery<?> query, CriteriaBuilder criteriaBuilder) {
                return criteriaBuilder.like(root.get("title"),"%" + keyword + "%");
            }
        };
    }

    public static Specification<StudyRoom> equalStudying(boolean recruit) {
        return new Specification<StudyRoom>() {
            @Override
            public Predicate toPredicate(Root<StudyRoom> root, CriteriaQuery<?> query, CriteriaBuilder criteriaBuilder) {
                return criteriaBuilder.equal(root.get("studying"),recruit);
            }
        };
    }
}
