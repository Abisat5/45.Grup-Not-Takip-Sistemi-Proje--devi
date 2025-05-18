package com.notTakip.backend.repository;

import com.notTakip.backend.entity.Student;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface StudentRepository extends JpaRepository<Student, Long> {

    // Öğretmen ID'ye göre öğrenci listesi
    List<Student> findByTeacherId(Long teacherId);

    // Öğrenci numarasına göre tek öğrenci
    Optional<Student> findByStudentNumber(String studentNumber);
}
