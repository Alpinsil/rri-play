import Image from 'next/image';
import { useState } from 'react';

export default function DetailCard({ data, onClickBookmark, bookmark }) {
  const [error, setError] = useState();

  const handleError = () => {
    setError('An error occurred while loading the image');
  };

  const handleLoad = () => {
    setError(null);
  };
  return (
    <>
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
      <div className=''>
        <h1 className="text-white text-center text-3xl mt-3">{data.title}</h1>
        <p className="text-slate-400 text-center text-lg mt-3 mb-6 block">{data.summary}</p>
      </div>
    </>
  );
}
