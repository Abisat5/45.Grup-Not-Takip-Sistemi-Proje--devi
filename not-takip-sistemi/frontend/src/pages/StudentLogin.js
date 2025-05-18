import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaIdBadge, FaLock } from 'react-icons/fa';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Link, useLocation } from 'react-router-dom';

export default function StudentLogin({ onLoginSuccess }) {
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if (message) {
      setShowMessage(true);
      const timer = setTimeout(() => setShowMessage(false), 4000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  const formik = useFormik({
    initialValues: {
      studentNumber: '',
      password: '',
    },
    validationSchema: Yup.object({
      studentNumber: Yup.string()
        .matches(/^[A-Za-z0-9]+$/, 'Lütfen sadece harf ve rakamlardan oluşan bir numara giriniz.')
        .required('Öğrenci numarası zorunlu'),
      password: Yup.string().required('Şifre zorunlu'),
    }),
    onSubmit: async (values) => {
      setLoading(true);
      setMessage('');
      try {
        const res = await axios.post('http://localhost:8080/api/auth/student/login', {
          studentNumber: values.studentNumber.trim(),
          password: values.password.trim(),
        });
        setMessage('✅ Giriş başarılı! Hoşgeldiniz ' + res.data.name);
        formik.resetForm();
        if (onLoginSuccess) onLoginSuccess(res.data.name, res.data.id);
      } catch (err) {
        const errorData = err.response?.data;
        if (errorData && typeof errorData === 'object') {
          setMessage(errorData.message || JSON.stringify(errorData));
        } else {
          setMessage(errorData || '❌ Giriş başarısız.');
        }
      } finally {
        setLoading(false);
      }
    },
  });

  return (
    <div style={styles.wrapper}>

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

      <form style={styles.form} onSubmit={formik.handleSubmit} noValidate>
        <h2 style={styles.title}>Öğrenci Giriş</h2>

        <div style={styles.inputGroup}>
          <FaIdBadge style={styles.icon} />
          <input
            id="studentNumber"
            name="studentNumber"
            type="text"
            placeholder="Öğrenci Numaranızı Girin"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.studentNumber}
            disabled={loading}
            style={{
              ...styles.input,
              borderColor:
                formik.touched.studentNumber && formik.errors.studentNumber ? '#e74c3c' : '#ccc',
            }}
            autoComplete="username"
          />
        </div>
        {formik.touched.studentNumber && formik.errors.studentNumber ? (
          <div style={styles.error}>{formik.errors.studentNumber}</div>
        ) : null}

        <div style={styles.inputGroup}>
          <FaLock style={styles.icon} />
          <input
            id="password"
            name="password"
            type="password"
            placeholder="Şifrenizi Girin"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
            disabled={loading}
            style={{
              ...styles.input,
              borderColor: formik.touched.password && formik.errors.password ? '#e74c3c' : '#ccc',
            }}
            autoComplete="current-password"
          />
        </div>
        {formik.touched.password && formik.errors.password ? (
          <div style={styles.error}>{formik.errors.password}</div>
        ) : null}

        <button
          type="submit"
          style={loading ? styles.buttonDisabled : styles.button}
          disabled={loading}
        >
          {loading ? 'Giriş Yapılıyor...' : 'Giriş Yap'}
        </button>

        <div
          style={{
            ...styles.message,
            opacity: showMessage ? 1 : 0,
            transform: showMessage ? 'translateY(0)' : 'translateY(-10px)',
            color: message.startsWith('✅') ? '#2ecc71' : '#e74c3c',
            pointerEvents: showMessage ? 'auto' : 'none',
          }}
          aria-live="polite"
          role="alert"
        >
          {message}
        </div>
      </form>
    </div>
  );
}

const styles = {
  wrapper: {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',  // nav üstte, form altında
    justifyContent: 'center',
    alignItems: 'center',
    background: 'linear-gradient(135deg, #89f7fe, #66a6ff)',
    padding: 20,
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  },
  nav: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: 30,
    gap: '20px',
    width: '100%',
    maxWidth: 420,
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
    textAlign: 'center',
  },
  navButtonActive: {
    backgroundColor: '#1e3c72',
    color: '#fff',
    boxShadow: '0 6px 12px rgba(30,60,114,0.6)',
  },
  form: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: '40px 30px',
    boxShadow: '0 15px 35px rgba(0,0,0,0.2)',
    width: '100%',
    maxWidth: 420,
    boxSizing: 'border-box',
  },
  title: {
    textAlign: 'center',
    marginBottom: 30,
    fontSize: '2rem',
    color: '#333',
    fontWeight: '700',
    letterSpacing: '1.5px',
  },
  inputGroup: {
    position: 'relative',
    marginBottom: 12,
  },
  icon: {
    position: 'absolute',
    top: '50%',
    left: 14,
    transform: 'translateY(-50%)',
    color: '#7f8c8d',
    fontSize: 20,
    pointerEvents: 'none',
  },
  input: {
    width: '100%',
    padding: '12px 12px 12px 42px',
    fontSize: '1rem',
    borderRadius: 8,
    border: '1.8px solid #ccc',
    outline: 'none',
    transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
    boxSizing: 'border-box',
  },
  button: {
    marginTop: 20,
    width: '100%',
    padding: '14px',
    fontSize: '1.15rem',
    backgroundColor: '#4a90e2',
    color: 'white',
    fontWeight: '700',
    border: 'none',
    borderRadius: 12,
    cursor: 'pointer',
    transition: 'background-color 0.3s ease, box-shadow 0.3s ease',
    boxShadow: '0 8px 15px rgba(74,144,226,0.3)',
  },
  buttonDisabled: {
    marginTop: 20,
    width: '100%',
    padding: '14px',
    fontSize: '1.15rem',
    backgroundColor: '#a0bce6',
    color: '#fff',
    fontWeight: '700',
    border: 'none',
    borderRadius: 12,
    cursor: 'not-allowed',
  },
  message: {
    marginTop: 22,
    textAlign: 'center',
    fontWeight: '600',
    fontSize: '1.1rem',
    transition: 'opacity 0.5s ease, transform 0.5s ease',
  },
  error: {
    marginTop: 4,
    marginBottom: 12,
    fontSize: '0.9rem',
    color: '#e74c3c',
    fontWeight: '600',
  },
};
