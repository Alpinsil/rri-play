import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import DeleteModal from '../../components/deleteModal';
import Navbar from '../../components/navbar';
import UserCard from '../../components/userCard';
import arr from '../api/data';

export async function getServerSideProps(context) {
  const token = context.req.cookies.myjwt;
  const res = await fetch('https://go-rriaudiobook-server-production.up.railway.app/api/user', {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const user = await res.json();
  return {
    props: {
      token,
      user,
    },
  };
}

export default function User(props) {
  const [showModal, setShowModal] = useState();
  const [showModalEdit, setShowModalEdit] = useState(false);
  const [isLoading, setIsLoading] = useState();
  const router = useRouter();
  const users = props.user.data;

  const handleChange = (event) => {
    const { name, value, files } = event.target;
    if (files) {
      setFormData((prevFormData) => ({ ...prevFormData, [name]: files[0] }));
    } else {
      setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
    }
  };

  useEffect(() => {
    if (sessionStorage.getItem('login-access') !== arr || sessionStorage.getItem('role') !== 'Admin') {
      router.push('/login');
    }
  });
  const handleDelete = async (id) => {
    const token = sessionStorage.getItem('key-jwt') || props.token;
    setIsLoading(id);
    if (id) {
      try {
        const res = await fetch(`https://go-rriaudiobook-server-production.up.railway.app/api/user/${id}/delete`, {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (res) {
          setIsLoading(false);
          setShowModal(!showModal);
          router.reload();
        } else {
          throw new Error('An error occurred while deleting the resource');
        }
      } catch (error) {
        console.error(error);
      }
    }
  };
  if (users) {
    return (
      <>
        <Navbar />

        <button className="px-4 py-3 bg-sky-900 text-white mt-3 mx-auto flex rounded-xl hover:bg-sky-600" onClick={() => setShowModal(true)}>
          Add New User
        </button>
        <div className="w-full overflow-x-auto mx-auto flex gap-6 mt-4 justify-center mb-4 flex-wrap">
          <table className="lg:w-[80%] w-[60%] text-sm text-left  text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th className="py-3 px-6">Email</th>
                <th className="py-3 px-6">Full Name</th>
                <th className="py-3 px-6">roles</th>
                <th className="py-3 px-6">Action</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr className=" bg-gray-900 border-gray-700" key={user.id}>
                  <th scope="row" className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {user.email}
                  </th>
                  <td className="py-4 px-6">{user.full_name}</td>
                  <td className="py-4 px-6">{user.roles}</td>
                  <td className="py-4  flex gap-5">
                    <button className="font-medium text-blue-500 hover:underline" onClick={() => setShowModalEdit(user)}>
                      Edit
                    </button>
                    <button className="font-medium text-red-600 hover:underline" onClick={() => setShowModal(user)}>
                      {isLoading ? 'please wait' : 'delete'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <DeleteModal setShowModal={setShowModal} showModal={showModal} handleDeleteClick={handleDelete} />
        <UserCard showModal={showModalEdit} setShowModal={setShowModalEdit} handleChange={handleChange} />
      </>
    );
  } else {
    router.push('/');
  }
}
