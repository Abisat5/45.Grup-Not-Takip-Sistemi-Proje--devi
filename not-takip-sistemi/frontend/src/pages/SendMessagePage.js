import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import MessageForm from './MessageForm';

const SendMessagePage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [teacher, setTeacher] = useState(null);

  useEffect(() => {
    const stateTeacher = location.state?.teacher;

    if (stateTeacher) {
      setTeacher(stateTeacher);
      localStorage.setItem('teacher', JSON.stringify(stateTeacher)); // bilgiyi sakla
    } else {
      const storedTeacher = localStorage.getItem('teacher');
      if (storedTeacher) {
        setTeacher(JSON.parse(storedTeacher)); // saklanan bilgiyi geri yükle
      }
    }
  }, [location.state]);

  if (!teacher) {
    return (
      <div>
        <p>Öğretmen bilgisi bulunamadı. Lütfen ana sayfaya dönün.</p>
        <button onClick={() => navigate('/teacher/home')}>Ana Sayfa</button>
      </div>
    );
  }

  return (
    <div style={{ padding: '20px' }}>
      <h2>Mesaj Gönder - {teacher.name}</h2>
      <MessageForm teacherUsername={teacher.username} />
      <button
        onClick={() => navigate('/teacher/home')}
        style={{
          marginTop: 20,
          padding: '8px 16px',
          backgroundColor: '#2196F3',
          color: '#fff',
          border: 'none',
          borderRadius: 5
        }}
      >
        Geri Dön
      </button>
    </div>
  );
};

export default SendMessagePage;
