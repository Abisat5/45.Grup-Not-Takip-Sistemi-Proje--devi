import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const ExamScoresPage = ({ id }) => {
  const [examScores, setExamScores] = useState([]);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!id || isNaN(id)) {
      setMessage('Geçerli bir öğrenci ID’si bulunamadı.');
      return;
    }

    const fetchExamScores = async () => {
      setLoading(true);
      setMessage('');
      try {
        const res = await axios.get(`http://localhost:8080/api/grades/student/${id}`);
        setExamScores(res.data || []);
        if ((res.data || []).length === 0) {
          setMessage('Henüz sınav notunuz bulunmamaktadır.');
        }
      } catch (err) {
        console.error(err);
        if (err.response && err.response.status === 404) {
          setMessage('Bu ID’ye ait öğrenci bulunamadı.');
        } else {
          setMessage('Sınav notları alınamadı.');
        }
        setExamScores([]);
      } finally {
        setLoading(false);
      }
    };

    fetchExamScores();
  }, [id]);

  return (
    <div style={styles.pageWrapper}>
      {/* Başlık ve Menü */}
      <header style={styles.header}>
        <h1 style={styles.title}>Not Takip Sistemi</h1>
        <nav style={styles.nav}>
          <Link to="/student/home" style={styles.navLink}>Ana Sayfa</Link>
          <Link to="/student/schedule" style={styles.navLink}>Ders Programı</Link>
          <Link to="/student/exams" style={{ ...styles.navLink, ...styles.activeLink }}>Sınav Notları</Link>
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
          Sınav Notlarınız
        </motion.h2>

        {loading && (
          <motion.p 
            style={styles.loading}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            Yükleniyor...
          </motion.p>
        )}

        {!loading && message && (
          <motion.p 
            style={styles.message}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {message}
          </motion.p>
        )}

        {!loading && examScores.length > 0 && (
          <motion.table
            style={styles.table}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7 }}
          >
            <thead style={styles.thead}>
              <tr>
                <th style={styles.th}>Ders</th>
                <th style={styles.th}>Not</th>
                <th style={styles.th}>Sınav Türü</th>
              </tr>
            </thead>
            <tbody>
              {examScores.map((score) => (
                <tr key={score.id} style={styles.tr}>
                  <td style={styles.td}>{score.lessonName || 'Bilinmiyor'}</td>
                  <td style={styles.td}>{score.gradeValue !== null ? score.gradeValue : '-'}</td>
                  <td style={styles.td}>{score.examType || '-'}</td>
                </tr>
              ))}
            </tbody>
          </motion.table>
        )}
      </main>
    </div>
  );
};

export default ExamScoresPage;

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
    maxWidth: '900px',
    margin: '40px auto 80px',
    backgroundColor: 'white',
    borderRadius: '20px',
    boxShadow: '0 12px 24px rgba(0,0,0,0.15)',
    padding: '30px',
  },
  pageTitle: {
    marginBottom: '25px',
    fontSize: '2rem',
    color: '#1e2a78',
    textAlign: 'center',
    fontWeight: '700',
  },
  loading: {
    fontSize: '1.2rem',
    textAlign: 'center',
    color: '#555',
  },
  message: {
    fontSize: '1.2rem',
    textAlign: 'center',
    color: '#e74c3c',
    fontWeight: '600',
  },
  table: {
    width: '100%',
    borderCollapse: 'separate',
    borderSpacing: '0 12px',
  },
  thead: {
    borderBottom: '2px solid #2575fc',
  },
  th: {
    textAlign: 'left',
    padding: '12px 15px',
    color: '#2575fc',
    fontWeight: '700',
    fontSize: '1.1rem',
  },
  tr: {
    backgroundColor: '#f7f9fc',
    boxShadow: '0 2px 8px rgb(37 117 252 / 0.15)',
    borderRadius: '12px',
    transition: 'background-color 0.3s ease',
  },
  td: {
    padding: '15px',
    fontSize: '1rem',
    color: '#333',
  },
};
