import React from 'react';
import Layout from '../components/Layout';
import Link from 'next/Link';

const pokemon = ({po}) => {
  
  return (
    <Layout title={po.name}>
      <h1 className='text-5xl mb-8 text-center font-bold capitalize'>
        {po.name}
      </h1>   

      <div className='flex-column md:flex bg-gray-700 rounded text-white shadow-lg'>
        <div className='md: mr-4'>
          <img src={po.image} alt={po.name}
            className='mx-auto'
          />
        </div>
        <div className='flex-column self-center pb-4 ml-5 md:mx-auto px-7 md:px-16 lg:px-24 md:border-solid md:border-l-2 border-white border-opacity-25'>
            <p className='mb-4 capitalize'>
              <span className='font-semibold mr-2 text-lg' >
                Species: 
              </span>
                {po.species.name}
            </p>
            <p>
              <span className='font-semibold mr-2 text-lg' >
               Weight: 
              </span>
              {po.weight / 10} kg
            </p>
            <p>
              <span className='font-semibold mr-2 text-lg' >
                Height: 
              </span>
              {po.height / 10} m
            </p>
            <h2 className="text-lg mt-6 mb-2 font-semibold ">Types</h2>
            <ul className='list-disc list-inside'>
            {po.types.map((type, index)=> (
              <li key={index}>{type.type.name}</li>
            ))}
            </ul>
            <p className="mt-10 py-1 px-2 text-black font-semibold uppercase text-center inline-block bg-gray-300 rounded-sm outline-none shadow-md">
              <Link href='/'>
                <a>Go back</a>
              </Link>
          </p>
        </div>
      </div>   
      
      
    </Layout>
  )
}

export async function getServerSideProps({query}){
  const id = query.id;
  try {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    const po = await res.json();
    const paddedIndex = ('00' + (id)).slice(-3);
    const image = `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${paddedIndex}.png`;
    po.image = image;

    return {
      props: {
        po
      }
    }
  } catch (error) {
    console.error(error);
  }
}

export default pokemon;
