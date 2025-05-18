import React, { useState, useEffect } from 'react';
import MessageForm from './MessageForm';

const TeacherDashboard = () => {
  const [teacherId, setTeacherId] = useState(null);

  useEffect(() => {
    // Örnek: login sonrası gerçek backend’den alınmalı
    setTeacherId(1); // Örnek sabit id
  }, []);

  if (!teacherId) return <p>Yükleniyor...</p>;

  return (
    <div>
      <h2>Öğretmen Paneli</h2>
      <MessageForm teacherId={teacherId} />
    </div>
  );
};

export default TeacherDashboard;
