package com.notTakip.backend.controller;

import com.notTakip.backend.dto.MessageDTO;
import com.notTakip.backend.entity.Message;
import com.notTakip.backend.entity.Student;
import com.notTakip.backend.entity.Teacher;
import com.notTakip.backend.repository.MessageRepository;
import com.notTakip.backend.repository.StudentRepository;
import com.notTakip.backend.repository.TeacherRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/messages")
@CrossOrigin(origins = "http://localhost:3000")
public class MessageController {

    @Autowired private MessageRepository messageRepository;
    @Autowired private TeacherRepository teacherRepository;
    @Autowired private StudentRepository studentRepository;

    private ResponseEntity<String> validateTeacherById(Long teacherId) {
        if (teacherId == null || teacherRepository.findById(teacherId).isEmpty()) {
            return ResponseEntity.badRequest().body("Geçersiz öğretmen ID.");
        }
        return null;
    }

    private ResponseEntity<String> validateStudentById(Long studentId) {
        if (studentId == null || studentRepository.findById(studentId).isEmpty()) {
            return ResponseEntity.badRequest().body("Geçersiz öğrenci ID.");
        }
        return null;
    }

    // Öğrencinin mesajlarını getir (duyuru + bireysel)
    @GetMapping("/student/{studentId}")
    public ResponseEntity<?> getMessagesForStudent(@PathVariable Long studentId) {
        Optional<Student> studentOpt = studentRepository.findById(studentId);
        if (studentOpt.isEmpty()) {
            return ResponseEntity.badRequest().body("Geçersiz öğrenci ID");
        }

        List<Message> messages = messageRepository.findMessagesForStudentWithAnnouncements(studentId);
        List<MessageDTO> dtoList = messages.stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());

        return ResponseEntity.ok(dtoList);
    }

    // Öğretmenin gelen kutusu
    @GetMapping("/inbox")
    public ResponseEntity<?> getMessagesForTeacher(@RequestParam String teacherUsername) {
        Optional<Teacher> teacherOpt = teacherRepository.findByUsername(teacherUsername);
        if (teacherOpt.isEmpty()) {
            return ResponseEntity.badRequest().body("Geçersiz öğretmen kullanıcı adı.");
        }

        List<Message> messages = messageRepository.findByTeacher_Username(teacherUsername);
        List<MessageDTO> dtoList = messages.stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());

        return ResponseEntity.ok(dtoList);
    }

    // Öğretmenden öğrenciye mesaj gönder
    @PostMapping("/send-to-student")
    public ResponseEntity<?> sendMessageToStudent(@RequestBody MessageDTO dto) {
        ResponseEntity<String> teacherValidation = validateTeacherById(dto.getTeacherId());
        if (teacherValidation != null) return teacherValidation;

        ResponseEntity<String> studentValidation = validateStudentById(dto.getStudentId());
        if (studentValidation != null) return studentValidation;

        Teacher teacher = teacherRepository.findById(dto.getTeacherId()).get();
        Student student = studentRepository.findById(dto.getStudentId()).get();

        Message message = new Message();
        message.setTeacher(teacher);
        message.setStudent(student);
        message.setContent(dto.getContent());
        message.setReceiverAll(false);

        messageRepository.save(message);
        return ResponseEntity.ok("Mesaj öğrenciye gönderildi.");
    }

    // Öğretmenden tüm öğrencilere mesaj gönder
    @PostMapping("/send-to-all")
    public ResponseEntity<?> sendMessageToAllStudents(@RequestBody MessageDTO dto) {
        ResponseEntity<String> teacherValidation = validateTeacherById(dto.getTeacherId());
        if (teacherValidation != null) return teacherValidation;

        Teacher teacher = teacherRepository.findById(dto.getTeacherId()).get();
        List<Student> allStudents = studentRepository.findAll();

        for (Student student : allStudents) {
            Message msg = new Message();
            msg.setTeacher(teacher);
            msg.setStudent(student);
            msg.setContent(dto.getContent());
            msg.setReceiverAll(true);
            messageRepository.save(msg);
        }

        return ResponseEntity.ok("Tüm öğrencilere duyuru gönderildi.");
    }

    // Yanıt mesajı gönder (öğretmen yanıtlıyor)
    @PostMapping("/reply")
    public ResponseEntity<?> replyToMessage(@RequestBody MessageDTO dto) {
        ResponseEntity<String> teacherValidation = validateTeacherById(dto.getTeacherId());
        if (teacherValidation != null) return teacherValidation;

        ResponseEntity<String> studentValidation = validateStudentById(dto.getStudentId());
        if (studentValidation != null) return studentValidation;

        Teacher teacher = teacherRepository.findById(dto.getTeacherId()).get();
        Student student = studentRepository.findById(dto.getStudentId()).get();

        Message reply = new Message();
        reply.setTeacher(teacher);
        reply.setStudent(student);
        reply.setContent(dto.getReply());
        reply.setReceiverAll(false);

        messageRepository.save(reply);
        return ResponseEntity.ok("Yanıt gönderildi.");
    }

    // Entity -> DTO dönüşümü yapan metod
    private MessageDTO convertToDTO(Message msg) {
        return new MessageDTO(
                msg.getId(),
                msg.getContent(),
                msg.getReply(),
                msg.isReceiverAll(),
                msg.getStudent() != null ? msg.getStudent().getId() : null,
                msg.getTeacher() != null ? msg.getTeacher().getId() : null
        );
    }
}
