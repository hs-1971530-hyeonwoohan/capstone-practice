package com.passionroad.passionroad.repository;

import com.passionroad.passionroad.domain.freeboard.FreeBoardComment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface FreeBoardCommentRepository extends JpaRepository<FreeBoardComment, Long>{
    // find comments by post_id (fk)
    Optional<List<FreeBoardComment>> findAllByFreeBoard_PostId(Long postId);
    // find comments by (user)id (fk)
    Optional<List<FreeBoardComment>> findAllByUser_Id(Long authorId);
}
