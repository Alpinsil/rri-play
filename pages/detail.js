import { useEffect, useState } from 'react';
import Head from 'next/head';
import Navbar from '../components/navbar';
import DetailCard from '../components/detailcard';
import Chaptercardtwo from '../components/chaptercardtwo';

export async function getServerSideProps(context) {
  const { query } = context;
  const { id } = query;
  const url = context.req.headers.referer;
  const pros = await fetch(`https://go-rriaudiobook-server-production.up.railway.app/api/books/${id}`);
  const res = await pros.json();
  const data = res.data;
  if (data) {
    return { props: { data, id, url } };
  } else {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }
}

export default function MyComponent(props) {
  const { data, id } = props;
  const [bookmark, setBookmark] = useState();
  const [isPlaying, setIsPlaying] = useState();
  const [isSongPause, setIsSongPause] = useState(false);

  useEffect(() => {
    const storage = JSON.parse(localStorage.getItem('rri-audiobook-sumenep'));
    const bookmark = storage ? storage.filter((ar) => ar.id == id) : [];
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
    setIsSongPause([!IconPlay, isPlayingData[0].id]);
    console.log(isSongPause);
    if (IconPlay) {
      setIsPlaying(false);
    }
  };
  if (data) {
    return (
      <>
        <Head>
          <title>edit detail</title>
        </Head>
        <Navbar />

        <div className="flex flex-wrap justify-center mx-auto mb-8">
          <DetailCard onClickBookmark={onClickBookmark} data={data} bookmark={bookmark} />
          <div className="w-full">
            <h1 className="text-white text-2xl text-center mt-6 mb-3">List Chapters</h1>
            <ul className="w-full flex justify-center flex-wrap mb-11 gap-3">
              {data.chapters ? (
                data.chapters.map((ar, i) => <Chaptercardtwo title={ar.title} desc={ar.description} onClick={onClickPlay} isPlaying={isPlaying} id={ar.id} setIsPlaying={setIsPlaying} mediaPath={ar.media_path} key={ar.id} />)
              ) : (
                <div className="text-white text-center text-lg">Belum ada list chapter di Series ini</div>
              )}
            </ul>
          </div>
        </div>
      </>
    );
  } else {
    <>
      <Navbar />
      <div className="mt-4 text-white text-center text-2xl">Not found</div>;
    </>;
  }
}
