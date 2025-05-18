package com.notTakip.backend.service;

import com.notTakip.backend.entity.Announcement;
import com.notTakip.backend.entity.Message;
import com.notTakip.backend.entity.Student;
import com.notTakip.backend.entity.Teacher;
import com.notTakip.backend.repository.AnnouncementRepository;
import com.notTakip.backend.repository.MessageRepository;
import com.notTakip.backend.repository.StudentRepository;
import com.notTakip.backend.repository.TeacherRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AnnouncementService {

    private final AnnouncementRepository announcementRepository;
    private final MessageRepository messageRepository;
    private final TeacherRepository teacherRepository;
    private final StudentRepository studentRepository;

    @Autowired
    public AnnouncementService(AnnouncementRepository announcementRepository,
                               MessageRepository messageRepository,
                               TeacherRepository teacherRepository,
                               StudentRepository studentRepository) {
        this.announcementRepository = announcementRepository;
        this.messageRepository = messageRepository;
        this.teacherRepository = teacherRepository;
        this.studentRepository = studentRepository;
    }

    public List<Announcement> getAnnouncementsByTeacherId(Long teacherId) {
        return announcementRepository.findByTeacherId(teacherId);
    }

    public Announcement saveAnnouncement(Announcement announcement) {
        // Duyuruyu kaydet
        Announcement savedAnnouncement = announcementRepository.save(announcement);

        // Öğretmeni getir
        Teacher teacher = teacherRepository.findById(announcement.getTeacherId()).orElse(null);

        if (teacher != null) {
            // Tüm öğrencileri çek
            List<Student> allStudents = studentRepository.findAll();

            // Her öğrenci için duyuru mesajı oluştur
            for (Student student : allStudents) {
                Message message = new Message();
                message.setContent(announcement.getContent());
                message.setReceiverAll(true);  // Duyuru olduğunu belirt
                message.setTeacher(teacher);
                message.setStudent(student);
                messageRepository.save(message);
            }
        }

        return savedAnnouncement;
    }
}
