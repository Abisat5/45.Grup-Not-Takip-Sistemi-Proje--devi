package com.notTakip.backend.controller;

import com.notTakip.backend.entity.Grade;
import com.notTakip.backend.entity.Student;
import com.notTakip.backend.repository.StudentRepository;
import com.notTakip.backend.service.NoteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/notes")
@CrossOrigin(origins = "http://localhost:3000")
public class NoteController {

    @Autowired
    private NoteService noteService;

    @Autowired
    private StudentRepository studentRepository;

    @PostMapping
    public Grade saveNote(@RequestBody Grade note) {
        Student student = studentRepository.findById(note.getStudent().getId())
                .orElseThrow(() -> new RuntimeException("Student not found"));
        note.setStudent(student);
        return noteService.save(note);
    }

    // Öğrencinin sınav notlarını getir
    @GetMapping("/student/{studentId}")
    public ResponseEntity<List<Grade>> getGradesByStudent(@PathVariable Long studentId) {
        // ✅ Öğrenci yoksa 404 hatası döndür
        if (!studentRepository.existsById(studentId)) {
            return ResponseEntity.notFound().build();
        }

        List<Grade> grades = noteService.findGradesByStudentId(studentId);
        return ResponseEntity.ok(grades);
    }
}
