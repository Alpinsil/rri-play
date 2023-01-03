import { useState } from 'react';

export default function UserCard({ showModal, handleChange, handleSubmit, setShowModal }) {
  console.log(showModal.nemail);
  const [email, setEmail] = useState(showModal.email || '');
  const [fullname, setFullname] = useState(showModal.full_name || '');
  const [gender, setGender] = useState(showModal.gender || '');
  const [password, setPassword] = useState(showModal.password || '');
  return (
    showModal && (
      <div className="w-full max-w-lg mx-auto flex flex-wrap mt-7 justify-center relative">
        <div className="absolute -top-40 cursor-pointer text-white text-2xl z-50 right-5" onClick={() => setShowModal(!showModal)}>
          X
        </div>
        <form className="bg-[#191624] shadow-md rounded-lg px-8 pt-6 pb-8 mb-4 absolute -top-44 flex flex-wrap" onSubmit={handleSubmit}>
          <div className="mb-4 w-1/2">
            <label className="block text-white text-sm tracking-widest font-bold mb-2 capitalize" htmlFor="email">
              Email
            </label>
            <input
              className={`shadow appearance-none border rounded py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline`}
              id="email"
              type="email"
              placeholder="email"
              autoComplete="off"
              name="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onKeyUp={handleChange}
            />
          </div>
          <div className="mb-4 w-1/2">
            <label className="block text-white text-sm tracking-widest font-bold mb-2 capitalize" htmlFor="full_name">
              Fullname
            </label>
            <input
              className={`shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline`}
              id="full_name"
              type="text"
              placeholder="fullname"
              autoComplete="off"
              name="full_name"
              required
              value={fullname}
              onKeyUp={handleChange}
              onChange={(e) => setFullname(e.target.value)}
            />
          </div>
          <div className=" w-1/2 ">
            <label className="block text-white text-sm tracking-widest font-bold mb-2 capitalize" htmlFor="gender">
              Gender
            </label>
            <select name="gender" id="gender" className="shadow border rounded w-[93%] py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline" value={gender} onChange={(e) => setGender(e.target.value)} onClick={handleChange}>
              <option value="Female">female</option>
              <option value="Male">male</option>
            </select>
          </div>
          <div className="mb-4 w-1/2">
            <label className="block text-white text-sm tracking-widest font-bold mb-2 capitalize" htmlFor="role_id">
              role
            </label>
            <select name="role_id" id="role_id" placeholder="role" className="shadow border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline" onChange={handleChange}>
              <option value={2}>Uploader</option>
            </select>
          </div>
          <div className="mb-4 w-full">
            <label className="block text-white text-sm tracking-widest font-bold mb-2 capitalize" htmlFor="password">
              Password
            </label>
            <input
              className={`shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline`}
              id="password"
              type="password"
              minLength={7}
              placeholder="password"
              autoComplete="off"
              name="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button className="bg-blue-700 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
            submit
          </button>
        </form>
      </div>
    )
  );
}
