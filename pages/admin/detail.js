import { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Formbook from '../../components/formbook';
import { useRouter } from 'next/router';
import arr from '../api/data';
import Navbar from '../../components/navbar';
import AdminChapter from '../../components/adminchapter';

export async function getServerSideProps(context) {
  const { query } = context;
  const { id } = query;
  const pros = await fetch(`https://go-rriaudiobook-server-production.up.railway.app/api/books/${id}`);
  const res = await pros.json();
  const data = res.data;
  return {
    props: {
      data,
      id,
    },
  };
}

export default function MyComponent(props) {
  const { data, id } = props;
  const [isLoading, setIsLoading] = useState(false);
  const [chapter, setChapter] = useState(data.chapters);
  const [sformData, setFormData] = useState({});
  const [title, setTitle] = useState(data.title);
  const [summary, setSummary] = useState(data.summary);
  const [isPlaying, setIsPlaying] = useState(false);
  const [category, setCategory] = useState(data.category);
  const [showModal, setShowModal] = useState();

  const content = { title, setTitle, summary, setSummary, category, setCategory };

  const router = useRouter();
  useEffect(() => {
    if (sessionStorage.getItem('login-access') !== arr) {
      router.push('/login');
    }
  }, [setChapter, data, router, chapter]);

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

    const token = sessionStorage.getItem('key-jwt');

    fetch(`https://go-rriaudiobook-server-production.up.railway.app/api/books/${id}/update`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        setIsLoading(false);
      });
  };

  const onClickPlay = (id, IconPlay) => {
    const isPlayingData = data.chapters ? data.chapters.filter((ar) => ar.id === id) : [];
    setIsPlaying(isPlayingData[0].id);
    if (IconPlay) {
      setIsPlaying(false);
    }
  };

  const handleDeleteClick = (id) => {
    const token = sessionStorage.getItem('key-jwt');
    fetch(`https://go-rriaudiobook-server-production.up.railway.app/api/books/${data.id}/chapters/${id}/delete`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((dat) => {
        const filter = data.chapters.filter((n) => n.id !== id);
        setChapter(filter);
        setShowModal(false);
      });
  };

  return (
    <>
      <Head>
        <title>edit detail</title>
      </Head>
      <Navbar />
      <div className="flex flex-wrap justify-center mx-auto mb-8">
        <Formbook content={content} isLoading={isLoading} handleSubmit={handleSubmit} handleChange={handleChange} data={data} />

        <div className="w-full">
          <h2 className="text-white text-center text-2xl mt-12">Chapter</h2>
          <Link href={{ pathname: '/admin/postchapter', query: { id } }}>
            <button className="px-4 py-3 bg-sky-900 text-white mt-3 mx-auto flex rounded-xl hover:bg-sky-600">Add New Chapter</button>
          </Link>
          <AdminChapter isPlaying={isPlaying} setIsPlaying={setIsPlaying} data={chapter} onClickPlay={onClickPlay} handleDeleteClick={handleDeleteClick} id={id} showModal={showModal} setShowModal={setShowModal} />
        </div>
      </div>
    </>
  );
}
