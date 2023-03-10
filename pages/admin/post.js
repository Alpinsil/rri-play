import { useState, useEffect } from 'react';
import Head from 'next/head';
import Formbook from '../../components/formbook';
import { useRouter } from 'next/router';
import arr from '../api/data';
import Navbar from '../../components/navbar';
import FlashMessage from '../../components/flashmessage';

export async function getServerSideProps(context) {
  const cat = await fetch('https://go-rriaudiobook-server-production.up.railway.app/api/categories');
  const categoriest = await cat.json();
  return {
    props: { categoriest },
  };
}

export default function MyForm(props) {
  const [sformData, setFormData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [text, setText] = useState(false);

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
        if (data.message === 'Book Created') {
          setIsVisible(true);
          setText(['Sukses menambahkan buku baru']);
          setTimeout(() => {
            setIsVisible(false);
            router.back();
          }, 3000);
        }
        if (data.error) {
          setIsVisible(true);
          setText([data.error.title, 'periksa inputan', true]);
          setTimeout(() => {
            setIsVisible(false);
          }, 3000);
        }
      });
  };

  return (
    <>
      <Head>
        <title>Create new Book</title>
      </Head>

      <Navbar />

      <FlashMessage isVisible={isVisible} text={text} />

      <Formbook isLoading={isLoading} handleChange={handleChange} handleSubmit={handleSubmit} categoriest={props.categoriest} />
    </>
  );
}
