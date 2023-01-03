export default function LoginCard({ handleSubmit, handleChange, isLoading }) {
  const form = [
    { nama: 'email', type: 'email' },
    { nama: 'password', type: 'password' },
  ];
  return (
    <div className="w-full max-w-lg mx-auto flex flex-wrap mt-7 justify-center">
      <form className="bg-[#191624] shadow-md rounded-lg px-8 pt-6 pb-8 mb-4 w-full flex flex-wrap gap-8" onSubmit={handleSubmit}>
        {form.map((data) => (
          <div className="mb-4 w-full" key={data.nama}>
            <label className="block text-white text-sm tracking-widest font-bold mb-2 capitalize" htmlFor={data.nama}>
              {data.alias || data.nama}
            </label>
            <input
              className={`shadow appearance-none border rounded w-full py-2 px-3  ${data.nama === 'cover_image' ? 'text-white' : 'text-black'} leading-tight focus:outline-none focus:shadow-outline`}
              id={data.nama}
              type={data.type}
              placeholder={data.alias || data.nama}
              onChange={handleChange}
              name={data.nama}
              required
            />
          </div>
        ))}
        <div className="flex items-center justify-between">
          <button type="submit">
            <p className="bg-blue-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">{isLoading ? 'please wait' : 'submit'}</p>
          </button>
        </div>
      </form>
    </div>
  );
}
