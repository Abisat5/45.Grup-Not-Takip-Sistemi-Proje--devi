import React, { useEffect, useState } from 'react';
import axios from 'axios';

const OgrenciListesi = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/students');
        setStudents(response.data);
      } catch (error) {
        console.error('Öğrenci verileri alınamadı:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, []);

  if (loading)
    return (
      <div style={styles.loading}>
        Yükleniyor...
      </div>
    );

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Kayıtlı Öğrenciler</h2>
      {students.length === 0 ? (
        <p style={styles.noData}>Hiç öğrenci kaydı bulunamadı.</p>
      ) : (
        <table style={styles.table}>
          <thead>
            <tr style={styles.tableHeaderRow}>
              <th style={styles.th}>Öğrenci No</th>
              <th style={styles.th}>Ad</th>
              <th style={styles.th}>Soyad</th>
              <th style={styles.th}>Email</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr key={student.id} style={styles.tableRow}>
                <td style={styles.td}>{student.studentNumber || student.id}</td>
                <td style={styles.td}>{student.name}</td>
                <td style={styles.td}>{student.surname}</td>
                <td style={styles.td}>{student.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

const styles = {
  container: {
    padding: 30,
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    maxWidth: 900,
    margin: '40px auto',
    backgroundColor: '#fff',
    borderRadius: 20,
    boxShadow: '0 12px 24px rgba(0,0,0,0.1)',
  },
  title: {
    fontSize: 28,
    color: '#2575fc',
    fontWeight: '700',
    marginBottom: 20,
    textAlign: 'center',
  },
  noData: {
    fontSize: 18,
    color: '#666',
    textAlign: 'center',
  },
  loading: {
    fontSize: 20,
    color: '#2575fc',
    textAlign: 'center',
    marginTop: 100,
    fontWeight: '600',
  },
  table: {
    width: '100%',
    borderCollapse: 'separate',
    borderSpacing: '0 10px',
  },
  tableHeaderRow: {
    backgroundColor: '#2575fc',
    color: '#fff',
    textAlign: 'left',
    borderRadius: 12,
  },
  th: {
    padding: '12px 20px',
    fontWeight: '600',
  },
  tableRow: {
    backgroundColor: '#f5f9ff',
    boxShadow: '0 2px 6px rgba(37, 117, 252, 0.15)',
    borderRadius: 12,
  },
  td: {
    padding: '12px 20px',
    borderBottom: 'none',
  },
};

export default OgrenciListesi;
