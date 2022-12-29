import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';

export default function Chaptercardtwo({ desc, title, isPlaying, onClick, id, setIsPlaying, mediaPath, isSongPause }) {
  const [songTime, setSongTime] = useState(0);
  const audioElem = useRef();
  let [s, setS] = useState('0:00');
  const [dur, setDur] = useState('0:00');

  useEffect(() => {
    let sec = Math.round(audioElem.current.duration);
    setDur((sec - (sec %= 60)) / 60 + (9 < sec ? ':' : ':0') + sec);
    if (isPlaying && isPlaying === id) {
      audioElem.current.play();
    } else {
      audioElem.current.pause();
    }
  }, [id, isPlaying, isSongPause]);

  const onPlaying = () => {
    const duration = audioElem.current.duration;
    const ct = audioElem.current.currentTime;
    let sec = Math.round(ct);

    setS((sec - (sec %= 60)) / 60 + (9 < sec ? ':' : ':0') + sec);
    if ((ct / duration) * 100 === 100) {
      setIsPlaying(!isPlaying);
    } else {
      setSongTime((ct / duration) * 100);
    }
  };
  return (
    <div className={`bg-gray-900 shadow-lg rounded p-3 w-[300px] mx-auto mb-7`}>
      <div className="group relative">
        <Image className="w-full md:w-72 block rounded" src="/music.png" alt="dsaads" width={300} height={300} />
        <div className={`absolute bg-black rounded ${isPlaying === id ? 'bg-opacity-60' : 'bg-opacity-0'}  group-hover:bg-opacity-60 w-full h-full top-0 flex items-center group-hover:opacity-100 transition justify-evenly`}>
          <button className={`hover:scale-110 text-white ${isPlaying === id ? 'opacity-100' : 'opacity-0 group-hover:translate-y-0 translate-y-3'} transform text-4xl   group-hover:opacity-100 transition`}>
            <i
              className={`fa-solid ${isPlaying === id ? 'fa-circle-pause' : 'fa-circle-play'} `}
              onClick={() => {
                onClick(id, isPlaying === id);
              }}
            ></i>
          </button>
        </div>
      </div>
      <div className="w-full mt-3">
        <div className={`h-2 min-w-full bg-[#777777c7] rounded-full cursor-pointer ${isPlaying === id ? 'flex' : 'hidden'}`}>
          <div className={`h-full bg-[#260A8D] rounded-full`} style={{ width: `${songTime + '%'}` }}></div>
        </div>
        <div className={`text-white ${isPlaying === id ? 'flex' : 'hidden'} justify-center mt-3`}>
          <audio ref={audioElem} src={mediaPath} onTimeUpdate={onPlaying} />
          <p>
            {s} - {dur}
          </p>
        </div>
      </div>
      <div className="p-5">
        <h3 className="text-white text-lg">{title}</h3>
        <p className="text-gray-400">{desc}</p>
      </div>
    </div>
  );
}
