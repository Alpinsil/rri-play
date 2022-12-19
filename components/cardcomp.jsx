import Image from 'next/image';
import Link from 'next/link';

export default function Cardcomp({ thumbnail, desc, title, id }) {
  return (
    <>
      <Link href={`detail?id=${id}`}>
        <div className="w-[193px] h-[345px] hover:scale-110 transition-all duration-200">
          <Image src={thumbnail} alt={id} width={170} height={273} className="rounded-xl w-auto h-auto" priority />
          <h2 className="text-base lg:text-xl text-white ml-2">{title}</h2>
          <p className="text-sm lg:text-base text-[#8F8E8E] truncate">{desc}</p>
        </div>
      </Link>
    </>
  );
}
