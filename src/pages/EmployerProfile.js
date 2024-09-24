import LoginHeader from "../components/login/LoginHeader";
import ProfileContent from "../components/jobseekerprofile/ProfileContent";
import EmployerProfileForm from "../components/employerprofile/EmployerProfileForm";
import { useParams } from 'react-router-dom';

const EmployerProfile = () => {
    const { userId } = useParams();
    return(
        <div>
            <LoginHeader/>
            <ProfileContent/>
            <EmployerProfileForm userId={userId}/>
        </div>
    );
}

export default EmployerProfile;