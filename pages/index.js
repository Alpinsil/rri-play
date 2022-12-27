import Head from 'next/head';
import Cardcomp from '../components/cardcomp';

export const getStaticProps = async () => {
  const res = await fetch('https://go-rriaudiobook-server-production.up.railway.app/api/books');
  const books = await res.json();

  return {
    props: { books },
  };
};

export default function Home({ books }) {
  const { data } = books;
  console.log(data[2].cover_image);
  return (
    <div>
      <Head>
        <title>RRI PlayBook</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex justify-center mt-7 gap-10 flex-wrap w-full mx-auto">
        {data.map((ar) => (
          <Cardcomp key={ar.id} thumbnail={ar.cover_image} title={ar.title} id={ar.id} desc={ar.category} />
        ))}
      </div>
    </div>
  );
}
