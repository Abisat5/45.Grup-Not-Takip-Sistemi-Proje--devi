import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';

export default function TeacherMessagesPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const [teacherId, setTeacherId] = useState(null);

  const [messages, setMessages] = useState([]);
  const [replyText, setReplyText] = useState('');
  const [selectedStudentId, setSelectedStudentId] = useState(null);

  useEffect(() => {
    const stateId = location.state?.teacherId;

    if (stateId) {
      setTeacherId(stateId);
      localStorage.setItem('teacherId', stateId);
    } else {
      const storedId = localStorage.getItem('teacherId');
      if (storedId) {
        setTeacherId(storedId);
      }
    }
  }, [location.state]);

  useEffect(() => {
    if (teacherId) {
      fetchMessages();
    }
  }, [teacherId]);

  const fetchMessages = async () => {
    try {
      const res = await axios.get(`http://localhost:8080/api/messages/teacher/${teacherId}`);
      setMessages(res.data || []);
    } catch (err) {
      alert('Mesajlar alınamadı.');
    }
  };

  const handleReply = async () => {
    if (!selectedStudentId || !replyText.trim()) return alert("Mesaj yazınız ve öğrenci seçiniz.");

    try {
      await axios.post('http://localhost:8080/api/messages/reply', {
        teacherId,
        studentId: selectedStudentId,
        content: replyText.trim(),  // Burada 'content' kullanıldı
      });
      alert('Cevap gönderildi.');
      setReplyText('');
      setSelectedStudentId(null);
      fetchMessages();
    } catch (err) {
      alert('Cevap gönderilemedi.');
    }
  };

  if (!teacherId) {
    return (
      <div style={{ textAlign: 'center', marginTop: 50 }}>
        <p>Öğretmen bilgisi bulunamadı. Lütfen ana sayfaya dönün.</p>
        <button onClick={() => navigate('/teacher/home')}>Ana Sayfa</button>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <h2>Gelen Mesajlar</h2>
      {messages.map((msg) => (
        <div key={msg.id || msg.date} style={styles.messageCard}>
          <p><strong>{msg.studentName}</strong> ({new Date(msg.date).toLocaleString()}):</p>
          <p>{msg.message}</p>
          <button onClick={() => setSelectedStudentId(msg.studentId)} style={styles.replyBtn}>
            Bu Mesaja Cevap Ver
          </button>
        </div>
      ))}

      {selectedStudentId && (
        <div style={{ marginTop: 20 }}>
          <h3>Cevap Yaz</h3>
          <textarea
            value={replyText}
            onChange={(e) => setReplyText(e.target.value)}
            placeholder="Cevabınızı yazın..."
            style={styles.textarea}
          />
          <button onClick={handleReply} style={styles.sendBtn}>Gönder</button>
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    maxWidth: '700px',
    margin: '30px auto',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  },
  messageCard: {
    padding: 15,
    border: '1px solid #ddd',
    borderRadius: 8,
    marginBottom: 10,
    backgroundColor: '#f9f9f9',
  },
  replyBtn: {
    marginTop: 10,
    backgroundColor: '#03a9f4',
    color: '#fff',
    padding: '8px 12px',
    border: 'none',
    borderRadius: 4,
    cursor: 'pointer',
  },
  textarea: {
    width: '100%',
    minHeight: 80,
    padding: 10,
    fontSize: 16,
    marginBottom: 10,
  },
  sendBtn: {
    padding: '10px 20px',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: 5,
    cursor: 'pointer',
  },
};
