package com.notTakip.backend.dto;

public class MessageDTO {
    private Long id;
    private String content;
    private String reply;
    private boolean receiverAll;
    private Long studentId;
    private String studentName;
    private Long teacherId;
    private String teacherName;

    // Parametresiz constructor (çok önemli!)
    public MessageDTO() {
    }

    // Parametreli constructor
    public MessageDTO(Long id, String content, String reply, boolean receiverAll, Long studentId, Long teacherId) {
        this.id = id;
        this.content = content;
        this.reply = reply;
        this.receiverAll = receiverAll;
        this.studentId = studentId;
        this.teacherId = teacherId;
    }

    // Getter ve Setterlar
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public String getReply() {
        return reply;
    }

    public void setReply(String reply) {
        this.reply = reply;
    }

    public boolean isReceiverAll() {
        return receiverAll;
    }

    public void setReceiverAll(boolean receiverAll) {
        this.receiverAll = receiverAll;
    }

    public Long getStudentId() {
        return studentId;
    }

    public void setStudentId(Long studentId) {
        this.studentId = studentId;
    }

    public String getStudentName() {
        return studentName;
    }

    public void setStudentName(String studentName) {
        this.studentName = studentName;
    }

    public Long getTeacherId() {
        return teacherId;
    }

    public void setTeacherId(Long teacherId) {
        this.teacherId = teacherId;
    }

    public String getTeacherName() {
        return teacherName;
    }

    public void setTeacherName(String teacherName) {
        this.teacherName = teacherName;
    }
}
