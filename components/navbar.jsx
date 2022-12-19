import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function Navbar() {
  const [navbarOpen, setNavbarOpen] = useState(false);
  return (
    <>
      <nav className="relative flex items-center justify-evenly px-2 py-3 bg-[#191624] mb-3">
        <Image src="/rri_logo.svg" width={138.91} height={83} alt="logo RRI" className="w-24" />
        <div className="bg-[#d9d9d91a] w-[627px] h-[46px] rounded-xl mx-auto relative flex">
          <i className="fa-solid fa-magnifying-glass text-white lg:text-2xl text-lg ml-4 mt-2"></i>
          <input type="text" className="border-none bg-transparent w-[97%] h-full outline-none pl-3 rounded-xl text-white lg:text-xl text-md " />
        </div>
        <div className="self-center flex text-white items-center gap-2 lg:mr-6 ml-3 lg:ml-0 mr-2">
          <h4 className="hidden lg:block">Hello Alvin</h4>
          <div className="lg:w-[43px] w-[25px] h-[25px] lg:h-[43px] bg-[#D9D9D9] lg:rounded-full cursor-pointer hidden lg:flex" onClick={() => setNavbarOpen(!navbarOpen)}></div>
          <button className="lg:hidden flex" onClick={() => setNavbarOpen(!navbarOpen)}>
            <i className="fa-solid fa-bars text-2xl"></i>
          </button>
        </div>
      </nav>
      <div className={`w-[233px] h-[185px] absolute bg-[#260A8D] right-[30px] top-[120px] ${navbarOpen ? 'flex' : 'hidden'} rounded-xl flex-wrap`}>
        <Link href="/">
          <div className="text-white flex gap-6 items-center absolute mt-8 ml-[90px] cursor-pointer">
            <h4 className="font-Robotto text-xl">Beranda</h4>
            <i className="fa-solid fa-house text-xl"></i>
          </div>
        </Link>
        <Link href="/bookmark">
          <div className="text-white flex gap-6 items-center absolute mt-[108px] ml-[100px] cursor-pointer">
            <h4 className="font-Robotto text-xl">Favorit </h4>
            <i className="fa-solid fa-bookmark text-xl"></i>
          </div>
        </Link>
      </div>
    </>
  );
}
