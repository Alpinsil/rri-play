import { useState, useEffect, useRef } from 'react';

export default function Chaptercardtwo({ desc, title, isPlaying, onClick, id, setIsPlaying, mediaPath }) {
  const audioElem = useRef();
  let [s, setS] = useState('0:00');
  const [dur, setDur] = useState('0:00');

  useEffect(() => {
    if (isPlaying && isPlaying === id) {
      audioElem.current.play();
    } else {
      audioElem.current.pause();
    }
  }, [id, isPlaying]);

  const onPlaying = () => {
    let se = Math.round(audioElem.current.duration);
    setDur((se - (se %= 60)) / 60 + (9 < se ? ':' : ':0') + se);
    const duration = audioElem.current.duration;
    const ct = audioElem.current.currentTime;
    let sec = Math.round(ct);

    setS((sec - (sec %= 60)) / 60 + (9 < sec ? ':' : ':0') + sec);
    if ((ct / duration) * 100 === 100) {
      setIsPlaying(!isPlaying);
    }
  };
  return (
    <>
      <li className="w-full text-white relative bg-black bg-opacity-60 rounded-lg hover:scale-105 transition duration-200 flex gap-6 items-center max-w-3xl">
        <i
          className={`fa-solid ${isPlaying === id ? 'fa-circle-pause' : 'fa-circle-play'} hover:scale-110 duration-200 transition cursor-pointer text-3xl ml-4`}
          onClick={() => {
            onClick(id, isPlaying === id);
          }}
        ></i>
        <div>
          <h3 className="text-xl">{title}</h3>
          <h4 className="text-gray-400">{desc}</h4>
        </div>
        <div className="text-white flex mt-3 absolute right-6 top-0">
          <audio ref={audioElem} src={mediaPath} onTimeUpdate={onPlaying} />
          <p>
            {s} - {dur}
          </p>
        </div>
      </li>
    </>
  );
}
