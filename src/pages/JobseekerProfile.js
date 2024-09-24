import SeekerProfileForm from "../components/jobseekerprofile/SeekerProfileForm";
import LoginHeader from "../components/login/LoginHeader";
import ProfileContent from "../components/jobseekerprofile/ProfileContent";
import { useParams } from 'react-router-dom';

const JobseekerProfile = () => {
    const { userId } = useParams();
    return(
        <div>
            <LoginHeader/>
            <ProfileContent/>
            <SeekerProfileForm userId={userId}/>
        </div>
    );
}

export default JobseekerProfile;
