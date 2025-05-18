package com.notTakip.backend.controller;

import com.notTakip.backend.dto.StudentRequest;
import com.notTakip.backend.entity.Student;
import com.notTakip.backend.repository.StudentRepository;
import com.notTakip.backend.service.StudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000")
public class StudentController {

    private final StudentRepository studentRepository;
    private final StudentService studentService;

    @Autowired
    public StudentController(StudentRepository studentRepository, StudentService studentService) {
        this.studentRepository = studentRepository;
        this.studentService = studentService;
    }

    // Tüm öğrencileri getir
    @GetMapping("/students")
    public ResponseEntity<List<Student>> getAllStudents() {
        return ResponseEntity.ok(studentRepository.findAll());
    }

    // Yeni öğrenci oluştur
    @PostMapping("/students")
    public ResponseEntity<Student> createStudent(@RequestBody StudentRequest studentRequest) {
        Student savedStudent = studentService.createStudent(studentRequest);
        return ResponseEntity.ok(savedStudent);
    }
}
