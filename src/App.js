import Home from "./pages/Home";
import SignUpClient from "./pages/SignUpClient";
import Login from "./pages/Login";
import SignupSelection from "./pages/SignupSelection";
import JobseekerHome from "./pages/JobseekerHome";
import EmployerHome from "./pages/EmployerHome";
import JobseekerProfile from "./pages/JobseekerProfile";
import EmployerProfile from "./pages/EmployerProfile";
import JobPost from "./pages/JobPost"
import CreatePostForm from "./components/jobpost/CreatePostForm";
import JobPostsByEmployer from "./components/jobpost/JobPostsByEmployer";
import ViewApplicants from "./components/jobpost/ViewApplicants";
import JobSeekerSearch from "./pages/JobSeekerSearch";
import JobApplication from "./pages/JobApplication";
import ApplicationForm from './pages/ApplicationForm';
import { BrowserRouter,Routes,Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import { JobPostsForSeeker } from "./pages/JobPostsForSeeker";
import ResetPassword from "./pages/ResetPassword";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path='/' element={<Home/>}/>
        <Route path='/signup' element={<SignupSelection/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/signup/client' element={<SignUpClient />} /> 
        <Route path='/signup/jobseeker' element={<SignUpClient />}/>
        {/* <Route path='/jobseeker' element={<JobseekerHome/>}/> */}
        <Route path='/employer' element={<EmployerHome/>}/>
        <Route path='/signup/jobseeker/profile/:userId' element={<JobseekerProfile/>}/>
        <Route path='/signup/employer/profile/:userId' element={<EmployerProfile/>}/>
        <Route path="reset-password" element={<ResetPassword/>}/>
        <Route path='/employer/jobpost/*' element={<JobPost/>}>
          <Route path='createpost' element={<CreatePostForm/>}/>
          <Route path='posts/:employerId' element={<JobPostsByEmployer/>}/>
          <Route path='posts/viewapplicants/:jobId' element={<ViewApplicants/>}/>
        </Route>

        <Route path='/jobseeker/*' element={<JobSeekerSearch/>}> 
            <Route path='home' element={<JobseekerHome/>}/>
            <Route path="jobposts" element={<JobPostsForSeeker/>}/>
        </Route>

        <Route path='/jobseeker/applications/:seekerId' element={<JobApplication/>}/> 
        <Route path='/jobseeker/applications/apply/:jobId' element={<ApplicationForm/>}/>

      </Routes>
    </BrowserRouter>
  );
}

export default App;
