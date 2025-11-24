import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import MyCourse from "./pages/MyCourse";
import AssignmentDetail from "./pages/AssignmentDetail";
import JurusanPage from "./pages/JurusanPage";
import EnrollCourse from "./pages/EnrollCourse";
import ProdiPage from "./pages/ProdiPage";
import NewHomePage from "./pages/NewHomePage";
import TasksPage from "./pages/TasksPage";
import AttendancePage from "./pages/AttendancePage";
import StudentProfile from "./pages/ProfilePage";
import AnnouncementDetailPage from "./pages/AnnouncementDetailPage";
import GradesPage from "./pages/GradePages";
import EventDetailPage from "./pages/EventDetailPage";
import LibraryRoomBooking from "./pages/LibraryRoomBooking";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<NewHomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/my-course/:courseId" element={<MyCourse />} />
        <Route path="/my-course/:courseId/assignment/:assignmentId" element={<AssignmentDetail />} />
        <Route path="/enroll-course/:jurusanId" element={<JurusanPage />} />
        <Route path="/enroll-course/:jurusanId/:prodiId" element={<ProdiPage />} />
        <Route path="/enroll-course/:jurusanId/:prodiId/:semId/:courseId" element={<EnrollCourse />} />
        <Route path="/tasks" element={<TasksPage />}/>
        <Route path="/attendance" element={<AttendancePage />}/>
        <Route path="/grade" element={<GradesPage />}/>
        <Route path="/profile" element={<StudentProfile />}/>
        <Route path="/campus-announcment/:id" element={<AnnouncementDetailPage />}/>
        <Route path="/event/:id" element={<EventDetailPage />}/>
        <Route path="/library-room-booking" element={<LibraryRoomBooking />}/>
      </Routes>
    </div>
  );
}

export default App;
