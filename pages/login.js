import { useState, useEffect } from 'react';
import Head from 'next/head';
import LoginCard from '../components/login';
import { useRouter } from 'next/router';
import arr from './api/data';
import Navbar from '../components/navbar';
import FlashMessage from '../components/flashmessage';
import Cookies from 'js-cookie';

export default function MyForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState();
  const [loginPage, setLoginPage] = useState(false);
  const [text, setText] = useState();
  const router = useRouter();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  useEffect(() => {
    if (sessionStorage.getItem('login-access') === arr) {
      router.push('/admin');
    }
  }, [router]);

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
        setLoginPage(true);
        if (data.jwt) {
          setText(['berhasil login', 'Anda akan diarahkan ke page admin']);
          sessionStorage.setItem('key-jwt', data.jwt.access_token);
          sessionStorage.setItem('role', data.data.roles);
          Cookies.set('myjwt', data.jwt.access_token);
          sessionStorage.setItem('login-access', arr);
          setTimeout(() => {
            setLoginPage(false);
            router.push('/admin');
          }, 5000);
        } else {
          setText([data.error, data.message, true]);
          setTimeout(() => {
            setLoginPage(false);
          }, 5000);
        }
      });
  };

  return (
    <>
      <Head>
        <title>Login</title>
      </Head>
      <Navbar />
      <FlashMessage isVisible={loginPage} text={text} />
      <LoginCard isLoading={isLoading} handleChange={handleChange} handleSubmit={handleSubmit} />
    </>
  );
}
