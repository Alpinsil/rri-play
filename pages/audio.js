import { useState } from 'react';
import Image from 'next/image';

export default function MyComponent() {
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  const handleChange = (e) => {
    setFile(e.target.files[0]);
    setPreviewUrl(URL.createObjectURL(e.target.files[0]));
    console.log(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('file', file);

    fetch('https://example.com/api/endpoint', {
      method: 'POST',
      body: formData,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
      .then((response) => response.json())
      .then((data) => console.log(data));
  };

  return (
    <>
      <div>
        <Image src={previewUrl || '/Image_1.webp'} width={100} height={100} alt={previewUrl || '/Image_1.webp'} />
      </div>
      <form onSubmit={handleSubmit}>
        <div className="relative">
          <input type="file" className="w-48 py-2 px-4 text-sm leading-5 rounded-md text-gray-700 bg-white border border-gray-300 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue" onChange={handleChange} accept="image/png,image/jpeg" />
          <button type="button" className="absolute inset-y-0 right-0 flex items-center px-2 text-gray-700 bg-gray-200">
            Browse
          </button>
        </div>
      </form>
    </>
  );
}
