package com.notTakip.backend.controller;

import com.notTakip.backend.dto.LoginRequest;
import com.notTakip.backend.entity.Student;
import com.notTakip.backend.entity.Teacher;
import com.notTakip.backend.repository.StudentRepository;
import com.notTakip.backend.repository.TeacherRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:3000")
public class AuthController {

    @Autowired
    private TeacherRepository teacherRepository;

    @Autowired
    private StudentRepository studentRepository;

    // Öğretmen kayıt
    @PostMapping("/teacher/register")
    public ResponseEntity<?> registerTeacher(@RequestBody Teacher teacher) {
        if (teacherRepository.findByUsername(teacher.getUsername()).isPresent()) {
            return ResponseEntity.badRequest().body("Kullanıcı adı zaten mevcut.");
        }
        teacherRepository.save(teacher);
        return ResponseEntity.ok("Kayıt başarılı.");
    }

    // Öğretmen giriş
    @PostMapping("/teacher/login")
    public ResponseEntity<?> loginTeacher(@RequestBody Teacher teacher) {
        String username = teacher.getUsername() != null ? teacher.getUsername().trim() : "";
        String password = teacher.getPassword() != null ? teacher.getPassword().trim() : "";

        Optional<Teacher> dbTeacher = teacherRepository.findByUsername(username);
        if (dbTeacher.isPresent() && dbTeacher.get().getPassword().equals(password)) {
            return ResponseEntity.ok(dbTeacher.get());
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Geçersiz kullanıcı adı veya şifre.");
    }

    // Öğrenci giriş
    @PostMapping("/student/login")
    public ResponseEntity<?> loginStudent(@RequestBody LoginRequest loginRequest) {
        String studentNumber = loginRequest.getStudentNumber() != null ? loginRequest.getStudentNumber().trim() : "";
        String password = loginRequest.getPassword() != null ? loginRequest.getPassword().trim() : "";

        Optional<Student> studentOpt = studentRepository.findByStudentNumber(studentNumber);
        if (studentOpt.isEmpty()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Öğrenci bulunamadı.");
        }

        Student student = studentOpt.get();

        if (!student.getPassword().equals(password)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Şifre yanlış.");
        }

        return ResponseEntity.ok(student);
    }

    // Öğrenci ekleme (Öğretmen tarafından)
    @PostMapping("/student/add")
    public ResponseEntity<?> addStudent(@RequestBody Student student) {
        // İstersen burada öğrenci numarası veya başka unique kontrolleri yapabilirsin
        studentRepository.save(student);
        return ResponseEntity.ok("Öğrenci başarıyla eklendi.");
    }

    // Öğretmeni kullanıcı adına göre getir
    @GetMapping("/teacher/me")
    public ResponseEntity<?> getCurrentTeacher(@RequestParam String username) {
        if (username == null || username.trim().isEmpty()) {
            return ResponseEntity.badRequest().body("Kullanıcı adı boş olamaz.");
        }

        Optional<Teacher> teacherOpt = teacherRepository.findByUsername(username.trim());
        if (teacherOpt.isPresent()) {
            return ResponseEntity.ok(teacherOpt.get());
        }

        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Öğretmen bulunamadı.");
    }
}
