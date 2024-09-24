import Home from "./pages/Home";
import SignUpClient from "./pages/SignUpClient";
import Login from "./pages/Login";
import SignupSelection from "./pages/SignupSelection";
import JobseekerHome from "./pages/JobseekerHome";
import EmployerHome from "./pages/EmployerHome";
import JobseekerProfile from "./pages/JobseekerProfile";
import EmployerProfile from "./pages/EmployerProfile";
import JobPost from "./pages/JobPost"
import { BrowserRouter,Routes,Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/signup' element={<SignupSelection/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/signup/client' element={<SignUpClient />} /> 
        <Route path='/signup/jobseeker' element={<SignUpClient />}/>
        <Route path='/jobseeker' element={<JobseekerHome/>}/>
        <Route path='/employer' element={<EmployerHome/>}/>
        <Route path='/signup/jobseeker/profile/:userId' element={<JobseekerProfile/>}/>
        <Route path='/signup/employer/profile/:userId' element={<EmployerProfile/>}/>
        <Route path='/employer/jobpost' element={<JobPost/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
