package com.notTakip.backend.service;

import com.notTakip.backend.entity.Grade;  // Burada entity kullan
import com.notTakip.backend.repository.GradeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class NoteService {

    @Autowired
    private GradeRepository gradeRepository;

    public Grade save(Grade note) {
        return gradeRepository.save(note);
    }

    public List<Grade> findGradesByStudentId(Long studentId) {
        return gradeRepository.findByStudentId(studentId);
    }
}
