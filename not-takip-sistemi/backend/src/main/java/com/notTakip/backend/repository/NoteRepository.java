package com.notTakip.backend.repository;

import com.notTakip.backend.entity.Grade;
import org.springframework.data.jpa.repository.JpaRepository;

public interface NoteRepository extends JpaRepository<Grade, Long> {
}
