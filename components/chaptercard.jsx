import { useEffect, useRef, useState } from 'react';
import { songsdata } from '../components/music/audio';

export default function Chaptercard({ desc, title, number, isPlaying, onClick, id, setIsPlaying, mediaPath }) {
  const music = songsdata.filter((song, i) => i == id);
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
      audioElem.current.currentTime = 0;
    }
  }, [id, isPlaying]);

  const onPlaying = () => {
    const duration = audioElem.current.duration;
    const ct = audioElem.current.currentTime;
    let sec = Math.round(ct);

    setS((sec - (sec %= 60)) / 60 + (9 < sec ? ':' : ':0') + sec);
    if ((ct / duration) * 100 === 100) {
      setIsPlaying(!isPlaying);
    } else {
      setSongTime((ct / duration) * 100);
      console.log(songTime);
    }
  };

  return (
    <div className="rounded-2xl w-[300px] h-[230px] flex items-center flex-wrap justify-center bg-slate-700 relative text-center">
      <div className="text-white w-full">
        <h1>
          {number + 1} - {title}
        </h1>
        <p className="text-slate-400">{desc}</p>
      </div>
      <div className="w-full">
        <div className={`h-2 min-w-full bg-[#777777c7] rounded-full cursor-pointer ${isPlaying === id ? 'flex' : 'hidden'}`}>
          <div className={`h-full bg-[#260A8D] rounded-full`} style={{ width: `${songTime + '%'}` }}></div>
        </div>
        <div className={`text-white ${isPlaying === id ? 'flex' : 'hidden'} justify-center mt-3`}>
          <p>
            {s} - {dur}
          </p>
        </div>
      </div>
      <audio ref={audioElem} src={mediaPath || music[0].url} onTimeUpdate={onPlaying} />
      <i
        className={`fa-solid ${isPlaying === id ? 'fa-pause' : 'fa-play'} border-black text-white text-5xl shadow-xl cursor-pointer text-center group-hover:opacity-100 transition-all duration-300 `}
        onClick={() => {
          onClick(id, isPlaying === id);
        }}
      ></i>
    </div>
  );
}
