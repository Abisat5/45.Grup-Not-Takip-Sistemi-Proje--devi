package com.notTakip.backend.repository;

import com.notTakip.backend.entity.Grade;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface GradeRepository extends JpaRepository<Grade, Long> {
    List<Grade> findByStudentId(Long studentId);
    List<Grade> findByTeacherId(Long teacherId);
}
