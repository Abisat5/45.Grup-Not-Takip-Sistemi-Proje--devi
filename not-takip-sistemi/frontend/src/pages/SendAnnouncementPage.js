import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import AnnouncementForm from './AnnouncementForm';

const SendAnnouncementPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const teacher = location.state?.teacher;

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
      <h2>Duyuru Yap - {teacher.name}</h2>
      <AnnouncementForm teacherUsername={teacher.username} />
      <button onClick={() => navigate('/teacher/home')} style={{ marginTop: 20 }}>
        Geri Dön
      </button>
    </div>
  );
};

export default SendAnnouncementPage;
