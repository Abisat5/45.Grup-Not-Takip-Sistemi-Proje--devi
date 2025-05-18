package com.notTakip.backend.repository;

import com.notTakip.backend.entity.Message;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface MessageRepository extends JpaRepository<Message, Long> {

    // Öğretmene gelen mesajları öğretmen kullanıcı adına göre getir
    List<Message> findByTeacher_Username(String username);

    // Öğrenciye gelen bireysel ve duyuru mesajları (receiverAll = true ise duyuru)
    @Query("SELECT m FROM Message m WHERE m.student.id = :studentId OR m.receiverAll = true")
    List<Message> findMessagesForStudentWithAnnouncements(@Param("studentId") Long studentId);
}
