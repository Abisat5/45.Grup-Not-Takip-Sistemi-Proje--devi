import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function SchedulePage({ id }) {
  const [schedule, setSchedule] = useState(null);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const fetchSchedule = async () => {
      setLoading(true);
      try {
        const res = await fetch(`http://localhost:8080/api/student/${id}/schedule`);
        if (!res.ok) throw new Error('Ders programı alınamadı.');
        const data = await res.json();
        setSchedule(data);
        setMessage('');
      } catch (err) {
        setMessage(err.message);
        setSchedule(null);
      } finally {
        setLoading(false);
      }
    };

    fetchSchedule();
  }, [id]);

  return (
    <div style={styles.pageWrapper}>
      {/* Üst Başlık + Navbar */}
      <header style={styles.header}>
        <h1 style={styles.title}>Not Takip Sistemi</h1>
        <nav style={styles.nav}>
          <Link to="/student/home" style={styles.navLink}>Ana Sayfa</Link>
          <Link to="/student/schedule" style={{ ...styles.navLink, ...styles.activeLink }}>Ders Programı</Link>
          <Link to="/student/exams" style={styles.navLink}>Sınav Notları</Link>
          <Link to="/student/message-teacher" style={styles.navLink}>Öğretmene Mesaj</Link>
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
          Ders Programınız
        </motion.h2>

        {loading && <p style={{ textAlign: 'center', fontSize: '1.2rem' }}>Yükleniyor...</p>}

        {!loading && message && (
          <p style={{ color: '#e74c3c', fontWeight: '600', textAlign: 'center' }}>{message}</p>
        )}

        {!loading && !message && schedule && (
          <div style={styles.scheduleBox}>
            <p><strong>{schedule.name}</strong></p>
            {/* İstersen burada detaylı ders programı bilgisi varsa onları da gösterebilirsin */}
          </div>
        )}

        {!loading && !message && !schedule && (
          <p style={{ textAlign: 'center', fontSize: '1.1rem' }}>Ders programı bulunmamaktadır.</p>
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
    minHeight: '200px',
    justifyContent: 'center',
  },

  pageTitle: {
    marginBottom: '25px',
    fontSize: '2rem',
    color: '#1e2a78',
    textAlign: 'center',
    fontWeight: '700',
  },

  scheduleBox: {
    fontSize: '1.3rem',
    textAlign: 'center',
  },
};
