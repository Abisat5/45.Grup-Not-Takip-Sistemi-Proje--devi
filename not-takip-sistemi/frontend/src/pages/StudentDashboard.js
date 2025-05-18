import React from 'react';
import { FaUserGraduate, FaHome, FaCalendarAlt, FaClipboardList, FaEnvelope, FaBullhorn } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

export default function StudentDashboard({ name, id }) {
  const navigate = useNavigate();

  const menuItems = [
    { label: 'Ana Sayfa', icon: <FaHome />, path: '/student/home' },
    { label: 'Ders Programı', icon: <FaCalendarAlt />, path: '/student/schedule' },
    { label: 'Sınav Notları', icon: <FaClipboardList />, path: '/student/exams' },
    { label: 'Öğretmene Mesaj', icon: <FaEnvelope />, path: '/student/message-teacher' },
    { label: 'Duyurular', icon: <FaBullhorn />, path: '/student/announcements' },
  ];

  return (
    <div style={styles.wrapper}>
      <motion.div
        style={styles.card}
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <motion.h1
          style={styles.header}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          Not Takip Sistemi
        </motion.h1>

        <motion.div
          style={styles.iconWrapper}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, type: 'spring', stiffness: 150 }}
        >
          <FaUserGraduate style={styles.icon} />
        </motion.div>

        <motion.h2
          style={styles.title}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          Hoşgeldiniz, {name}!
        </motion.h2>

        <motion.p
          style={styles.subtitle}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          Öğrenci Numaranız: <strong>{id}</strong>
        </motion.p>

        <motion.div
          style={styles.menu}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          {menuItems.map((item, index) => (
            <motion.button
              key={index}
              style={styles.menuButton}
              onClick={() => navigate(item.path)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span style={{ marginRight: 10 }}>{item.icon}</span>
              {item.label}
            </motion.button>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
}

const styles = {
  wrapper: {
    minHeight: '100vh',
    background: 'linear-gradient(to right, #6a11cb, #2575fc)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '40px',
  },
  card: {
    backgroundColor: '#fff',
    padding: '40px',
    borderRadius: '20px',
    boxShadow: '0 12px 24px rgba(0, 0, 0, 0.2)',
    textAlign: 'center',
    maxWidth: '700px',
    width: '100%',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  },
  header: {
    fontSize: '32px',
    color: '#2575fc',
    fontWeight: 'bold',
    marginBottom: '20px',
  },
  iconWrapper: {
    background: '#2575fc',
    width: '90px',
    height: '90px',
    borderRadius: '50%',
    margin: '0 auto 20px auto',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    fontSize: '45px',
    color: '#fff',
  },
  title: {
    fontSize: '24px',
    marginBottom: '10px',
    color: '#333',
  },
  subtitle: {
    fontSize: '18px',
    color: '#666',
    marginBottom: '25px',
  },
  menu: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: '15px',
  },
  menuButton: {
    padding: '12px 20px',
    fontSize: '16px',
    backgroundColor: '#2575fc',
    color: '#fff',
    border: 'none',
    borderRadius: '10px',
    cursor: 'pointer',
    fontWeight: '500',
    boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.15)',
    display: 'flex',
    alignItems: 'center',
  },
};