import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import arr from '../pages/api/data';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';

export default function Navbar() {
  const [navbarOpen, setNavbarOpen] = useState(false);
  const [login, setLogin] = useState(false);
  const navLinks = [
    { link: '/', nama: 'Beranda' },
    { link: '/bookmark', nama: 'Bookmark' },
  ];
  const router = useRouter();

  useEffect(() => {
    if (sessionStorage.getItem('login-access') === arr) {
      setLogin(true);
    }
  }, [setLogin]);
  const sosmed = [
    { hoverColor: 'group-hover:text-[#1DA1F2]', link: '/', icon: 'fa-twitter' },
    { hoverColor: 'group-hover:text-[#FF0000]', link: '/', icon: 'fa-youtube' },
    { hoverColor: 'group-hover:text-[#E1306C]', link: '/', icon: 'fa-instagram' },
  ];

  const handleClick = () => {
    Cookies.remove('myjwt');
    sessionStorage.removeItem('key-jwt');
    sessionStorage.removeItem('login-access');
    setLogin(false);
    router.push('/login');
  };

  return (
    <div className="flex justify-center w-full">
      <nav className="relative flex items-center lg:justify-evenly justify-between px-2 py-3 bg-[#191624] z-50 w-full">
        <Image src="/rri_logo.svg" width={138.91} height={83} alt="logo RRI" className="w-24" priority />
        <div className=" rounded-xl mx-auto relative lg:flex items-center hidden">
          <ul className="block lg:flex">
            {navLinks.map((nav) => (
              <li className="group" key={nav.nama}>
                <Link href={nav.link} className="text-lg text-white py-2 mx-8 group-hover:text-[#74b6ef] flex">
                  {nav.nama}
                </Link>
              </li>
            ))}
            <li className="group">
              <Link href={login ? '/admin' : '/login'} className="text-lg text-white py-2 mx-8 group-hover:text-[#74b6ef] flex">
                {login ? 'admin' : 'login'}
              </Link>
            </li>
            <li className={`group ${!login && 'hidden'}`}>
              <button className="text-lg text-white py-2 mx-8 group-hover:text-[#74b6ef] flex" onClick={() => handleClick()}>
                logout
              </button>
            </li>
          </ul>
        </div>
        <div className="self-center flex text-white items-center gap-2 lg:mr-6 ml-3 lg:ml-0 mr-2">
          <div className="flex gap-4 mr-3">
            {sosmed.map((n) => (
              <Link key={n.icon} href={n.link} className="group ">
                <i className={`fa-brands ${n.icon} text-white text-2xl ${n.hoverColor}`}></i>
              </Link>
            ))}
          </div>
          <button className="lg:hidden flex" onClick={() => setNavbarOpen(!navbarOpen)}>
            <i className="fa-solid fa-bars text-2xl"></i>
          </button>
        </div>
      </nav>

      <div className={`w-[233px] h-[185px] absolute bg-[#260A8D] right-[30px] top-[120px] ${navbarOpen ? 'flex' : 'hidden'} lg:hidden rounded-xl flex-wrap z-[99999] justify-center`}>
        <Link href="/">
          <div className="text-white flex gap-6 items-center mt-8 ml-[90px] cursor-pointer">
            <h4 className="font-Robotto text-xl">Beranda</h4>
            <i className="fa-solid fa-house text-xl"></i>
          </div>
        </Link>
        <Link href="/bookmark">
          <div className="text-white flex gap-6 items-center ml-[100px] cursor-pointer">
            <h4 className="font-Robotto text-xl">Favorit </h4>
            <i className="fa-solid fa-bookmark text-xl"></i>
          </div>
        </Link>
        <Link href={login ? '/admin' : '/login'}>
          <div className="text-white flex gap-6 items-center ml-[100px] cursor-pointer">
            <h4 className="font-Robotto text-xl">{login ? 'admin' : 'login'}</h4>
            <i className="fa-solid fa-user text-xl"></i>
          </div>
        </Link>
        <Link href="/login" className={`group ${!login && 'hidden'}`} onClick={() => handleClick()}>
          <div className="text-white flex gap-6 items-center ml-[100px] cursor-pointer">
            <h4 className="font-Robotto text-xl"> logout</h4>
            <i className="fa-solid fa-right-from-bracket"></i>
          </div>
        </Link>
      </div>
    </div>
  );
}
