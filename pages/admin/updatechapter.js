import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import arr from '../api/data';
import Navbar from '../../components/navbar';
import Link from 'next/link';
import FlashMessage from '../../components/flashmessage';

export async function getServerSideProps(context) {
  const { query } = context;
  const { bookId, chapterId } = query;
  const pros = await fetch(`https://go-rriaudiobook-server-production.up.railway.app/api/books/${bookId}`);
  const res = await pros.json();
  const dat = res.data.chapters.filter((ar) => ar.id === parseInt(chapterId))[0];
  const data = dat || false;

  return { props: { data, bookId } };
}

export default function MyForm({ data, bookId }) {
  const [sformData, setFormData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [title, setTitle] = useState(data.title);
  const [description, setDescription] = useState(data.description);
  const [isVisible, setIsVisible] = useState();
  const [text, setText] = useState();
  const router = useRouter();

  const form = [
    { nama: 'title', type: 'text' },
    { nama: 'description', type: 'text' },
  ];

  const handleChange = (event) => {
    const { name, value, files } = event.target;
    if (files) {
      setFormData((prevFormData) => ({ ...prevFormData, [name]: files[0] }));
    } else {
      setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
    }
  };

  useEffect(() => {
    if (sessionStorage.getItem('login-access') !== arr) {
      router.push('/login');
    }
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    setIsLoading(true);
    const form = document.querySelector('form');
    const formData = new FormData(form);

    for (const [key, value] of Object.entries(sformData)) {
      formData.set(key, value);
    }

    const token = sessionStorage.getItem('key-jwt');

    fetch(`https://go-rriaudiobook-server-production.up.railway.app/api/books/${bookId}/chapters/${data.id}/update`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setIsLoading(false);
        setIsVisible(true);
        setText([data.message, '']);
        setTimeout(() => {
          setIsVisible(false);
        }, 3000);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <Head>
        <title>Edit Chapter</title>
      </Head>
      <Navbar />
      <FlashMessage isVisible={isVisible} text={text} className="w-full" />
      <div className="w-full max-w-lg mx-auto justify-center flex flex-wrap mt-7 relative">
        <div className="text-white cursor-pointer bg-blue-700 absolute px-4 -left-12 py-2 rounded-xl text-xl hover:bg-sky-400" onClick={() => router.back()}>
          <i className="fa-solid fa-arrow-left"></i>
        </div>
        <form className="bg-[#191624] shadow-md rounded-lg px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit}>
          {form.map((data) => (
            <div className="mb-4" key={data.nama}>
              <label className="block text-white text-sm tracking-widest font-bold mb-2 capitalize" htmlFor={data.nama}>
                {data.alias || data.nama}
              </label>
              <input
                className={`shadow appearance-none border rounded w-full py-2 px-3  ${data.nama === 'media_path' ? 'text-white' : 'text-black'} leading-tight focus:outline-none focus:shadow-outline`}
                id={data.nama}
                type={data.type}
                placeholder={data.alias || data.nama}
                autoComplete="off"
                onChange={data.nama === 'title' ? (e) => setTitle(e.target.value) : (e) => setDescription(e.target.value)}
                onKeyUp={handleChange}
                name={data.nama}
                value={data.nama === 'title' ? title : description}
                required
              />
            </div>
          ))}
          <div className="mb-4">
            <label className="block text-white text-sm tracking-widest font-bold mb-2 capitalize" htmlFor="media_path">
              Media Path
            </label>
            <input className={`shadow appearance-none border rounded w-full py-2 px-3  text-white leading-tight focus:outline-none focus:shadow-outline`} id="media_path" type="file" placeholder="Media Path" autoComplete="off" onChange={handleChange} name="media_path" accept="audio/*" required />
          </div>

          <div className="flex items-center justify-between">
            <button className="hover:bg-blue-500 bg-sky-900 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
              {isLoading ? 'please wait' : 'update'} &nbsp; <i className={`fa-solid fa-spinner fa-spin-pulse fa-spin-reverse ${!isLoading && 'hidden'}`}></i>
            </button>
          </div>
        </form>
        <p className="text-center text-gray-500 text-xs">&copy;2022 RRI Sumenep. All rights reserved.</p>
      </div>
    </>
  );
}
