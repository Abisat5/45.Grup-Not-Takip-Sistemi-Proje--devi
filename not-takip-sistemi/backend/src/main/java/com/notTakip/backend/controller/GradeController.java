package com.notTakip.backend.controller;

import com.notTakip.backend.dto.GradeDTO;
import com.notTakip.backend.dto.GradeRequest;
import com.notTakip.backend.service.GradeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/grades")
@CrossOrigin(origins = "http://localhost:3000")
public class GradeController {

    private final GradeService gradeService;

    @Autowired
    public GradeController(GradeService gradeService) {
        this.gradeService = gradeService;
    }

    @PostMapping
    public ResponseEntity<GradeDTO> createGrade(@RequestBody GradeRequest gradeRequest) {
        GradeDTO grade = gradeService.createGrade(gradeRequest);
        return ResponseEntity.ok(grade);
    }

    @GetMapping("/student/{studentId}")
    public ResponseEntity<List<GradeDTO>> getGradesByStudent(@PathVariable Long studentId) {
        List<GradeDTO> grades = gradeService.getGradesByStudentId(studentId);
        return ResponseEntity.ok(grades);
    }

    @GetMapping("/teacher/{teacherId}")
    public ResponseEntity<List<GradeDTO>> getGradesByTeacher(@PathVariable Long teacherId) {
        List<GradeDTO> grades = gradeService.getGradesByTeacherId(teacherId);
        return ResponseEntity.ok(grades);
    }

    @PutMapping("/{gradeId}")
    public ResponseEntity<GradeDTO> updateGrade(@PathVariable Long gradeId, @RequestBody GradeRequest gradeRequest) {
        GradeDTO updatedGrade = gradeService.updateGrade(gradeId, gradeRequest);
        return ResponseEntity.ok(updatedGrade);
    }

    @DeleteMapping("/{gradeId}")
    public ResponseEntity<Void> deleteGrade(@PathVariable Long gradeId) {
        gradeService.deleteGrade(gradeId);
        return ResponseEntity.noContent().build();
    }
}
