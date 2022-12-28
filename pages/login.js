import { useState, useEffect } from 'react';
import Head from 'next/head';
import LoginCard from '../components/login';
import { useRouter } from 'next/router';
import arr from './api/data';
import Navbar from '../components/navbar';

export default function MyForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState();
  const [loginPage, setLoginPage] = useState(false);
  const router = useRouter();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  useEffect(() => {
    if (sessionStorage.getItem('login-access') === arr) {
      router.push('/admin');
    }
  });

  const handleSubmit = (event) => {
    setIsLoading(true);
    event.preventDefault();

    fetch('https://go-rriaudiobook-server-production.up.railway.app/api/login', {
      method: 'POST',
      body: JSON.stringify(formData),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setIsLoading(false);
        if (data.jwt) {
          setLoginPage(false);
          sessionStorage.setItem('key-jwt', data.jwt.access_token);
          sessionStorage.setItem('login-access', arr);
          setLoginPage(true);
          router.push('/admin');
        } else {
          console.log(data);
        }
      });
  };

  return (
    <>
      <Head>
        <title>Login</title>
      </Head>
      <Navbar />
      <LoginCard isLoading={isLoading} handleChange={handleChange} handleSubmit={handleSubmit} />
    </>
  );
}
