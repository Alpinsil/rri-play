import { useState } from 'react';

export default function Chaptercard({ desc, title, number, isPlaying, onClick, id }) {
  return (
    <div className="rounded-2xl w-[300px] h-[130px] flex items-center flex-wrap justify-center bg-slate-700 mb-36 relative text-center">
      <div className="text-white w-full">
        <h1>
          {number + 1} - {title}
        </h1>
        <p className="text-slate-400">{desc}</p>
      </div>
      <i
        className={`fa-solid ${isPlaying == id ? 'fa-pause' : 'fa-play'} border-black text-white text-5xl shadow-xl cursor-pointer text-center group-hover:opacity-100 transition-all duration-300 `}
        onClick={() => {
          onClick(id, isPlaying == id);
        }}
      ></i>
    </div>
  );
}
