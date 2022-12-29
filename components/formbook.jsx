export default function Formbook({ content, isLoading, handleSubmit, handleChange }) {
  const form = [
    { nama: 'title', type: 'text' },
    { nama: 'summary', type: 'text-area' },
    { nama: 'cover_image', type: 'file', alias: 'cover image' },
    { nama: 'category_id', type: 'number', alias: 'category id' },
  ];
  if (content) {
    var { title, summary, category, setCategory, setTitle, setSummary } = content;
  }

  return (
    <div className="w-full max-w-lg mx-auto flex flex-wrap mt-7 justify-center">
      <form className="bg-[#191624] shadow-md rounded-lg px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit}>
        {content ? (
          <>
            <div className="mb-4">
              <label className="block text-white text-sm tracking-widest font-bold mb-2 capitalize" htmlFor={form[0].nama}>
                {form[0].alias || form[0].nama}
              </label>
              <input
                className={`shadow appearance-none border rounded w-full py-2 px-3  ${form[0].nama === 'cover_image' ? 'text-white' : 'text-black'} leading-tight focus:outline-none focus:shadow-outline`}
                id={form[0].nama}
                type={form[0].type}
                placeholder={form[0].alias || form[0].nama}
                autoComplete="off"
                onKeyUp={handleChange}
                onChange={(e) => setTitle(e.target.value)}
                name={form[0].nama}
                required
                value={title}
              />
            </div>
            <div className="mb-4">
              <label className="block text-white text-sm tracking-widest font-bold mb-2 capitalize" htmlFor={form[1].nama}>
                {form[1].alias || form[1].nama}
              </label>
              <input
                className={`shadow appearance-none border rounded w-full py-2 px-3  ${form[1].nama === 'cover_image' ? 'text-white' : 'text-black'} leading-tight focus:outline-none focus:shadow-outline`}
                id={form[1].nama}
                type={form[1].type}
                placeholder={form[1].alias || form[1].nama}
                autoComplete="off"
                onKeyUp={handleChange}
                onChange={(e) => setSummary(e.target.value)}
                name={form[1].nama}
                required
                value={summary}
              />
            </div>
            <div className="mb-4">
              <label className="block text-white text-sm tracking-widest font-bold mb-2 capitalize" htmlFor={form[2].nama}>
                {form[2].alias || form[2].nama}
              </label>
              <input
                className={`shadow appearance-none border rounded w-full py-2 px-3  ${form[2].nama === 'cover_image' ? 'text-white' : 'text-black'} leading-tight focus:outline-none focus:shadow-outline`}
                id={form[2].nama}
                type={form[2].type}
                placeholder={form[2].alias || form[2].nama}
                autoComplete="off"
                onChange={handleChange}
                name={form[2].nama}
              />
            </div>
            <div className="mb-4">
              <label className="block text-white text-sm tracking-widest font-bold mb-2 capitalize" htmlFor={form[3].nama}>
                {form[3].alias || form[3].nama}
              </label>
              <input
                className={`shadow appearance-none border rounded w-full py-2 px-3  ${form[3].nama === 'cover_image' ? 'text-white' : 'text-black'} leading-tight focus:outline-none focus:shadow-outline`}
                id={form[3].nama}
                type="text"
                placeholder={form[3].alias || form[3].nama}
                autoComplete="off"
                onKeyUp={handleChange}
                onChange={(e) => setCategory(e.target.value)}
                name={form[3].nama}
                value={category}
              />
            </div>
          </>
        ) : (
          form.map((data) => (
            <div className="mb-4" key={data.nama}>
              <label className="block text-white text-sm tracking-widest font-bold mb-2 capitalize" htmlFor={data.nama}>
                {data.alias || data.nama}
              </label>
              <input
                className={`shadow appearance-none border rounded w-full py-2 px-3  ${data.nama === 'cover_image' ? 'text-white' : 'text-black'} leading-tight focus:outline-none focus:shadow-outline`}
                id={data.nama}
                type={data.type}
                placeholder={data.alias || data.nama}
                autoComplete="off"
                onChange={handleChange}
                name={data.nama}
                required
              />
            </div>
          ))
        )}

        <div className="flex items-center justify-between">
          <button type="submit">
            {isLoading ? (
              <button className="bg-blue-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline cursor-wait">
                please wait &nbsp; <i className="fa-solid fa-spinner fa-spin-pulse fa-spin-reverse" disabled></i>
              </button>
            ) : (
              <button className="bg-blue-700 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                submit
              </button>
            )}
          </button>
        </div>
      </form>
      <p className="text-center text-gray-500 text-xs">&copy;2022 RRI Sumenep. All rights reserved.</p>
    </div>
  );
}
