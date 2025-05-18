import React, { useEffect, useState } from 'react';
import { createGrade, getGradesByStudent, deleteGrade } from './gradeService';

const GradeList = ({ studentId }) => {
  const [grades, setGrades] = useState([]);
  const [newGrade, setNewGrade] = useState({ courseName: '', gradeValue: '' });
  const [message, setMessage] = useState(null);

  useEffect(() => {
    if (studentId) {
      loadGrades();
    }
  }, [studentId]);

  const loadGrades = async () => {
    try {
      const data = await getGradesByStudent(studentId);
      setGrades(data);
    } catch (err) {
      console.error(err);
      setMessage({ type: 'error', text: 'Notlar yüklenirken hata oluştu.' });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewGrade((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddGrade = async () => {
    if (!newGrade.courseName || newGrade.gradeValue === '') {
      setMessage({ type: 'error', text: 'Lütfen tüm alanları doldurunuz.' });
      return;
    }

    if (Number(newGrade.gradeValue) < 0 || Number(newGrade.gradeValue) > 100) {
      setMessage({ type: 'error', text: 'Not 0 ile 100 arasında olmalıdır.' });
      return;
    }

    try {
      const gradeToCreate = {
        courseName: newGrade.courseName,
        gradeValue: parseFloat(newGrade.gradeValue),
        studentId: studentId,
        teacherId: 1, // Gerektiğinde uygun öğretmen id'si set edilmeli
      };

      await createGrade(gradeToCreate);
      setNewGrade({ courseName: '', gradeValue: '' });
      setMessage({ type: 'success', text: 'Not başarıyla eklendi.' });
      loadGrades();
    } catch (err) {
      console.error(err);
      setMessage({ type: 'error', text: 'Not eklenirken hata oluştu.' });
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteGrade(id);
      setMessage({ type: 'success', text: 'Not başarıyla silindi.' });
      loadGrades();
    } catch (err) {
      console.error(err);
      setMessage({ type: 'error', text: 'Not silinirken hata oluştu.' });
    }
  };

  return (
    <div>
      <h2>Notlar</h2>

      {message && (
        <p style={{ color: message.type === 'error' ? 'red' : 'green' }}>{message.text}</p>
      )}

      <ul>
        {grades.map((grade) => (
          <li key={grade.id}>
            {grade.courseName}: {grade.gradeValue}{' '}
            <button onClick={() => handleDelete(grade.id)}>Sil</button>
          </li>
        ))}
      </ul>

      <h3>Yeni Not Ekle</h3>
      <input
        type="text"
        name="courseName"
        placeholder="Ders Adı"
        value={newGrade.courseName}
        onChange={handleChange}
      />
      <input
        type="number"
        name="gradeValue"
        placeholder="Not"
        min="0"
        max="100"
        value={newGrade.gradeValue}
        onChange={handleChange}
      />
      <button onClick={handleAddGrade}>Ekle</button>
    </div>
  );
};

export default GradeList;
