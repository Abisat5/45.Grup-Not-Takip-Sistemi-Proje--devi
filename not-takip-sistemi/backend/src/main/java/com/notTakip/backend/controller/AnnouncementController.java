package com.notTakip.backend.controller;

import com.notTakip.backend.entity.Announcement;
import com.notTakip.backend.entity.Student;
import com.notTakip.backend.repository.StudentRepository;
import com.notTakip.backend.service.AnnouncementService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000")
public class AnnouncementController {

    private final AnnouncementService announcementService;
    private final StudentRepository studentRepository;

    @Autowired
    public AnnouncementController(AnnouncementService announcementService, StudentRepository studentRepository) {
        this.announcementService = announcementService;
        this.studentRepository = studentRepository;
    }

    // Öğrencinin öğretmenine ait duyuruları getir
    @GetMapping("/announcements/{studentId}")
    public ResponseEntity<List<Announcement>> getAnnouncementsByStudentId(@PathVariable Long studentId) {
        Student student = studentRepository.findById(studentId).orElse(null);
        if (student == null) {
            return ResponseEntity.notFound().build();
        }
        List<Announcement> announcements = announcementService.getAnnouncementsByTeacherId(student.getTeacherId());
        return ResponseEntity.ok(announcements);
    }

    // Yeni duyuru oluştur
    @PostMapping("/announcements")
    public ResponseEntity<Announcement> createAnnouncement(@RequestBody Announcement announcement) {
        if (announcement.getTeacherId() == null) {
            return ResponseEntity.badRequest().body(null);
        }
        Announcement savedAnnouncement = announcementService.saveAnnouncement(announcement);
        return ResponseEntity.ok(savedAnnouncement);
    }
}
