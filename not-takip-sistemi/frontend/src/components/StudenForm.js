import React, { useState } from "react";
import axios from "axios";

const StudentForm = () => {
  const [name, setName] = useState("");
  const [teacherId, setTeacherId] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:8080/api/students", {
        name,
        teacherId,
      });

      setMessage(`✅ Kayıt başarılı. Öğrenci No: ${response.data.studentNumber}, Şifre: ${response.data.password}`);
      setName("");
      setTeacherId("");
    } catch (error) {
      console.error("Hata:", error);
      setMessage("❌ Kayıt sırasında bir hata oluştu.");
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-white shadow rounded-xl mt-10">
      <h2 className="text-xl font-semibold mb-4 text-center">Öğrenci Kayıt Formu</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block">Öğrenci Adı</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border p-2 rounded"
            required
          />
        </div>
        <div>
          <label className="block">Öğretmen ID</label>
          <input
            type="number"
            value={teacherId}
            onChange={(e) => setTeacherId(e.target.value)}
            className="w-full border p-2 rounded"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Kaydet
        </button>
      </form>
      {message && (
        <div className="mt-4 text-center text-sm text-green-700">{message}</div>
      )}
    </div>
  );
};

export default StudentForm;
