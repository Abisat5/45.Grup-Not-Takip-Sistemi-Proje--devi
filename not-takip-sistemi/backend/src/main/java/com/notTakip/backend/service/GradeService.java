package com.notTakip.backend.service;

import com.notTakip.backend.dto.GradeDTO;
import com.notTakip.backend.dto.GradeRequest;
import com.notTakip.backend.entity.Grade;
import com.notTakip.backend.entity.Lesson;
import com.notTakip.backend.entity.Student;
import com.notTakip.backend.entity.Teacher;
import com.notTakip.backend.repository.GradeRepository;
import com.notTakip.backend.repository.LessonRepository;
import com.notTakip.backend.repository.StudentRepository;
import com.notTakip.backend.repository.TeacherRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class GradeService {

    private final GradeRepository gradeRepository;
    private final StudentRepository studentRepository;
    private final TeacherRepository teacherRepository;
    private final LessonRepository lessonRepository;

    @Autowired
    public GradeService(GradeRepository gradeRepository,
                        StudentRepository studentRepository,
                        TeacherRepository teacherRepository,
                        LessonRepository lessonRepository) {
        this.gradeRepository = gradeRepository;
        this.studentRepository = studentRepository;
        this.teacherRepository = teacherRepository;
        this.lessonRepository = lessonRepository;
    }

    public GradeDTO createGrade(GradeRequest gradeRequest) {
        Optional<Student> studentOpt = studentRepository.findById(gradeRequest.getStudentId());
        Optional<Teacher> teacherOpt = teacherRepository.findById(gradeRequest.getTeacherId());
        Optional<Lesson> lessonOpt = lessonRepository.findById(gradeRequest.getLessonId());

        if (studentOpt.isEmpty() || teacherOpt.isEmpty() || lessonOpt.isEmpty()) {
            throw new IllegalArgumentException("Geçersiz öğrenci, öğretmen veya ders ID");
        }

        Grade grade = new Grade();
        grade.setStudent(studentOpt.get());
        grade.setTeacher(teacherOpt.get());
        grade.setLesson(lessonOpt.get());
        grade.setGradeValue(gradeRequest.getGradeValue());
        grade.setExamType(gradeRequest.getExamType());

        Grade saved = gradeRepository.save(grade);
        return mapToDTO(saved);
    }

    public List<GradeDTO> getGradesByStudentId(Long studentId) {
        return gradeRepository.findByStudentId(studentId)
                .stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    public List<GradeDTO> getGradesByTeacherId(Long teacherId) {
        return gradeRepository.findByTeacherId(teacherId)
                .stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    public void deleteGrade(Long gradeId) {
        gradeRepository.deleteById(gradeId);
    }

    public GradeDTO updateGrade(Long gradeId, GradeRequest gradeRequest) {
        Optional<Grade> gradeOpt = gradeRepository.findById(gradeId);
        if (gradeOpt.isEmpty()) {
            throw new IllegalArgumentException("Not bulunamadı");
        }

        Grade grade = gradeOpt.get();

        if (gradeRequest.getLessonId() != null && (grade.getLesson() == null || !gradeRequest.getLessonId().equals(grade.getLesson().getId()))) {
            Lesson lesson = lessonRepository.findById(gradeRequest.getLessonId())
                    .orElseThrow(() -> new IllegalArgumentException("Geçersiz ders ID"));
            grade.setLesson(lesson);
        }

        if (gradeRequest.getGradeValue() != null) {
            grade.setGradeValue(gradeRequest.getGradeValue());
        }
        if (gradeRequest.getExamType() != null) {
            grade.setExamType(gradeRequest.getExamType());
        }

        if (gradeRequest.getStudentId() != null && !gradeRequest.getStudentId().equals(grade.getStudent().getId())) {
            Student student = studentRepository.findById(gradeRequest.getStudentId())
                    .orElseThrow(() -> new IllegalArgumentException("Geçersiz öğrenci ID"));
            grade.setStudent(student);
        }

        if (gradeRequest.getTeacherId() != null && !gradeRequest.getTeacherId().equals(grade.getTeacher().getId())) {
            Teacher teacher = teacherRepository.findById(gradeRequest.getTeacherId())
                    .orElseThrow(() -> new IllegalArgumentException("Geçersiz öğretmen ID"));
            grade.setTeacher(teacher);
        }

        Grade updated = gradeRepository.save(grade);
        return mapToDTO(updated);
    }

private GradeDTO mapToDTO(Grade grade) {
    return new GradeDTO(
        grade.getId(),
        grade.getLesson() != null ? grade.getLesson().getLessonName() : null,
        grade.getGradeValue(),
        grade.getStudent().getId(),
        grade.getStudent().getName() + " " + grade.getStudent().getSurname(),
        grade.getTeacher().getId(),
        grade.getTeacher().getUsername(),
        grade.getExamType()
    );
}

}
