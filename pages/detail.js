import { useEffect, useState } from 'react';
import Head from 'next/head';
import Navbar from '../components/navbar';
import DetailCard from '../components/detailcard';
import Chaptercardtwo from '../components/chaptercardtwo';

export async function getServerSideProps(context) {
  const { query } = context;
  const { id } = query;
  const pros = await fetch(`https://go-rriaudiobook-server-production.up.railway.app/api/books/${id}`);
  const res = await pros.json();
  const data = res.data;

  return { props: { data, id } };
}

export default function MyComponent(props) {
  const { data, id } = props;
  console.log(data);
  const [bookmark, setBookmark] = useState();
  const [isPlaying, setIsPlaying] = useState();
  const [isSongPause, setIsSongPause] = useState(false);

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
    setIsSongPause([!IconPlay, isPlayingData[0].id]);
    console.log(isSongPause);
    if (IconPlay) {
      setIsPlaying(false);
    }
  };

  return (
    <>
      <Head>
        <title>edit detail</title>
      </Head>
      <Navbar />

      <div className="flex flex-wrap justify-center mx-auto mb-8">
        <DetailCard onClickBookmark={onClickBookmark} data={data} bookmark={bookmark} />
        <div className="w-full">
          <div className="flex justify-center mt-7 gap-10 flex-wrap w-full mx-auto mb-8">
            {data.chapters ? (
              data.chapters.map((ar, i) => (
                <div key={ar.id} className="relative">
                  <Chaptercardtwo title={ar.title} desc={ar.description} onClick={onClickPlay} isPlaying={isPlaying} id={ar.id} setIsPlaying={setIsPlaying} mediaPath={ar.media_path} isSongChange={isSongPause} />
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
