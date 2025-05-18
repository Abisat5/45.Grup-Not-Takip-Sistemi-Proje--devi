import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaChalkboardTeacher, FaUsers, FaClipboardList, FaEnvelope, FaBullhorn, FaSignOutAlt } from 'react-icons/fa';
import { motion } from 'framer-motion';

const TeacherHomePage = ({ username }) => {
  const [teacher, setTeacher] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const teacherRes = await axios.get(`http://localhost:8080/api/auth/teacher/me?username=${username}`);
        setTeacher(teacherRes.data);
      } catch (error) {
        console.error('Veri çekme hatası:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [username]);

  const handleAddStudent = () => navigate('/ogrenci-ekle');
  const handleShowStudents = () => navigate('/ogrenci-listesi');
  const handleEnterGrades = () => navigate('/ogrenci-not-giris', { state: { teacher } });
  const handleViewMessages = () => navigate('/teacher/messages', { state: { teacher } });
  const handleSendMessage = () => navigate('/teacher/send-message', { state: { teacher } });
  const handleSendAnnouncement = () => navigate('/teacher/send-announcement', { state: { teacher } });
  const handleLogout = () => navigate('/teacher-login');

  if (loading) return <div style={styles.loading}>Yükleniyor...</div>;
  if (!teacher) return <div style={styles.error}>Öğretmen bilgisi bulunamadı.</div>;

  return (
    <div style={styles.wrapper}>
      <motion.div 
        style={styles.card}
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
      >
        <motion.div style={styles.iconWrapper} animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 20, ease: 'linear' }}>
          <FaChalkboardTeacher style={styles.icon} />
        </motion.div>

        <motion.h1 style={styles.title} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
          Okul Yönetim Sistemi
        </motion.h1>
        <motion.h2 style={styles.subtitle} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
          Hoşgeldiniz, {teacher.name}!
        </motion.h2>
        <motion.p style={styles.description} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}>
          Öğrencilerinizle iletişimde kalabilir, notları takip edebilir ve duyurularınızı kolayca yapabilirsiniz.
        </motion.p>

        {/* Öğrenci Yönetimi */}
        <motion.div style={styles.section} initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.8 }}>
          <h3 style={styles.sectionTitle}><FaUsers style={{ marginRight: 8 }} /> Öğrenci Yönetimi</h3>
          <p style={styles.sectionDesc}>Öğrenci listesine göz atabilir, yeni öğrenciler ekleyebilir ve not girişi yapabilirsiniz.</p>
          <div style={styles.buttonGroup}>
            <button style={{ ...styles.button, ...styles.blue }} onClick={handleShowStudents}>Öğrenci Listesi</button>
            <button style={{ ...styles.button, ...styles.green }} onClick={handleAddStudent}>Öğrenci Ekle</button>
            <button style={{ ...styles.button, ...styles.teal }} onClick={handleEnterGrades}>Not Girişi Yap</button>
          </div>
        </motion.div>

        {/* Mesajlar & Duyurular */}
        <motion.div style={styles.section} initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 1 }}>
          <h3 style={styles.sectionTitle}><FaEnvelope style={{ marginRight: 8 }} /> Mesajlar & Duyurular</h3>
          <p style={styles.sectionDesc}>Öğrencilere mesaj gönderip gelen mesajları takip edin, duyurularınızı yayınlayın.</p>
          <div style={styles.buttonGroup}>
            <button style={{ ...styles.button, ...styles.orange }} onClick={handleSendMessage}>Mesaj Gönder</button>
            <button style={{ ...styles.button, ...styles.purple }} onClick={handleSendAnnouncement}>Duyuru Yap</button>
            <button style={{ ...styles.button, ...styles.redOrange }} onClick={handleViewMessages}>Mesajları Görüntüle</button>
          </div>
        </motion.div>

        {/* Logout */}
        <motion.div style={{ marginTop: 40 }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }}>
          <button style={{ ...styles.button, ...styles.red, width: '100%' }} onClick={handleLogout}>
            <FaSignOutAlt style={{ marginRight: 10 }} /> Çıkış Yap
          </button>
        </motion.div>
      </motion.div>
    </div>
  );
};

const styles = {
  wrapper: {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #4c6ef5, #15aabf)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '30px',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 20,
    boxShadow: '0 15px 30px rgba(0,0,0,0.25)',
    padding: 35,
    maxWidth: 700,
    width: '100%',
    textAlign: 'center',
  },
  iconWrapper: {
    backgroundColor: '#15aabf',
    width: 90,
    height: 90,
    borderRadius: '50%',
    margin: '0 auto 20px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: '#fff',
    fontSize: 45,
  },
  icon: {
    fontSize: 45,
  },
  title: {
    fontSize: 30,
    fontWeight: '700',
    color: '#4c6ef5',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 22,
    fontWeight: '600',
    color: '#333',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: '#555',
    marginBottom: 30,
  },
  section: {
    marginBottom: 30,
    textAlign: 'left',
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#15aabf',
    marginBottom: 8,
    display: 'flex',
    alignItems: 'center',
  },
  sectionDesc: {
    color: '#444',
    fontSize: 15,
    marginBottom: 15,
    lineHeight: 1.4,
  },
  buttonGroup: {
    display: 'flex',
    gap: '12px',
    flexWrap: 'wrap',
  },
  button: {
    flex: '1 1 150px',
    padding: '12px 18px',
    borderRadius: 12,
    border: 'none',
    fontSize: 15,
    fontWeight: '600',
    cursor: 'pointer',
    boxShadow: '0 6px 12px rgba(0,0,0,0.15)',
    color: '#fff',
    transition: 'transform 0.2s ease, box-shadow 0.2s ease',
  },
  blue: {
    backgroundColor: '#4c6ef5',
  },
  green: {
    backgroundColor: '#37b24d',
  },
  teal: {
    backgroundColor: '#1098ad',
  },
  orange: {
    backgroundColor: '#f08c00',
  },
  purple: {
    backgroundColor: '#845ef7',
  },
  redOrange: {
    backgroundColor: '#f76707',
  },
  red: {
    backgroundColor: '#f03e3e',
  },
  loading: {
    color: '#fff',
    fontSize: 22,
    fontWeight: '600',
    textAlign: 'center',
    marginTop: 100,
  },
  error: {
    color: '#f03e3e',
    fontSize: 20,
    fontWeight: '600',
    textAlign: 'center',
    marginTop: 100,
  },
};

export default TeacherHomePage;
