import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

export default function Cardcomp({ thumbnail, desc, title, id }) {
  const [error, setError] = useState(null);

  const handleError = () => {
    setError('An error occurred while loading the image');
  };

  const handleLoad = () => {
    setError(null);
  };

  return (
    <>
      <Link
        href={{
          pathname: '/detail',
          query: { id },
        }}
      >
        <div className="w-[193px] h-[345px] hover:scale-110 transition-all duration-200">
          <Image src={error ? '/Image_1.webp' : thumbnail} alt={id} width={170} height={273} className="rounded-xl w-[212px] h-[282px] " priority onError={handleError} onLoad={handleLoad} />

          <h2 className="text-base lg:text-xl text-white ml-2">{title}</h2>
          <p className="text-sm lg:text-base text-[#8F8E8E] truncate">{desc}</p>
        </div>
      </Link>
    </>
  );
}
