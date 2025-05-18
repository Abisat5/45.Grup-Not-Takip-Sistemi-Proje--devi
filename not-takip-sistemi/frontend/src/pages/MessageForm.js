import React, { useState, useEffect } from 'react';
import axios from 'axios';

const MessageForm = ({ teacherId }) => {
  const [students, setStudents] = useState([]);
  const [selectedStudentId, setSelectedStudentId] = useState('');
  const [messageText, setMessageText] = useState('');
  const [status, setStatus] = useState(null); // { type: 'error' | 'success', text: string }

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const res = await axios.get('http://localhost:8080/api/students');
        setStudents(res.data);
      } catch (err) {
        console.error('Öğrenciler alınamadı', err);
        setStatus({ type: 'error', text: 'Öğrenciler yüklenirken hata oluştu.' });
      }
    };
    fetchStudents();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus(null);

    if (!selectedStudentId) {
      setStatus({ type: 'error', text: 'Lütfen öğrenci seçiniz.' });
      return;
    }

    if (!messageText.trim()) {
      setStatus({ type: 'error', text: 'Lütfen mesajınızı yazınız.' });
      return;
    }

    if (!teacherId || isNaN(Number(teacherId))) {
      setStatus({ type: 'error', text: 'Geçersiz öğretmen ID.' });
      return;
    }

    try {
      const dto = {
        teacherId: Number(teacherId),
        studentId: Number(selectedStudentId),
        content: messageText.trim(),
      };

      await axios.post('http://localhost:8080/api/messages/send-to-student', dto);
      setStatus({ type: 'success', text: 'Mesaj başarıyla gönderildi.' });
      setMessageText('');
      setSelectedStudentId('');
    } catch (err) {
      console.error('Mesaj gönderme hatası:', err.response?.data || err.message);
      setStatus({ type: 'error', text: err.response?.data || 'Mesaj gönderilirken hata oluştu.' });
    }
  };

  return (
    <div style={styles.container}>
      <h3 style={styles.heading}>Öğrenciye Mesaj Gönder</h3>
      <form onSubmit={handleSubmit} style={styles.form}>
        <select
          value={selectedStudentId}
          onChange={(e) => setSelectedStudentId(e.target.value)}
          style={styles.select}
        >
          <option value="">Öğrenci Seçiniz</option>
          {students.map((student) => (
            <option key={student.id} value={student.id}>
              {student.name} ({student.studentNumber})
            </option>
          ))}
        </select>

        <input
          type="text"
          placeholder="Mesajınızı yazınız"
          value={messageText}
          onChange={(e) => setMessageText(e.target.value)}
          style={styles.input}
        />

        <button type="submit" style={styles.button}>
          Gönder
        </button>
      </form>

      {status && (
        <p
          style={{
            ...styles.status,
            color: status.type === 'error' ? '#d32f2f' : '#388e3c',
            backgroundColor: status.type === 'error' ? '#f9dcdc' : '#dcedc8',
            borderColor: status.type === 'error' ? '#d32f2f' : '#388e3c',
          }}
          role="alert"
        >
          {status.text}
        </p>
      )}
    </div>
  );
};

const styles = {
  container: {
    marginTop: 20,
    maxWidth: 650,
    backgroundColor: '#fff',
    padding: 30,
    borderRadius: 12,
    boxShadow: '0 8px 24px rgba(0, 0, 0, 0.12)',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  },
  heading: {
    marginBottom: 20,
    color: '#333',
    fontWeight: '700',
    fontSize: 24,
    textAlign: 'center',
  },
  form: {
    display: 'flex',
    gap: 12,
    flexWrap: 'wrap',
    alignItems: 'center',
  },
  select: {
    flex: '1 1 180px',
    padding: '10px 14px',
    borderRadius: 8,
    border: '1.5px solid #ccc',
    fontSize: 16,
    outline: 'none',
    transition: 'border-color 0.3s ease',
  },
  input: {
    flex: '2 1 300px',
    padding: '10px 14px',
    borderRadius: 8,
    border: '1.5px solid #ccc',
    fontSize: 16,
    outline: 'none',
    transition: 'border-color 0.3s ease',
  },
  button: {
    flexShrink: 0,
    padding: '11px 22px',
    backgroundColor: '#1976d2',
    color: '#fff',
    border: 'none',
    borderRadius: 8,
    fontSize: 16,
    fontWeight: '600',
    cursor: 'pointer',
    boxShadow: '0 4px 12px rgba(25, 118, 210, 0.4)',
    transition: 'background-color 0.3s ease',
  },
  status: {
    marginTop: 18,
    padding: '10px 16px',
    borderRadius: 8,
    fontWeight: '600',
    fontSize: 15,
    border: '1.5px solid',
    textAlign: 'center',
    userSelect: 'none',
  },
};

export default MessageForm;
