import { useState } from 'react';
import Head from 'next/head';
import Formbook from '../../components/formbook';

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

  const handleSubmit = (event) => {
    setIsLoading(true);
    event.preventDefault();
    const formData = new FormData();

    for (const [key, value] of Object.entries(sformData)) {
      formData.set(key, value);
    }

    fetch('https://go-rriaudiobook-server-production.up.railway.app/api/books', {
      method: 'POST',
      headers: {
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjb2RlIjoiVVBEMDAwMDEiLCJyb2xlIjoidXBsb2FkZXIiLCJleHAiOjE2NzIxNDY2NDF9.PXnt5vXolBU-KNNdoRY8J2GLLd9_nfjU9uR6LPOFi64',
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
