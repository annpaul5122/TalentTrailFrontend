import React from 'react';
import EmployerMenuBar from '../components/employerhome/EmployerMenuBar';
import EmployerSection from '../components/employerhome/EmployerSection';
import Footer from '../components/homepage/Footer'

const EmployerHome = () => {
    return (
        <div>
            <EmployerMenuBar/>
            <EmployerSection/>
            <Footer/>
        </div>
    );
}

export default EmployerHome;