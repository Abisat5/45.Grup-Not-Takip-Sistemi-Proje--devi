import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function StudentAnnouncementsPage({ studentId }) {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:8080/api/messages/student/${studentId}`)
      .then(res => {
        if (!res.ok) throw new Error('Veri alınamadı');
        return res.json();
      })
      .then(data => {
        setMessages(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, [studentId]);

  return (
    <div style={styles.pageWrapper}>
      {/* Üst Başlık + Navbar */}
      <header style={styles.header}>
        <h1 style={styles.title}>Not Takip Sistemi</h1>
        <nav style={styles.nav}>
          <Link to="/student/home" style={styles.navLink}>Ana Sayfa</Link>
          <Link to="/student/schedule" style={styles.navLink}>Ders Programı</Link>
          <Link to="/student/exams" style={styles.navLink}>Sınav Notları</Link>
          <Link to="/student/message-teacher" style={styles.navLink}>Öğretmene Mesaj</Link>
          <Link to="/student/announcements" style={{ ...styles.navLink, ...styles.activeLink }}>Duyurular</Link>
        </nav>
      </header>

      <main style={styles.container}>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          style={styles.pageTitle}
        >
          Duyurular ve Mesajlar
        </motion.h2>

        {loading && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{ textAlign: 'center', fontSize: '1.2rem' }}
          >
            Yükleniyor...
          </motion.p>
        )}

        {error && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{ color: '#e74c3c', fontWeight: '600', textAlign: 'center' }}
          >
            Hata: {error}
          </motion.p>
        )}

        {!loading && !error && messages.length === 0 && (
          <p style={{ textAlign: 'center', fontSize: '1.1rem' }}>
            Gösterilecek mesaj veya duyuru yok.
          </p>
        )}

        {!loading && !error && messages.length > 0 && (
          <ul style={styles.messageList}>
            {messages.map(msg => (
              <li
                key={msg.id}
                style={{
                  ...styles.messageItem,
                  backgroundColor: msg.receiverAll ? '#e3f2fd' : '#f1f8e9',
                  borderColor: msg.receiverAll ? '#90caf9' : '#aed581',
                }}
              >
                <strong>{msg.receiverAll ? 'Duyuru' : 'Mesaj'}</strong><br />
                <em>Gönderen: {msg.teacher?.username || 'Bilinmiyor'}</em>
                <p style={{ marginTop: 8 }}>{msg.content}</p>
              </li>
            ))}
          </ul>
        )}
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

  messageList: {
    listStyleType: 'none',
    padding: 0,
  },

  messageItem: {
    marginBottom: 15,
    padding: 15,
    borderRadius: 6,
    border: '1px solid',
    boxShadow: '0 3px 8px rgba(0,0,0,0.07)',
  },
};
