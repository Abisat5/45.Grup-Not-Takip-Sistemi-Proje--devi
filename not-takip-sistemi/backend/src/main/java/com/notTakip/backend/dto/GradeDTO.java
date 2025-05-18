package com.notTakip.backend.dto;

public class GradeDTO {
    private Long id;
    private String lessonName;      // Ders adı
    private Double gradeValue;
    private Long studentId;
    private String studentFullName; // Öğrenci tam adı (ad + soyad)
    private Long teacherId;
    private String teacherUsername; // Öğretmen kullanıcı adı
    private String examType;

    public GradeDTO() {
    }

    public GradeDTO(Long id, String lessonName, Double gradeValue,
                    Long studentId, String studentFullName,
                    Long teacherId, String teacherUsername,
                    String examType) {
        this.id = id;
        this.lessonName = lessonName;
        this.gradeValue = gradeValue;
        this.studentId = studentId;
        this.studentFullName = studentFullName;
        this.teacherId = teacherId;
        this.teacherUsername = teacherUsername;
        this.examType = examType;
    }

    // Getter ve Setter'lar

    public Long getId() {
        return id;
    }
    public void setId(Long id) {
        this.id = id;
    }

    public String getLessonName() {
        return lessonName;
    }
    public void setLessonName(String lessonName) {
        this.lessonName = lessonName;
    }

    public Double getGradeValue() {
        return gradeValue;
    }
    public void setGradeValue(Double gradeValue) {
        this.gradeValue = gradeValue;
    }

    public Long getStudentId() {
        return studentId;
    }
    public void setStudentId(Long studentId) {
        this.studentId = studentId;
    }

    public String getStudentFullName() {
        return studentFullName;
    }
    public void setStudentFullName(String studentFullName) {
        this.studentFullName = studentFullName;
    }

    public Long getTeacherId() {
        return teacherId;
    }
    public void setTeacherId(Long teacherId) {
        this.teacherId = teacherId;
    }

    public String getTeacherUsername() {
        return teacherUsername;
    }
    public void setTeacherUsername(String teacherUsername) {
        this.teacherUsername = teacherUsername;
    }

    public String getExamType() {
        return examType;
    }
    public void setExamType(String examType) {
        this.examType = examType;
    }
}
