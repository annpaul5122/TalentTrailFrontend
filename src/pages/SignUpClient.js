import Header from "../components/signup/Header";
import SignUpForm from "../components/signup/SignUpForm";
import SignUpText from "../components/signup/SignUpText";
import { useLocation } from 'react-router-dom';

function SignUpClient() {
  const location = useLocation();
  const userType = location.pathname.includes('client') ? 'Client' : 'Jobseeker';
  return (
    <div>
      <Header userType={userType}/>
      <SignUpText userType={userType}/>
      <SignUpForm />
    </div>
  );
}

export default SignUpClient;