import Image from 'next/image';
import Head from 'next/head';
import Link from 'next/link';
import { useState } from 'react';

export const getStaticProps = async () => {
  const res = await fetch('https://go-rriaudiobook-server-production.up.railway.app/api/books');
  const books = await res.json();

  return {
    props: { books },
  };
};

export default function Index({ books }) {
  const { data } = books;
  const [isLoading, setIsLoading] = useState(false);

  const handleDelete = async (id) => {
    setIsLoading(true);
    if (id) {
      try {
        const res = await fetch(`https://go-rriaudiobook-server-production.up.railway.app/api/books/${id}/delete`, {
          method: 'DELETE',
          headers: {
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjb2RlIjoiVVBEMDAwMDEiLCJyb2xlIjoidXBsb2FkZXIiLCJleHAiOjE2NzIxNDY2NDF9.PXnt5vXolBU-KNNdoRY8J2GLLd9_nfjU9uR6LPOFi64',
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

  return (
    <>
      <Head>
        <title>{data[0].title}</title>
      </Head>
      <Link href="/admin/post">
        <button className="px-4 py-3 bg-sky-900 text-white mt-3 mx-auto flex rounded-xl hover:bg-sky-600">Create New Audiobook</button>
      </Link>
      <div className="w-full mx-auto flex gap-6 mt-4 justify-center mb-4 flex-wrap">
        {data.map((book) => (
          <div className="max-w-sm w-full lg:w-1/2 border  rounded-lg shadow-md bg-gray-800 border-gray-700 flex items-center flex-wrap" key={book.id}>
            <Image className="rounded-t-lg mx-auto h-[100px] w-[80px]" src={book.cover_image || '/Image_1.webp'} alt={book.title} width={100} height={150} />
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
              <button className="ml-5 inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-red-700 rounded-lg hover:bg-red-800 focus:outline-none" onClick={() => handleDelete(book.id || false)}>
                {isLoading ? 'please wait' : 'delete'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
