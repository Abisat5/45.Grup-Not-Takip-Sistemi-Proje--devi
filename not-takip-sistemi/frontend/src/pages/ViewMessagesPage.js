import React, { useEffect, useState } from 'react';
import axios from 'axios';

function ViewMessagesPage({ username }) {
  const [messages, setMessages] = useState([]);
  const [replyTexts, setReplyTexts] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/messages');
      setMessages(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Mesajlar alınırken hata oluştu:', error);
      setLoading(false);
    }
  };

  const handleReplyChange = (studentId, value) => {
    setReplyTexts(prev => ({
      ...prev,
      [studentId]: value,
    }));
  };

  const handleReplySubmit = async (studentId) => {
    const replyText = replyTexts[studentId];
    if (!replyText || replyText.trim() === '') return;

    try {
      await axios.post('http://localhost:8080/api/messages/reply', {
        studentId,
        teacher: username,
        reply: replyText,
      });
      alert('Cevap gönderildi.');
      setReplyTexts(prev => ({ ...prev, [studentId]: '' }));
    } catch (error) {
      console.error('Cevap gönderilirken hata oluştu:', error);
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Gelen Öğrenci Mesajları</h2>
      {loading ? (
        <p style={styles.infoText}>Yükleniyor...</p>
      ) : messages.length === 0 ? (
        <p style={styles.infoText}>Hiç mesaj yok.</p>
      ) : (
        <ul style={styles.list}>
          {messages.map((msg) => (
            <li key={msg.id} style={styles.messageCard}>
              <p><strong>Öğrenci ID:</strong> {msg.studentId}</p>
              <p><strong>Mesaj:</strong> {msg.message}</p>
              <textarea
                placeholder="Cevabınız..."
                value={replyTexts[msg.studentId] || ''}
                onChange={(e) => handleReplyChange(msg.studentId, e.target.value)}
                style={styles.textarea}
              />
              <button onClick={() => handleReplySubmit(msg.studentId)} style={styles.button}>
                Cevapla
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

const styles = {
  container: {
    maxWidth: 700,
    margin: '40px auto',
    padding: '20px',
    backgroundColor: '#f9fafd',
    borderRadius: 15,
    boxShadow: '0 8px 24px rgba(0, 0, 0, 0.1)',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    color: '#34495e',
  },
  heading: {
    textAlign: 'center',
    marginBottom: 30,
    fontWeight: '700',
    fontSize: 26,
    color: '#2c3e50',
  },
  infoText: {
    textAlign: 'center',
    fontSize: 18,
    color: '#7f8c8d',
    fontStyle: 'italic',
  },
  list: {
    listStyle: 'none',
    padding: 0,
  },
  messageCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 20,
    marginBottom: 25,
    boxShadow: '0 6px 18px rgba(0, 0, 0, 0.08)',
    transition: 'transform 0.2s ease',
  },
  textarea: {
    width: '100%',
    minHeight: 80,
    marginTop: 12,
    padding: 12,
    fontSize: 16,
    borderRadius: 10,
    border: '1.5px solid #bdc3c7',
    resize: 'vertical',
    fontFamily: 'inherit',
    transition: 'border-color 0.3s ease',
    outline: 'none',
  },
  button: {
    marginTop: 14,
    padding: '12px 26px',
    backgroundColor: '#3498db',
    color: '#fff',
    fontWeight: '600',
    border: 'none',
    borderRadius: 12,
    cursor: 'pointer',
    boxShadow: '0 5px 15px rgba(52, 152, 219, 0.4)',
    transition: 'background-color 0.3s ease',
  },
};

export default ViewMessagesPage;
