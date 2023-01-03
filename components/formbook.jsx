export default function Formbook({ content, isLoading, handleSubmit, handleChange, categoriest }) {
  const form = [
    { nama: 'title', type: 'text' },
    { nama: 'summary', type: 'text-area' },
    { nama: 'cover_image', type: 'file', alias: 'cover image' },
  ];
  if (content) {
    var { title, summary, setCategory, category, setTitle, setSummary } = content;
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
              <label className="block text-white text-sm tracking-widest font-bold mb-2 capitalize" htmlFor="category_id">
                Category
              </label>
              <select name="category_id" id="category_id" placeholder="role" className="shadow border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline" onChange={(e) => setCategory(e.target.value)} onClick={handleChange} value={category}>
                {categoriest.data.map((n) => (
                  <option value={n.id} key={n.id}>
                    {n.name}
                  </option>
                ))}
              </select>
            </div>
          </>
        ) : (
          <>
            {form.map((data) => (
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
            ))}
            <div className="mb-4">
              <label className="block text-white text-sm tracking-widest font-bold mb-2 capitalize" htmlFor="category_id">
                Category
              </label>
              <select name="category_id" id="category_id" placeholder="role" className="shadow border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline" onChange={(e) => setCategory(e.target.value)} onClick={handleChange} value={category}>
                {categoriest.data.map((n) => (
                  <option value={n.id} key={n.id}>
                    {n.name}
                  </option>
                ))}
              </select>
            </div>
          </>
        )}

        <div className="flex items-center justify-between">
          <button type="submit">
            <p className="bg-blue-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">{isLoading ? 'please wait' : 'submit'}</p>
          </button>
        </div>
      </form>
      <p className="text-center text-gray-500 text-xs">&copy;2022 RRI Sumenep. All rights reserved.</p>
    </div>
  );
}
