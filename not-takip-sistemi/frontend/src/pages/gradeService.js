import axios from 'axios';

const API_URL = 'http://localhost:8080/api/grades';

export const createGrade = async (gradeData) => {
  const response = await axios.post(API_URL, gradeData);
  return response.data;
};

export const getGradesByStudent = async (studentId) => {
  const response = await axios.get(`${API_URL}/student/${studentId}`);
  return response.data;
};

export const getGradesByTeacher = async (teacherId) => {
  const response = await axios.get(`${API_URL}/teacher/${teacherId}`);
  return response.data;
};

export const updateGrade = async (gradeId, gradeData) => {
  const response = await axios.put(`${API_URL}/${gradeId}`, gradeData);
  return response.data;
};

export const deleteGrade = async (gradeId) => {
  await axios.delete(`${API_URL}/${gradeId}`);
};
