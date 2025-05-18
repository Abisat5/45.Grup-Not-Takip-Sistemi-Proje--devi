import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useLocation } from 'react-router-dom';

export default function TeacherLogin({ onLoginSuccess }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);
  const [loading, setLoading] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => setMessage(''), 4000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  const handleLogin = async (e) => {
    e.preventDefault();

    if (username.trim().length === 0) {
      setMessage('Kullanıcı adı zorunlu.');
      setIsError(true);
      return;
    }
    if (password.trim().length === 0) {
      setMessage('Şifre zorunlu.');
      setIsError(true);
      return;
    }

    setLoading(true);
    setMessage('');
    setIsError(false);

    try {
      const res = await axios.post('http://localhost:8080/api/auth/teacher/login', {
        username: username.trim(),
        password: password.trim(),
      });
      setMessage('✅ Giriş başarılı! Hoşgeldiniz ' + res.data.username);
      setIsError(false);
      setUsername('');
      setPassword('');
      if (onLoginSuccess) onLoginSuccess(res.data.username);
    } catch (err) {
      setMessage(err.response?.data?.message || '❌ Giriş başarısız.');
      setIsError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.container}>

        {/* Nav Butonları */}
        <nav style={styles.nav}>
          <Link
            to="/student-login"
            style={{
              ...styles.navButton,
              ...(location.pathname === '/student-login' ? styles.navButtonActive : {}),
            }}
          >
            Öğrenci Giriş
          </Link>
          <Link
            to="/teacher-login"
            style={{
              ...styles.navButton,
              ...(location.pathname === '/teacher-login' ? styles.navButtonActive : {}),
            }}
          >
            Öğretmen Giriş
          </Link>
          <Link
            to="/teacher-register"
            style={{
              ...styles.navButton,
              ...(location.pathname === '/teacher-register' ? styles.navButtonActive : {}),
            }}
          >
            Öğretmen Kayıt
          </Link>
        </nav>

        <h2 style={styles.title}>Öğretmen Giriş</h2>
        <form onSubmit={handleLogin} style={styles.form} noValidate>
          <div style={styles.inputGroup}>
            <label htmlFor="username" style={styles.label}>Kullanıcı Adı:</label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={e => setUsername(e.target.value)}
              style={styles.input}
              placeholder="Kullanıcı adınızı girin"
              disabled={loading}
              required
            />
          </div>
          <div style={styles.inputGroup}>
            <label htmlFor="password" style={styles.label}>Şifre:</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              style={styles.input}
              placeholder="Şifrenizi girin"
              disabled={loading}
              required
            />
          </div>
          <button type="submit" disabled={loading} style={loading ? styles.buttonDisabled : styles.button}>
            {loading ? 'Giriş yapılıyor...' : 'Giriş Yap'}
          </button>
        </form>
        {message && (
          <p style={{
            ...styles.message,
            color: isError ? '#ff6b6b' : '#4ade80',
          }}>
            {message}
          </p>
        )}
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #1e3c72, #2a5298)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  },
  container: {
    backgroundColor: '#fff',
    padding: '40px 35px',
    borderRadius: 20,
    boxShadow: '0 15px 35px rgba(0,0,0,0.3)',
    width: '100%',
    maxWidth: 420,
  },
  nav: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: 30,
    gap: '20px',
  },
  navButton: {
    padding: '10px 25px',
    borderRadius: 30,
    textDecoration: 'none',
    color: '#1e3c72',
    fontWeight: '700',
    fontSize: '1rem',
    backgroundColor: '#e0e7ff',
    boxShadow: '0 4px 8px rgba(30,60,114,0.2)',
    transition: 'all 0.3s ease',
    userSelect: 'none',
  },
  navButtonActive: {
    backgroundColor: '#1e3c72',
    color: '#fff',
    boxShadow: '0 6px 12px rgba(30,60,114,0.6)',
  },
  title: {
    textAlign: 'center',
    marginBottom: 40,
    color: '#1e3c72',
    fontWeight: '700',
    fontSize: '2rem',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  inputGroup: {
    marginBottom: 25,
  },
  label: {
    marginBottom: 8,
    display: 'block',
    fontWeight: '600',
    color: '#34495e',
    fontSize: '1rem',
  },
  input: {
    width: '100%',
    padding: '14px 18px',
    fontSize: '1rem',
    borderRadius: 12,
    border: '1.8px solid #bdc3c7',
    outline: 'none',
    transition: 'border-color 0.3s ease',
    boxSizing: 'border-box',
    fontWeight: '500',
    color: '#2c3e50',
  },
  button: {
    padding: '15px',
    fontSize: '1.2rem',
    backgroundColor: '#1e3c72',
    color: 'white',
    fontWeight: '700',
    border: 'none',
    borderRadius: 16,
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  },
  buttonDisabled: {
    padding: '15px',
    fontSize: '1.2rem',
    backgroundColor: '#6c7a89',
    color: 'white',
    fontWeight: '700',
    border: 'none',
    borderRadius: 16,
    cursor: 'not-allowed',
  },
  message: {
    marginTop: 25,
    fontWeight: '700',
    textAlign: 'center',
    fontSize: '1.1rem',
  },
};
