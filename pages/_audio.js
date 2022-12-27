import Player from '../components/music/Player';
import { songsdata } from '../components/music/audio';
import { useRef, useState, useEffect } from 'react';

export default function Audio() {
  const [songs, setSongs] = useState(songsdata);
  const [isplaying, setisplaying] = useState(false);
  const [currentSong, setCurrentSong] = useState(songsdata[1]);

  const audioElem = useRef();

  useEffect(() => {
    if (isplaying) {
      audioElem.current.play();
    } else {
      audioElem.current.pause();
    }
  }, [isplaying]);

  const onPlaying = () => {
    const index = songs.findIndex((x) => x.title === currentSong.title);
    const duration = audioElem.current.duration;
    const ct = audioElem.current.currentTime;
    if ((ct / duration) * 100 === 100) {
      setCurrentSong(songs[index + 1]);
      setisplaying(!isplaying);
    } else {
      setCurrentSong({ ...currentSong, progress: (ct / duration) * 100, length: duration });
    }
  };

  return (
    <div className="App">
      <audio src={currentSong.url} ref={audioElem} onTimeUpdate={onPlaying} />

      <Player songs={songs} setSongs={setSongs} isplaying={isplaying} setisplaying={setisplaying} audioElem={audioElem} currentSong={currentSong} setCurrentSong={setCurrentSong} />
    </div>
  );
}
