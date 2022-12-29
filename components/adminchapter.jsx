import Chaptercard from './chaptercard';
import Link from 'next/link';

export default function AdminChapter({ isPlaying, setIsPlaying, data, onClickPlay, handleDeleteClick, id, showModal, setShowModal }) {
  return (
    <>
      <div className="flex justify-center mt-7 gap-10 flex-wrap w-full mx-auto mb-8 relative">
        {data ? (
          data.map((ar, i) => (
            <div key={ar.id} className="relative">
              <Chaptercard number={i} title={ar.title} desc={ar.description} onClick={onClickPlay} isPlaying={isPlaying} id={ar.id} setIsPlaying={setIsPlaying} mediaPath={ar.media_path} />
              <div className="absolute top-1 right-4 flex justify-between gap-48">
                <button className="text-white bg-red-800 hover:bg-red-600 rounded-lg px-3 py-2 order-2" onClick={() => setShowModal(ar)}>
                  <i className="fa-solid fa-trash"></i>
                </button>
                <Link
                  href={{
                    pathname: '/admin/updatechapter',
                    query: { bookId: id, chapterId: ar.id },
                  }}
                  className="text-white bg-sky-800 hover:bg-sky-600 rounded-lg px-3 py-2   "
                >
                  <i className="fa-solid fa-edit"></i>
                </Link>
              </div>
            </div>
          ))
        ) : (
          <div className="text-white text-center text-lg">Belum ada list chapter di Series ini</div>
        )}
        {showModal && (
          <div className="overflow-y-auto overflow-x-hidden absolute z-50 justify-center items-center w-full md:inset-0 h-modal md:h-full">
            <div className=" p-4 w-full max-w-md h-full md:h-auto mx-auto">
              <div className="relative p-4 text-center rounded-lg shadow bg-gray-800 sm:p-5">
                <p className="mb-4  text-gray-300">Apakah anda yakin ingin menghapus chapter ini ?</p>
                <div className="flex justify-center items-center space-x-4">
                  <button className="py-2 px-3 text-sm font-medium rounded-lg border focus:ring-4 focus:outline-none focus:ring-primary-300 focus:z-10 bg-gray-700 text-gray-300 border-gray-500 hover:text-white hover:bg-gray-600 focus:ring-gray-600" onClick={() => setShowModal(!showModal)}>
                    Tidak
                  </button>
                  <button className="py-2 px-3 text-sm font-medium text-center text-white rounded-lg focus:ring-4 focus:outline-none bg-red-500 hover:bg-red-600 focus:ring-red-900" onClick={() => handleDeleteClick(showModal.id)}>
                    Iya
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
