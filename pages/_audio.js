
export default function halo(){
  const handleError = () => {
    setError('An error occurred while loading the image');
  };
  
  const handleLoad = () => {
    setError(null);
  };

  const onClickBookmark = (id) => {
    const storage = JSON.parse(localStorage.getItem('rri-audiobook-sumenep'));
    if (!storage) {
      const data = [];
      data.push(book);
      localStorage.setItem('rri-audiobook-sumenep', JSON.stringify(data));
      setBookmark(!bookmark);
    } else {
      const newData = storage.filter((data) => data.id == id);
      if (newData.length) {
        const newData = storage.filter((data) => data.id != id);
        localStorage.setItem('rri-audiobook-sumenep', JSON.stringify(newData));
        setBookmark(!bookmark);
      } else {
        storage.push(book);
        console.log(storage);
        localStorage.setItem('rri-audiobook-sumenep', JSON.stringify(storage));
        setBookmark(!bookmark);
      }
    }
  };
  return (
  <div>
  <div className="relative w-full h-[331px] flex justify-center overflow-hidden">
  <div className="w-full h-full bg-black absolute z-10 opacity-50" />
  <Image src={error ? '/Image_1.webp' : book.cover_image} alt={book.id} width={142} height={212} priority className="rounded-xl w-full h-[800px] absolute -bottom-10 blur-[2px]" onLoad={handleLoad} onError={handleError} />
  <div className="absolute mt-9 z-10 blur-none">
    <Image src={error ? '/Image_1.webp' : book.cover_image} alt={book.id} width={142} height={212} priority className="rounded-xl w-[150px] h-[210px]" />
    <div className="flex justify-center mt-2 gap-9 text-white text-5xl">
      <i
        className={`fa-solid fa-bookmark ${bookmark && 'text-sky-800'}  cursor-pointer border-black`}
        onClick={() => {
          onClickBookmark(book.id);
        }}
      ></i>
    </div>
  </div>
  </div>
  <h1 className="text-white text-center text-3xl mt-3">{book.title}</h1>
  <p className="text-slate-400 text-center text-lg mt-3 mb-6">{book.desc}</p>
  
  <div className="w-full">
  <h2 className="text-white text-center text-2xl mt-12"> Chapter</h2>
  <div className="flex justify-center mt-7 gap-10 flex-wrap w-full mx-auto mb-8"></div> 
  </div>
  );
}
