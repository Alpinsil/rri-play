import { useEffect, useState } from 'react';
import Head from 'next/head';
import Chaptercard from '../components/chaptercard';
import Link from 'next/link';
import Image from 'next/image';

export default function MyComponent(props) {
  const { data, id } = props;
  const [error, setError] = useState();
  const [bookmark, setBookmark] = useState();
  const [isPlaying, setIsPlaying] = useState();

  const handleError = () => {
    setError('An error occurred while loading the image');
  };

  const handleLoad = () => {
    setError(null);
  };

  useEffect(() => {
    const storage = JSON.parse(localStorage.getItem('rri-audiobook-sumenep'));
    const bookmark = storage.filter((ar) => ar.id == id);
    if (bookmark.length) {
      setBookmark(true);
    }
  }, [id, setBookmark]);

  const onClickBookmark = (id, book) => {
    const storage = JSON.parse(localStorage.getItem('rri-audiobook-sumenep'));
    if (!storage) {
      const data = [];
      data.push(book);
      localStorage.setItem('rri-audiobook-sumenep', JSON.stringify(data));
      setBookmark(!bookmark);
    } else {
      const newData = storage.filter((data) => data.id == id);
      if (newData.length) {
        const newData = storage.filter((data) => data.id != id);
        localStorage.setItem('rri-audiobook-sumenep', JSON.stringify(newData));
        setBookmark(!bookmark);
      } else {
        storage.push(book);
        console.log(storage);
        localStorage.setItem('rri-audiobook-sumenep', JSON.stringify(storage));
        setBookmark(!bookmark);
      }
    }
  };

  const onClickPlay = (id, IconPlay) => {
    const isPlayingData = data.chapters ? data.chapters.filter((ar) => ar.id === id) : [];
    setIsPlaying(isPlayingData[0].id);
    if (IconPlay) {
      setIsPlaying(false);
    }
  };

  const handleDeleteClick = (id) => {
    const hello = data.id;
    fetch(`https://go-rriaudiobook-server-production.up.railway.app/api/books/${data.id}/chapters/${id}/delete`, {
      method: 'DELETE',
      headers: {
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjb2RlIjoiVVBEMDAwMDEiLCJyb2xlIjoidXBsb2FkZXIiLCJleHAiOjE2NzIxNDY2NDF9.PXnt5vXolBU-KNNdoRY8J2GLLd9_nfjU9uR6LPOFi64',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        console.log(hello + '___' + id);
      });
  };

  return (
    <>
      <Head>
        <title>edit detail</title>
      </Head>

      <div className="flex flex-wrap justify-center mx-auto mb-8">
        <div className="relative w-full h-[331px] flex justify-center overflow-hidden">
          <div className="w-full h-full bg-black absolute z-10 opacity-50" />
          <Image src={error ? '/Image_1.webp' : data.cover_image} alt={data.id} width={142} height={212} priority className="rounded-xl w-full h-[800px] absolute -bottom-10 blur-[2px]" onLoad={handleLoad} onError={handleError} />
          <div className="absolute mt-9 z-10 blur-none">
            <Image src={error ? '/Image_1.webp' : data.cover_image} alt={data.id} width={142} height={212} priority className="rounded-xl w-[150px] h-[210px]" />
            <div className="flex justify-center mt-2 gap-9 text-white text-5xl">
              <i
                className={`fa-solid fa-bookmark ${bookmark && 'text-sky-800'}  cursor-pointer border-black`}
                onClick={() => {
                  onClickBookmark(data.id, data);
                }}
              ></i>
            </div>
          </div>
        </div>
        <h1 className="text-white text-center text-3xl mt-3">{data.title}</h1>
        <p className="text-slate-400 text-center text-lg mt-3 mb-6">{data.desc}</p>

        <div className="w-full">
          <div className="flex justify-center mt-7 gap-10 flex-wrap w-full mx-auto mb-8">
            {data.chapters ? (
              data.chapters.map((ar, i) => (
                <div key={ar.id} className="relative">
                  <Chaptercard number={i} title={ar.title} desc={ar.desc} onClick={onClickPlay} isPlaying={isPlaying} id={ar.id} setIsPlaying={setIsPlaying} mediaPath={ar.media_path} />
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
