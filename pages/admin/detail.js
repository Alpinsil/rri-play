import { useState, useEffect } from 'react';
import Head from 'next/head';
import Chaptercard from '../../components/chaptercard';
import Link from 'next/link';
import Formbook from '../../components/formbook';
import { useRouter } from 'next/router';
import arr from '../api/data';

export default function MyComponent(props) {
  const { data, id } = props;
  const [isLoading, setIsLoading] = useState(false);
  const [sformData, setFormData] = useState({});
  const [title, setTitle] = useState(data.title);
  const [summary, setSummary] = useState(data.summary);
  const [isPlaying, setIsPlaying] = useState(false);
  const [category, setCategory] = useState(data.category);

  const content = { title, setTitle, summary, setSummary, category, setCategory };

  const router = useRouter();
  useEffect(() => {
    if (sessionStorage.getItem('login-access') !== arr) {
      router.push('/login');
    }
  });

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
      .then((data) => {
        console.log(data);
        router.reload();
      });
  };

  return (
    <>
      <Head>
        <title>edit detail</title>
      </Head>

      <div className="flex flex-wrap justify-center mx-auto mb-8">
        <Formbook content={content} isLoading={isLoading} handleSubmit={handleSubmit} handleChange={handleChange} />

        <div className="w-full">
          <h2 className="text-white text-center text-2xl mt-12">Chapter</h2>
          <Link href={{ pathname: '/admin/postchapter', query: { id } }}>
            <button className="px-4 py-3 bg-sky-900 text-white mt-3 mx-auto flex rounded-xl hover:bg-sky-600">Add New Chapter</button>
          </Link>
          <div className="flex justify-center mt-7 gap-10 flex-wrap w-full mx-auto mb-8">
            {data.chapters ? (
              data.chapters.map((ar, i) => (
                <div key={ar.id} className="relative">
                  <Chaptercard number={i} title={ar.title} desc={ar.desc} onClick={onClickPlay} isPlaying={isPlaying} id={ar.id} setIsPlaying={setIsPlaying} mediaPath={ar.media_path} />
                  <div className="absolute top-1 right-4 flex  gap-2">
                    <button className="text-white bg-red-800 hover:bg-red-600 rounded-lg px-3 py-2 order-2  " onClick={() => handleDeleteClick(ar.id)}>
                      <i className="fa-solid fa-trash"></i>
                    </button>
                    <Link
                      href={{
                        pathname: '/admin/updatechapter',
                        query: { bookId: id, chapterId: ar.id },
                      }}
                      className="text-white bg-sky-800 hover:bg-sky-600 rounded-lg px-3 py-2   "
                    >
                      <i className="fa-solid fa-edit"></i>
                    </Link>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-white text-center text-lg">Belum ada list chapter di Series ini</div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

MyComponent.getInitialProps = async (ctx) => {
  const { query } = ctx;
  const { id } = query;
  const pros = await fetch(`https://go-rriaudiobook-server-production.up.railway.app/api/books/${id}`);
  const res = await pros.json();
  const data = res.data;

  return { data, id };
};
