package com.notTakip.backend.repository;

import com.notTakip.backend.entity.Announcement;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AnnouncementRepository extends JpaRepository<Announcement, Long> {
    List<Announcement> findByTeacherId(Long teacherId);
}
