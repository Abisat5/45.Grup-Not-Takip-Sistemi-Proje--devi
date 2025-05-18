import React, { useEffect, useState } from 'react';
import axios from 'axios';

const StudentNotes = ({ studentId }) => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`http://localhost:8080/api/notes?studentId=${studentId}`)
      .then(res => setNotes(res.data))
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, [studentId]);

  if (loading) return <p>Yükleniyor...</p>;
  if (!notes.length) return <p>Henüz notunuz bulunmamaktadır.</p>;

  return (
    <div style={{ maxWidth: 600, margin: 'auto', padding: 20 }}>
      <h2>Notlarınız</h2>
      <ul>
        {notes.map(note => (
          <li key={note.id} style={{ marginBottom: 10, borderBottom: '1px solid #ccc', paddingBottom: 8 }}>
            {note.text}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StudentNotes;
