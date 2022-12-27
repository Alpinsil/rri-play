import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';

export default function MyForm(props) {
  const [sformData, setFormData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
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

  const handleSubmit = (event) => {
    event.preventDefault();
    setIsLoading(true);
    const { id } = router.query;
    const formData = new FormData();

    for (const [key, value] of Object.entries(sformData)) {
      formData.set(key, value);
    }

    fetch(`https://go-rriaudiobook-server-production.up.railway.app/api/books/${id}/chapters`, {
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
        <title>Add New Chapter</title>
      </Head>
      <Link href={{ pathname: 'detail', query: { id } }} className="fixed text-white text-2xl top-32 left-80 z-50 bg-sky-900 px-3 py-2 rounded-md hover:bg-sky-500 cursor-pointer">
        <i className="fa-solid fa-arrow-left"></i>
      </Link>
      <div className="w-full max-w-lg mx-auto flex flex-wrap mt-11">
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

MyForm.getInitialProps = async (ctx) => {
  const { query } = ctx;
  const { id } = query;

  return { id };
};
