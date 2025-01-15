import React from 'react';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { googleLogin } from '../Redux/Slices/AuthSlice';


const GoogleLoginButton = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch();

  const handleSuccess = (response) => {
    console.log('Google login success:', response);
    const { credential } = response;

    // Send the Google token to your Django backend
    // axios
    // .post('http://localhost:8000/account/auth/google/', { token: credential })
    // .then((res) => {
    //   console.log('Backend response:', res.data);
      
    //   if (res.data.success) {
    //     localStorage.setItem('accessToken', res.data.accessToken);

    //     navigate('/profile');  
    //   } else {
    //     console.error('Login failed:', res.data.message);
    //   }
    // })
    // .catch((error) => {
    //   console.error('Error:', error);
    // });
    dispatch(googleLogin(credential))
    .unwrap()
    .then((result)=>{
      if(result){
        navigate('/profile')
      }
    })

    
  };

  // Handle login failure
  const handleError = (error) => {
    console.error('Google login failed:', error);
  };

  return (
    <GoogleOAuthProvider clientId="992575528386-6sshb7vskeimkll0aj9b58r0hoa5deme.apps.googleusercontent.com">
      <GoogleLogin
        onSuccess={handleSuccess}
        onError={handleError}
      />
    </GoogleOAuthProvider>
  );
};

export default GoogleLoginButton;
