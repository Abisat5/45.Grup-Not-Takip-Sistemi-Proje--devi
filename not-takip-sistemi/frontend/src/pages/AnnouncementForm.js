import React, { useState } from 'react';
import axios from 'axios';

const AnnouncementForm = ({ teacherUsername }) => {
  const [announcementText, setAnnouncementText] = useState('');
  const [status, setStatus] = useState(null); // { type: 'error' | 'success', text: string }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!announcementText.trim()) {
      setStatus({ type: 'error', text: 'Duyuru boş olamaz.' });
      return;
    }

    try {
      const teacherId = 1; // Dinamik yapılmalı

      await axios.post('http://localhost:8080/api/announcements', {
        title: 'Duyuru',
        content: announcementText,
        teacherId: teacherId,
      });

      setStatus({ type: 'success', text: 'Duyuru gönderildi.' });
      setAnnouncementText('');
    } catch (err) {
      console.error(err);
      setStatus({ type: 'error', text: 'Duyuru gönderilirken hata oluştu.' });
    }
  };

  return (
    <div style={styles.container}>
      <h3 style={styles.heading}>Tüm Öğrencilere Duyuru Gönder</h3>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="text"
          placeholder="Duyuru metnini yazınız"
          value={announcementText}
          onChange={(e) => setAnnouncementText(e.target.value)}
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
            color: status.type === 'error' ? '#e74c3c' : '#27ae60',
          }}
        >
          {status.text}
        </p>
      )}
    </div>
  );
};

const styles = {
  container: {
    marginTop: 40,
    maxWidth: 500,
    backgroundColor: '#fff',
    padding: 25,
    borderRadius: 15,
    boxShadow: '0 8px 20px rgba(0, 0, 0, 0.1)',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  },
  heading: {
    marginBottom: 20,
    color: '#34495e',
    fontWeight: '700',
    fontSize: 24,
    textAlign: 'center',
  },
  form: {
    display: 'flex',
    gap: 12,
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  input: {
    flexGrow: 1,
    minWidth: 250,
    padding: '12px 15px',
    fontSize: 16,
    borderRadius: 10,
    border: '1.8px solid #bdc3c7',
    outline: 'none',
    transition: 'border-color 0.3s ease',
  },
  button: {
    padding: '12px 24px',
    backgroundColor: '#4caf50',
    color: '#fff',
    fontWeight: '600',
    border: 'none',
    borderRadius: 10,
    cursor: 'pointer',
    boxShadow: '0 6px 12px rgba(76, 175, 80, 0.4)',
    transition: 'background-color 0.3s ease',
  },
  status: {
    marginTop: 15,
    fontWeight: '600',
    textAlign: 'center',
    fontSize: 16,
  },
};

export default AnnouncementForm;
