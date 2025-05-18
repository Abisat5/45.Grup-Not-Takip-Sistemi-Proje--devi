import React, { useEffect, useState } from 'react';
import axios from 'axios';

const TeacherNotes = () => {
  const [students, setStudents] = useState([]);
  const [selectedStudentId, setSelectedStudentId] = useState('');
  const [notes, setNotes] = useState([]);
  const [newNoteText, setNewNoteText] = useState('');
  const [editingNoteId, setEditingNoteId] = useState(null);
  const [editingNoteText, setEditingNoteText] = useState('');

  useEffect(() => {
    // Öğrencileri çek (backend'den)
    axios.get('http://localhost:8080/api/students')
      .then(res => setStudents(res.data))
      .catch(err => console.error(err));
  }, []);

  useEffect(() => {
    if (selectedStudentId) {
      // Seçilen öğrencinin notlarını çek
      axios.get(`http://localhost:8080/api/notes?studentId=${selectedStudentId}`)
        .then(res => setNotes(res.data))
        .catch(err => console.error(err));
    } else {
      setNotes([]);
    }
  }, [selectedStudentId]);

  const handleAddNote = () => {
    if (!newNoteText.trim() || !selectedStudentId) return;
    axios.post('http://localhost:8080/api/notes', {
      studentId: selectedStudentId,
      text: newNoteText,
    })
    .then(res => {
      setNotes([...notes, res.data]);
      setNewNoteText('');
    })
    .catch(err => console.error(err));
  };

  const handleDeleteNote = (id) => {
    axios.delete(`http://localhost:8080/api/notes/${id}`)
      .then(() => {
        setNotes(notes.filter(note => note.id !== id));
      })
      .catch(err => console.error(err));
  };

  const startEditing = (note) => {
    setEditingNoteId(note.id);
    setEditingNoteText(note.text);
  };

  const cancelEditing = () => {
    setEditingNoteId(null);
    setEditingNoteText('');
  };

  const saveEditing = () => {
    axios.put(`http://localhost:8080/api/notes/${editingNoteId}`, { text: editingNoteText })
      .then(res => {
        setNotes(notes.map(note => note.id === editingNoteId ? res.data : note));
        cancelEditing();
      })
      .catch(err => console.error(err));
  };

  return (
    <div style={{ maxWidth: 700, margin: 'auto', padding: 20 }}>
      <h2>Öğrenci Not Yönetimi</h2>

      <label>
        Öğrenci Seç:
        <select
          value={selectedStudentId}
          onChange={e => setSelectedStudentId(e.target.value)}
          style={{ marginLeft: 10, padding: 5 }}
        >
          <option value="">-- Seçiniz --</option>
          {students.map(s => (
            <option key={s.id} value={s.id}>{s.name}</option>
          ))}
        </select>
      </label>

      {selectedStudentId && (
        <>
          <div style={{ marginTop: 20 }}>
            <input
              type="text"
              value={newNoteText}
              onChange={e => setNewNoteText(e.target.value)}
              placeholder="Yeni not girin"
              style={{ width: '70%', padding: 8 }}
            />
            <button onClick={handleAddNote} style={{ marginLeft: 10, padding: '8px 16px' }}>
              Not Ekle
            </button>
          </div>

          <ul style={{ marginTop: 30, listStyle: 'none', padding: 0 }}>
            {notes.length === 0 && <li>Not bulunamadı.</li>}
            {notes.map(note => (
              <li key={note.id} style={{ marginBottom: 15, borderBottom: '1px solid #ddd', paddingBottom: 10 }}>
                {editingNoteId === note.id ? (
                  <>
                    <input
                      type="text"
                      value={editingNoteText}
                      onChange={e => setEditingNoteText(e.target.value)}
                      style={{ width: '70%', padding: 6 }}
                    />
                    <button onClick={saveEditing} style={{ marginLeft: 10 }}>Kaydet</button>
                    <button onClick={cancelEditing} style={{ marginLeft: 5 }}>İptal</button>
                  </>
                ) : (
                  <>
                    <span>{note.text}</span>
                    <button onClick={() => startEditing(note)} style={{ marginLeft: 10 }}>Düzenle</button>
                    <button onClick={() => handleDeleteNote(note.id)} style={{ marginLeft: 5, color: 'red' }}>Sil</button>
                  </>
                )}
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default TeacherNotes;
