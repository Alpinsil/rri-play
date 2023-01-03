import Head from 'next/head';
import Cardcomp from '../components/cardcomp';
import { useEffect, useState } from 'react';
import Navbar from '../components/navbar';

export default function Bookmark() {
  const [data, setData] = useState('');
  useEffect(() => setData(JSON.parse(localStorage.getItem('rri-audiobook-sumenep')) || []), [setData]);
  return (
    <>
      <Head>
        <title>RRI Bookmarks</title>
      </Head>
      <Navbar />
      {!data.length ? (
        <div>
          <h1 className="text-white text-center text-2xl mt-6">Maaf anda tidak memiliki list bookmark</h1>
        </div>
      ) : (
        <div className="flex justify-center mt-7 gap-10 flex-wrap w-full mx-auto">
          {data.map((ar) => (
            <Cardcomp key={ar.id} thumbnail={ar.cover_image} title={ar.title} id={ar.id} desc={ar.category} />
          ))}
        </div>
      )}
    </>
  );
}
