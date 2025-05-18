package com.notTakip.backend.service;

import com.notTakip.backend.dto.StudentRequest;
import com.notTakip.backend.entity.Student;
import com.notTakip.backend.repository.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.security.SecureRandom;
import java.util.Optional;

@Service
public class StudentService {

    private final StudentRepository studentRepository;
    private final EmailService emailService;

    @Autowired
    public StudentService(StudentRepository studentRepository, EmailService emailService) {
        this.studentRepository = studentRepository;
        this.emailService = emailService;
    }

    public Student createStudent(StudentRequest studentRequest) {
        Student student = new Student();
        student.setName(studentRequest.getName());
        student.setSurname(studentRequest.getSurname());
        student.setTcKimlik(studentRequest.getTcKimlik());
        student.setEmail(studentRequest.getEmail());
        student.setBirthplace(studentRequest.getBirthplace());
        student.setTeacherId(studentRequest.getTeacherId());

        // Otomatik öğrenci numarası ve parola oluştur
        String studentNumber = generateStudentNumber();
        String password = generatePassword();

        student.setStudentNumber(studentNumber);
        student.setPassword(password);

        Student savedStudent = studentRepository.save(student);
        sendAccountEmail(savedStudent, password);

        return savedStudent;
    }

    public Student findByStudentNumber(String studentNumber) {
        Optional<Student> optionalStudent = studentRepository.findByStudentNumber(studentNumber);
        return optionalStudent.orElse(null);
    }

    private String generateStudentNumber() {
        SecureRandom random = new SecureRandom();
        String digits = "0123456789";
        StringBuilder studentNumber = new StringBuilder(8);
        for (int i = 0; i < 8; i++) {
            studentNumber.append(digits.charAt(random.nextInt(digits.length())));
        }
        return studentNumber.toString();
    }

    private String generatePassword() {
        SecureRandom random = new SecureRandom();
        String digits = "0123456789";
        StringBuilder password = new StringBuilder(10);
        for (int i = 0; i < 10; i++) {
            password.append(digits.charAt(random.nextInt(digits.length())));
        }
        return password.toString();
    }

    private void sendAccountEmail(Student student, String password) {
        String subject = "Not Takip Sistemi - Hesap Bilgileriniz";
        String text = String.format(
            "Merhaba değerli öğrencimiz %s,\n\n" +
            "Yeni eğitim yılınızı kutlar, başarılarla dolu bir yıl geçirmenizi dileriz.\n\n" +
            "Sisteme giriş yapabilmeniz için bilgileriniz aşağıdaki gibidir:\n" +
            "Öğrenci Numaranız: %s\n" +
            "Parolanız: %s\n\n" +
            "Sisteme giriş yaptıktan sonra güvenlik için parolanızı değiştirmenizi öneririz.\n\n" +
            "Başarılar dileriz!\n" +
            "Not Takip Sistemi Ekibi",
            student.getName(),
            student.getStudentNumber(),
            password
        );

        emailService.sendSimpleMessage(student.getEmail(), subject, text);
    }
}
