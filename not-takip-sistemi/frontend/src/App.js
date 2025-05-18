import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link,
  useNavigate,
  useLocation,
  Navigate,
} from 'react-router-dom';

import TeacherRegister from './pages/TeacherRegister';
import TeacherLogin from './pages/TeacherLogin';
import StudentLogin from './pages/StudentLogin';
import TeacherHomePage from './pages/TeacherHomePage';
import StudentDashboard from './pages/StudentDashboard';
import SchedulePage from './pages/SchedulePage';
import ExamScoresPage from './pages/ExamScoresPage';
import MessageTeacherPage from './pages/MessageTeacherPage';
import OgrenciEkle from './pages/OgrenciEkle';
import OgrenciListesi from './pages/OgrenciListesi';
import ViewMessagesPage from './pages/ViewMessagesPage';
import SendMessagePage from './pages/SendMessagePage';
import SendAnnouncementPage from './pages/SendAnnouncementPage';
import StudentAnnouncementsPage from './pages/StudentAnnouncementsPage';
import NotGirPage from './pages/NotGirPage';

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

function AppContent() {
  const location = useLocation();
  const navigate = useNavigate();

  const showNav = ['/student-login', '/teacher-login', '/teacher-register'].includes(location.pathname);

  const [studentName, setStudentName] = React.useState(() => localStorage.getItem('studentName') || '');
  const [studentId, setStudentId] = React.useState(() => localStorage.getItem('studentId') || '');

  const handleStudentLoginSuccess = (name, id) => {
    setStudentName(name);
    setStudentId(id);
    localStorage.setItem('studentName', name);
    localStorage.setItem('studentId', id);
    navigate('/student/home');
  };

  return (
    <div
      style={{
        maxWidth: 700,
        margin: 'auto',
        padding: 20,
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      }}
    >


      <Routes>
        <Route path="/student-login" element={<StudentLogin onLoginSuccess={handleStudentLoginSuccess} />} />
        <Route path="/teacher-login" element={<TeacherLoginWrapper />} />
        <Route path="/teacher-register" element={<TeacherRegister />} />

        <Route path="/teacher/home" element={<TeacherHomePageWrapper />} />
        <Route path="/teacher/messages" element={<ViewMessagesPageWrapper />} />
        <Route path="/teacher/send-message" element={<SendMessagePageWrapper />} />
        <Route path="/teacher/send-announcement" element={<SendAnnouncementPageWrapper />} />
        <Route path="/ogrenci-not-giris" element={<NotGirPage />} />

        <Route path="/ogrenci-ekle" element={<OgrenciEkle />} />
        <Route path="/ogrenci-listesi" element={<OgrenciListesi />} />

        <Route
          path="/student/*"
          element={
            studentName && studentId ? (
              <StudentRoutes name={studentName} id={studentId} />
            ) : (
              <Navigate to="/student-login" replace />
            )
          }
        />

        <Route path="/" element={<Navigate to="/student-login" replace />} />
        <Route path="*" element={<div>Sayfa bulunamadı.</div>} />
      </Routes>
    </div>
  );
}

function TeacherLoginWrapper() {
  const navigate = useNavigate();

  const handleLoginSuccess = (username) => {
    navigate('/teacher/home', { state: { username } });
  };

  return <TeacherLogin onLoginSuccess={handleLoginSuccess} />;
}

function TeacherHomePageWrapper() {
  const location = useLocation();
  const username = location.state?.username || 'Öğretmen';
  const navigate = useNavigate();

  const handleEnterGrades = () => {
    navigate('/teacher/not-gir', { state: { username } });
  };

  return <TeacherHomePage username={username} onEnterGrades={handleEnterGrades} />;
}

function ViewMessagesPageWrapper() {
  const location = useLocation();
  const username = location.state?.username || 'Öğretmen';

  return <ViewMessagesPage username={username} />;
}

function SendMessagePageWrapper() {
  const location = useLocation();
  const username = location.state?.username || 'Öğretmen';

  return <SendMessagePage username={username} />;
}

function SendAnnouncementPageWrapper() {
  const location = useLocation();
  const username = location.state?.username || 'Öğretmen';

  return <SendAnnouncementPage username={username} />;
}

function StudentRoutes({ name, id }) {
  return (
    <>
      
      <Routes>
        <Route path="home" element={<StudentDashboard name={name} id={id} />} />
        <Route path="schedule" element={<SchedulePage id={id} />} />
        <Route path="exams" element={<ExamScoresPage id={id} />} />
        <Route path="message-teacher" element={<MessageTeacherPage id={id} />} />
        <Route path="announcements" element={<StudentAnnouncementsPage studentId={id} />} />
        <Route path="*" element={<Navigate to="home" replace />} />
      </Routes>
    </>
  );
}


export default App;
