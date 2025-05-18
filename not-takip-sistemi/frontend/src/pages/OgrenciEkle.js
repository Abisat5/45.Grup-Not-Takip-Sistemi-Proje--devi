import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const OgrenciEkle = () => {
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [tcKimlik, setTcKimlik] = useState('');
  const [email, setEmail] = useState('');
  const [birthplace, setBirthplace] = useState('');
  const [mesaj, setMesaj] = useState('');
  const [mesajTipi, setMesajTipi] = useState(''); // success or error
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMesaj('');
    setMesajTipi('');

    if (!name || !surname || !tcKimlik || !email || !birthplace) {
      setMesaj('Lütfen tüm alanları doldurun.');
      setMesajTipi('error');
      return;
    }

    if (!/^\d{11}$/.test(tcKimlik)) {
      setMesaj('Geçerli bir 11 haneli T.C. Kimlik numarası giriniz.');
      setMesajTipi('error');
      return;
    }

    try {
      const res = await axios.post('http://localhost:8080/api/students', {
        name,
        surname,
        tcKimlik,
        email,
        birthplace,
      });

      setMesaj(`Başarıyla eklendi! Öğrenci No: ${res.data.studentNumber || '-'} / Şifre: (gizli)`);
      setMesajTipi('success');

      // Alanları temizle
      setName('');
      setSurname('');
      setTcKimlik('');
      setEmail('');
      setBirthplace('');
    } catch (err) {
      console.error('Hata:', err);
      setMesaj('Kayıt sırasında hata oluştu.');
      setMesajTipi('error');
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Öğrenci Ekle</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="text"
          placeholder="Ad"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={styles.input}
          required
        />
        <input
          type="text"
          placeholder="Soyad"
          value={surname}
          onChange={(e) => setSurname(e.target.value)}
          style={styles.input}
          required
        />
        <input
          type="text"
          placeholder="T.C. Kimlik No"
          value={tcKimlik}
          onChange={(e) => setTcKimlik(e.target.value)}
          maxLength={11}
          style={styles.input}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={styles.input}
          required
        />
        <input
          type="text"
          placeholder="Doğum Yeri"
          value={birthplace}
          onChange={(e) => setBirthplace(e.target.value)}
          style={styles.input}
          required
        />
        <button type="submit" style={styles.submitBtn}>
          Kaydet
        </button>
        {mesaj && (
          <p style={mesajTipi === 'success' ? styles.successMsg : styles.errorMsg}>{mesaj}</p>
        )}
      </form>
      <button onClick={() => navigate('/ogretmen')} style={styles.backBtn}>
        Geri Dön
      </button>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: 480,
    margin: '50px auto',
    padding: 30,
    borderRadius: 20,
    boxShadow: '0 12px 24px rgba(0,0,0,0.1)',
    backgroundColor: '#fff',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  },
  title: {
    textAlign: 'center',
    color: '#2575fc',
    marginBottom: 25,
    fontWeight: 700,
    fontSize: 28,
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: 15,
  },
  input: {
    padding: '12px 15px',
    borderRadius: 10,
    border: '1.5px solid #ccc',
    fontSize: 16,
    outline: 'none',
    transition: 'border-color 0.3s ease',
  },
  submitBtn: {
    padding: '12px',
    backgroundColor: '#2575fc',
    color: '#fff',
    fontWeight: '600',
    fontSize: 18,
    border: 'none',
    borderRadius: 12,
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  },
  submitBtnHover: {
    backgroundColor: '#0057d8',
  },
  successMsg: {
    color: '#2d8a4e',
    fontWeight: '600',
    textAlign: 'center',
    marginTop: 10,
  },
  errorMsg: {
    color: '#d32f2f',
    fontWeight: '600',
    textAlign: 'center',
    marginTop: 10,
  },
  backBtn: {
    marginTop: 25,
    padding: '10px 15px',
    backgroundColor: '#ccc',
    border: 'none',
    borderRadius: 10,
    cursor: 'pointer',
    fontWeight: '600',
    transition: 'background-color 0.3s ease',
  },
};

export default OgrenciEkle;
