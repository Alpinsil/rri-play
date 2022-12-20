import { useRouter } from 'next/router';
import Head from 'next/head';
import arr from './api/data';
import Chaptercard from '../components/chaptercard';
import { useEffect, useState } from 'react';
import Image from 'next/image';

const Detail = () => {
  const [data, setData] = useState('');
  const [bookmark, setBookmark] = useState(false);
  const [isPlaying, setIsPlaying] = useState();
  const router = useRouter();
  useEffect(() => {
    setData(router.query);
    const storage = JSON.parse(localStorage.getItem('rri-audiobook-sumenep'));
    if (storage) {
      const isBookmark = storage.filter((data) => data.id == router.query.id);
      if (isBookmark.length) {
        setBookmark(true);
      } else {
        setBookmark(false);
      }
    }
  }, [router.query]);

  const onClickBookmark = (id) => {
    const storage = JSON.parse(localStorage.getItem('rri-audiobook-sumenep'));
    if (!storage) {
      const query = router.query;
      const data = [];
      data.push(query);
      localStorage.setItem('rri-audiobook-sumenep', JSON.stringify(data));
      setBookmark(!bookmark);
    } else {
      const newData = storage.filter((data) => data.id == id);
      if (newData.length) {
        const newData = storage.filter((data) => data.id != id);
        localStorage.setItem('rri-audiobook-sumenep', JSON.stringify(newData));
        setBookmark(!bookmark);
      } else {
        storage.push(router.query);
        console.log(storage);
        localStorage.setItem('rri-audiobook-sumenep', JSON.stringify(storage));
        setBookmark(!bookmark);
      }
    }
  };

  const onClickPlay = (id, IconPlay) => {
    const isPlayingData = arr.filter((ar) => ar.id === id);
    setIsPlaying(isPlayingData[0].id);
    if (IconPlay) {
      setIsPlaying(false);
    }
  };
  return (
    <div className="w-full">
      <Head>
        <title>Play {data.title || 'not found'}</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="relative w-full h-[311px] flex justify-center overflow-hidden">
        <div className="w-full h-full bg-black absolute z-10 opacity-50" />
        <Image src={data.thumbnail} alt={data.id} width={142} height={212} priority className="rounded-xl w-full h-[800px] absolute -bottom-10 blur-[2px]" />
        <div className="absolute mt-9 z-10 blur-none">
          <Image src={data.thumbnail} alt={data.id} width={142} height={212} priority className="rounded-xl" />
          <div className="flex justify-center gap-9 mt-7 text-white text-5xl">
            <i
              className={`fa-solid fa-bookmark ${bookmark && 'text-sky-800'}  cursor-pointer border-black`}
              onClick={() => {
                onClickBookmark(data.id);
              }}
            ></i>
          </div>
        </div>
      </div>
      <h1 className="text-white text-center text-3xl mt-3">{data.title}</h1>
      <p className="text-slate-400 text-center text-lg mt-3 mb-6">{data.desc}</p>

      <div className="w-full">
        <h2 className="text-white text-center text-2xl mt-12"> Chapter</h2>
        <div className="flex justify-center mt-7 gap-10 flex-wrap w-[800px] mx-auto">
          {arr.map((ar, i) => (
            <Chaptercard key={ar.id} number={i} title={ar.title} desc={ar.desc} onClick={onClickPlay} isPlaying={isPlaying} id={ar.id} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Detail;
