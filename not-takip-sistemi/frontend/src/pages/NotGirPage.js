import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import styles from '../components/NotGirPage.module.css'; // CSS modülü

const NotGirPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const teacher = location.state?.teacher;

  const [students, setStudents] = useState([]);
  const [lessons, setLessons] = useState([]);
  const [selectedStudentId, setSelectedStudentId] = useState('');
  const [selectedLessonId, setSelectedLessonId] = useState('');
  const [examType, setExamType] = useState('');
  const [grade, setGrade] = useState('');
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [studentsRes, lessonsRes] = await Promise.all([
          axios.get('http://localhost:8080/api/students'),
          axios.get('http://localhost:8080/api/lessons'),
        ]);
        setStudents(studentsRes.data);
        setLessons(lessonsRes.data);
      } catch (error) {
        console.error('Veriler alınamadı:', error);
        setMessage({ type: 'error', text: 'Veriler alınırken hata oluştu.' });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);

    if (!selectedStudentId || !selectedLessonId || !examType || grade === '') {
      setMessage({ type: 'error', text: 'Lütfen tüm alanları doldurun.' });
      return;
    }

    if (Number(grade) < 0 || Number(grade) > 100) {
      setMessage({ type: 'error', text: 'Not 0 ile 100 arasında olmalıdır.' });
      return;
    }

    try {
      await axios.post('http://localhost:8080/api/grades', {
        teacherId: teacher?.id,
        studentId: selectedStudentId,
        lessonId: selectedLessonId,
        examType,
        gradeValue: Number(grade),
      });

      setMessage({ type: 'success', text: 'Not başarıyla kaydedildi.' });
      setSelectedStudentId('');
      setSelectedLessonId('');
      setExamType('');
      setGrade('');
    } catch (error) {
      console.error('Not kaydedilemedi:', error);
      setMessage({ type: 'error', text: 'Not kaydedilirken hata oluştu.' });
    }
  };

  if (loading) return <div className={styles.loading}>Yükleniyor...</div>;

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Not Girişi</h2>

      {message && (
        <div
          className={`${styles.message} ${
            message.type === 'error' ? styles.error : styles.success
          }`}
        >
          {message.text}
        </div>
      )}

      <form onSubmit={handleSubmit} className={styles.form}>
        <label className={styles.label}>
          Öğrenci Seçin:
          <select
            value={selectedStudentId}
            onChange={(e) => setSelectedStudentId(e.target.value)}
            className={styles.select}
          >
            <option value="">-- Seçiniz --</option>
            {students.map((student) => (
              <option key={student.id} value={student.id}>
                {student.studentNumber} - {student.name} {student.surname}
              </option>
            ))}
          </select>
        </label>

        <label className={styles.label}>
          Ders Seçin:
          <select
            value={selectedLessonId}
            onChange={(e) => setSelectedLessonId(e.target.value)}
            className={styles.select}
          >
            <option value="">-- Seçiniz --</option>
            {lessons.map((lesson) => (
              <option key={lesson.id} value={lesson.id}>
                {lesson.lessonName}
              </option>
            ))}
          </select>
        </label>

        <label className={styles.label}>
          Sınav Türü:
          <select
            value={examType}
            onChange={(e) => setExamType(e.target.value)}
            className={styles.select}
          >
            <option value="">-- Seçiniz --</option>
            <option value="vize">Vize</option>
            <option value="final">Final</option>
            <option value="but">Bütünleme</option>
          </select>
        </label>

        <label className={styles.label}>
          Not:
          <input
            type="number"
            min="0"
            max="100"
            value={grade}
            onChange={(e) => setGrade(e.target.value)}
            className={styles.input}
            placeholder="0-100"
          />
        </label>

        <button type="submit" className={styles.submitButton}>
          Notu Kaydet
        </button>
      </form>

      <button onClick={() => navigate(-1)} className={styles.backButton}>
        Geri Dön
      </button>
    </div>
  );
};

export default NotGirPage;
