import { useState, useEffect } from 'react';
import Head from 'next/head';
import Formbook from '../../components/formbook';
import { useRouter } from 'next/router';
import arr from '../api/data';

export default function MyForm() {
  const [sformData, setFormData] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (event) => {
    const { name, value, files } = event.target;
    if (files) {
      setFormData((prevFormData) => ({ ...prevFormData, [name]: files[0] }));
    } else {
      setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
    }
  };

  const router = useRouter();

  useEffect(() => {
    if (sessionStorage.getItem('login-access') !== arr) {
      router.push('/login');
    }
  });

  const handleSubmit = (event) => {
    setIsLoading(true);
    event.preventDefault();
    const formData = new FormData();

    for (const [key, value] of Object.entries(sformData)) {
      formData.set(key, value);
    }

    const token = sessionStorage.getItem('key-jwt');

    fetch('https://go-rriaudiobook-server-production.up.railway.app/api/books', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setIsLoading(false);
      });
  };

  return (
    <>
      <Head>
        <title>Create new Book</title>
      </Head>

      <Formbook isLoading={isLoading} handleChange={handleChange} handleSubmit={handleSubmit} />
    </>
  );
}
