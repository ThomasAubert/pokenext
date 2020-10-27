import Link from 'next/Link'
import Layout from '../components/Layout'

export default function Home({pokemon}) {

  return (
    <Layout title='NextJS Pokedex'>
      <h1 className='text-5xl mb-8 text-center font-bold'>
        NextJS Pokedex
      </h1>

      <ul>
        {pokemon.map((po, index)=> (
          <li key={index}>
            <Link href={`pokemon?id=${index +1}`}>
              <a className='border p-4 border-gray my-2 capitalize flex items-center text-lg bg-gray-700 text-white rounded-md  transition ease-in-out duration-500 transform hover:scale-105'>
                <img className='w-20 h-20 mr-3' src={po.image} alt={po.name} />
                <span className='mr-2 font-bold'>{index + 1}.</span>
                {po.name}
              </a>
            </Link>
          </li>
        ))}
      </ul>
    </Layout>
  )
}


export async function getStaticProps(context){
  try {
    const res = await fetch('https://pokeapi.co/api/v2/pokemon?limit=150');
    const {results} = await res.json();
    const pokemon = results.map((result, index)=> {
      const paddedIndex = ('00' + (index + 1)).slice(-3);
      const image = `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${paddedIndex}.png`;
      return {
        ...result,
        image
      };
    })
    return {
      props: {
        pokemon
      }
    }
  } catch (error) {
    console.error(error);
  }
  
}