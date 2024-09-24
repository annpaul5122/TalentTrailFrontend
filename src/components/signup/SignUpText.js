import React from 'react';

const SignUpText = ({ userType }) => {
    return(
       <h3 style={{textAlign: 'center',marginTop: '60px',marginBottom:'-30px',fontWeight: 'bold'}}>Sign up as {userType}</h3>
    );
}

export default SignUpText;