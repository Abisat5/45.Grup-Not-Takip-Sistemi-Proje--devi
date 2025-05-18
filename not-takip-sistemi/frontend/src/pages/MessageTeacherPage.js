import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function MessageTeacherPage({ id }) {
  const [teachers, setTeachers] = useState([]);
  const [selectedTeacher, setSelectedTeacher] = useState('');
  const [teacherMessage, setTeacherMessage] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchTeachers();
  }, []);

  const fetchTeachers = async () => {
    try {
      const res = await axios.get('http://localhost:8080/api/teachers');
      setTeachers(res.data || []);
      setMessage('');
    } catch (err) {
      setMessage('Öğretmen listesi alınamadı.');
    }
  };

  const handleSendMessage = async () => {
    if (!selectedTeacher || !teacherMessage.trim()) {
      alert('Lütfen öğretmen seçin ve mesajınızı yazın.');
      return;
    }
    try {
      await axios.post('http://localhost:8080/api/messages', {
        studentId: id,
        teacherId: selectedTeacher,
        message: teacherMessage.trim(),
      });
      alert('Mesaj gönderildi!');
      setTeacherMessage('');
      setSelectedTeacher('');
    } catch (err) {
      alert('Mesaj gönderilirken hata oluştu.');
    }
  };

  return (
    <div style={styles.pageWrapper}>
      {/* Üst Başlık + Navbar */}
      <header style={styles.header}>
        <h1 style={styles.title}>Not Takip Sistemi</h1>
        <nav style={styles.nav}>
          <Link to="/student/home" style={styles.navLink}>Ana Sayfa</Link>
          <Link to="/student/schedule" style={styles.navLink}>Ders Programı</Link>
          <Link to="/student/exams" style={styles.navLink}>Sınav Notları</Link>
          <Link to="/student/message-teacher" style={{ ...styles.navLink, ...styles.activeLink }}>Öğretmene Mesaj</Link>
          <Link to="/student/announcements" style={styles.navLink}>Duyurular</Link>
        </nav>
      </header>

      <main style={styles.container}>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          style={styles.pageTitle}
        >
          Öğretmene Mesaj Gönder
        </motion.h2>

        {message && (
          <motion.p
            style={styles.errorMessage}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {message}
          </motion.p>
        )}

        <select
          value={selectedTeacher}
          onChange={(e) => setSelectedTeacher(e.target.value)}
          style={styles.select}
        >
          <option value="">Öğretmen Seçin</option>
          {teachers.map((t) => (
            <option key={t.id} value={t.id}>
              {t.name}
            </option>
          ))}
        </select>

        <textarea
          placeholder="Mesajınızı yazınız..."
          value={teacherMessage}
          onChange={(e) => setTeacherMessage(e.target.value)}
          style={styles.textarea}
        />

        <button onClick={handleSendMessage} style={styles.button}>
          Gönder
        </button>
      </main>
    </div>
  );
}

const styles = {
  pageWrapper: {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #6a11cb, #2575fc)',
    color: '#333',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  },
  header: {
    backgroundColor: '#1e2a78',
    padding: '15px 20px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
  },
  title: {
    color: 'white',
    margin: 0,
    fontSize: '1.8rem',
    fontWeight: '700',
    letterSpacing: '1.5px',
  },
  nav: {
    marginTop: 12,
    display: 'flex',
    gap: '18px',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  navLink: {
    color: 'white',
    fontWeight: '600',
    fontSize: '1rem',
    textDecoration: 'none',
    padding: '8px 16px',
    borderRadius: '8px',
    backgroundColor: 'transparent',
    transition: 'background-color 0.3s ease',
  },
  activeLink: {
    backgroundColor: '#f39c12',
    color: '#1e2a78',
  },

  container: {
    maxWidth: '700px',
    margin: '40px auto 80px',
    backgroundColor: 'white',
    borderRadius: '20px',
    boxShadow: '0 12px 24px rgba(0,0,0,0.15)',
    padding: '30px',
    display: 'flex',
    flexDirection: 'column',
  },
  pageTitle: {
    marginBottom: '25px',
    fontSize: '2rem',
    color: '#1e2a78',
    textAlign: 'center',
    fontWeight: '700',
  },
  errorMessage: {
    color: '#e74c3c',
    fontWeight: '600',
    marginBottom: '15px',
    textAlign: 'center',
  },
  select: {
    width: '100%',
    padding: '12px',
    marginBottom: '20px',
    fontSize: '16px',
    borderRadius: '8px',
    border: '1px solid #ccc',
    outlineColor: '#2575fc',
  },
  textarea: {
    width: '100%',
    minHeight: '120px',
    padding: '12px',
    marginBottom: '25px',
    fontSize: '16px',
    resize: 'vertical',
    borderRadius: '8px',
    border: '1px solid #ccc',
    outlineColor: '#2575fc',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  },
  button: {
    padding: '15px',
    backgroundColor: '#2575fc',
    color: 'white',
    border: 'none',
    fontSize: '18px',
    borderRadius: '10px',
    cursor: 'pointer',
    fontWeight: '700',
    transition: 'background-color 0.3s ease',
  },
  buttonHover: {
    backgroundColor: '#1a5edb',
  },
};
