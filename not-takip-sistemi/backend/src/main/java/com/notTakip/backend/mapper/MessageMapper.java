package com.notTakip.backend.mapper;

import com.notTakip.backend.dto.MessageDTO;
import com.notTakip.backend.entity.Message;

public class MessageMapper {

    public static MessageDTO toDTO(Message message) {
        MessageDTO dto = new MessageDTO();
        dto.setId(message.getId());
        dto.setContent(message.getContent());
        dto.setReply(message.getReply());
        dto.setReceiverAll(message.isReceiverAll());

        if (message.getStudent() != null) {
            dto.setStudentId(message.getStudent().getId());
            dto.setStudentName(message.getStudent().getName()); // Student'da getName() var
        }

        if (message.getTeacher() != null) {
            dto.setTeacherId(message.getTeacher().getId());
            dto.setTeacherName(message.getTeacher().getUsername()); // Teacher'da getUsername() var
        }

        return dto;
    }

    public static Message toEntity(MessageDTO dto) {
        Message message = new Message();
        message.setId(dto.getId());
        message.setContent(dto.getContent());
        message.setReply(dto.getReply());
        message.setReceiverAll(dto.isReceiverAll());
        // Student ve Teacher nesneleri Controller veya Service katmanında set edilmeli
        return message;
    }
}
