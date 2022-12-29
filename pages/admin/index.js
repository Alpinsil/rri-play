import Image from 'next/image';
import Head from 'next/head';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import arr from '../api/data';
import { useRouter } from 'next/router';
import Navbar from '../../components/navbar';

export async function getServerSideProps() {
  const res = await fetch('https://go-rriaudiobook-server-production.up.railway.app/api/books');
  const books = await res.json();
  return {
    props: { books },
  };
}

export default function Index({ books }) {
  const router = useRouter();
  const [error, setError] = useState();
  const [id, setId] = useState();

  useEffect(() => {
    if (sessionStorage.getItem('login-access') !== arr) {
      router.push('/login');
    }
  });

  const { data } = books;
  const [isLoading, setIsLoading] = useState(false);

  const handleDelete = async (id) => {
    const token = sessionStorage.getItem('key-jwt');
    setIsLoading(id);
    if (id) {
      try {
        const res = await fetch(`https://go-rriaudiobook-server-production.up.railway.app/api/books/${id}/delete`, {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (res) {
          console.log(res);
          setIsLoading(false);
        } else {
          throw new Error('An error occurred while deleting the resource');
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleError = () => {
    setError('An error occurred while loading the image');
  };

  const handleLoad = () => {
    setError(null);
  };

  return (
    <>
      <Head>
        <title>Admin Page</title>
      </Head>
      <Navbar />
      <Link href="/admin/post">
        <button className="px-4 py-3 bg-sky-900 text-white mt-3 mx-auto flex rounded-xl hover:bg-sky-600">Create New Audiobook</button>
      </Link>
      <div className="w-full mx-auto flex gap-6 mt-4 justify-center mb-4 flex-wrap">
        {data ? (
          data.map((book) => (
            <div className="max-w-sm w-full lg:w-1/2 border  rounded-lg shadow-md bg-gray-800 border-gray-700 flex items-center flex-wrap" key={book.id}>
              <Image className="rounded-t-lg mx-auto h-[100px] w-[80px]" src={error ? '/Image_1.webp' : book.cover_image} alt={book.title} width={100} height={150} onError={handleError} onLoad={handleLoad} />
              <div className="p-5">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{book.title}</h5>
                <p className="mb-3 font-normal text-gray-400">{book.category}</p>
                <Link
                  href={{
                    pathname: '/admin/detail',
                    query: { id: book.id },
                  }}
                  className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300"
                >
                  Edit Book &nbsp; <i className="fa-solid fa-arrow-right"></i>
                </Link>
                <button className="ml-5 inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-red-700 rounded-lg hover:bg-red-800 focus:outline-none" onClick={() => handleDelete(book.id)}>
                  {isLoading == book.id ? 'please wait' : 'delete'}
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-white text-2xl"> List buku tidak ditemukan</p>
        )}
      </div>
    </>
  );
}
