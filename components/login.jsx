export default function LoginCard({ handleSubmit, handleChange, isLoading }) {
  const form = [
    { nama: 'email', type: 'email' },
    { nama: 'password', type: 'password' },
  ];
  return (
    <div className="w-full max-w-lg mx-auto flex flex-wrap mt-7 justify-center">
      <form className="bg-[#191624] shadow-md rounded-lg px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit}>
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
    </div>
  );
}
