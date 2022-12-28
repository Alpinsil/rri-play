import { useState } from 'react';
import Head from 'next/head';
import LoginCard from '../components/login';
import { useRouter } from 'next/router';
import arr from './api/data';

export default function MyForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState();
  const router = useRouter();

  const handleChange = (event) => {
    const { name, value, files } = event.target;
    if (files) {
      setFormData((prevFormData) => ({ ...prevFormData, [name]: files[0] }));
    } else {
      setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
    }
  };

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
          sessionStorage.setItem('key-jwt', data.jwt.access_token);
          sessionStorage.setItem('login-access', arr);
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

      <LoginCard isLoading={isLoading} handleChange={handleChange} handleSubmit={handleSubmit} />
    </>
  );
}
