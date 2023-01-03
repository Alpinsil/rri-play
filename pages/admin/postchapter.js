import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import arr from '../api/data';
import Navbar from '../../components/navbar';

export async function getServerSideProps(context) {
  const { query } = context;
  const { id } = query;
  return { props: { id } };
}

export default function MyForm(props) {
  const [sformData, setFormData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [postCreated, setPostCreated] = useState(false);
  const [error, setError] = useState();
  const router = useRouter();
  const { id } = props;

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
    const formData = new FormData();

    for (const [key, value] of Object.entries(sformData)) {
      formData.set(key, value);
    }

    const token = sessionStorage.getItem('key-jwt');

    fetch(`https://go-rriaudiobook-server-production.up.railway.app/api/books/${id}/chapters`, {
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
        if (data.message && data.message == 'Chapter Created') {
          setPostCreated(true);
          setTimeout(() => {
            setPostCreated(false);
          }, 5000);
        } else {
          setPostCreated(true);
          setError(`${data.message} ${data.error}`);
          setTimeout(() => {
            setPostCreated(false);
          }, 5000);
        }
      });
  };

  return (
    <>
      <Head>
        <title>Add New Chapter</title>
      </Head>
      <Navbar />

      <div className={`p-4 mb-4 text-sm mx-auto rounded-lg max-w-sm mt-4 ${postCreated ? 'opacity-100' : 'opacity-0'} transition-all duration-200 ${error ? 'bg-red-200 text-red-800' : 'bg-green-200 text-green-800'}`} role="alert">
        <span className="font-bold">{error || 'Berhasil Menambahkan Chapter'}</span>
      </div>
      <div className="w-full max-w-lg mx-auto justify-center  flex flex-wrap mt-16 relative ">
        <Link href={{ pathname: 'detail', query: { id } }} className="absolute text-white text-2xl -top-10 left-0 z-50 bg-sky-900 px-3 py-2 rounded-md hover:bg-sky-500 cursor-pointer">
          <i className="fa-solid fa-arrow-left"></i>
        </Link>
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
                onChange={handleChange}
                name={data.nama}
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
            <button type="submit">
              {isLoading ? (
                <button className="bg-blue-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline cursor-wait">
                  please wait &nbsp; <i className="fa-solid fa-spinner fa-spin-pulse fa-spin-reverse" disabled></i>
                </button>
              ) : (
                <button className="bg-blue-700 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                  submit
                </button>
              )}
            </button>
          </div>
        </form>
        <p className="text-center text-gray-500 text-xs">&copy;2022 RRI Sumenep. All rights reserved.</p>
      </div>
    </>
  );
}
