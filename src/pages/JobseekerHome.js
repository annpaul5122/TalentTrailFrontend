import Menubar from "../components/jobseekermain.js/Menubar";
import JobseekerSection from "../components/jobseekermain.js/JobseekerSection";
import Resumetip from "../components/jobseekermain.js/Resumetip";
import Footer from "../components/homepage/Footer";

const JobseekerHome = () => {
    return(
        <div>
            <Menubar/>
            <JobseekerSection/>
            <Resumetip/>
            <Footer/>
        </div>
    )
}

export default JobseekerHome;