import Link from 'next/link'
import React from 'react'
import Layout from '../../components/Layout'
import Image from 'next/image'

const Pokemon = ({ pokemon }) => {

    const pokeIndex = ('000' + (pokemon.id)).slice(-3)
    const pokeName = pokemon.name[0].toUpperCase() + pokemon.name.slice(1)

    const renderTypes = () => (
        pokemon.types.map((type, index) => (
            <li key={index} className="px-2 py-1 bg-slate-700 rounded">
                {type.type.name}
            </li>
        ))
    )


    const renderStats = () => (
        pokemon.stats.map((stat, index) => (
            <div key={index} className="bg-slate-700 my-2 rounded p-1">
                <div className="bg-slate-900 rounded px-2" style={{ width: `${stat.base_stat}%` }}>
                    {stat.stat.name}: {stat.base_stat}
                </div>
            </div>
        ))
    )

    return (
        <Layout title={pokeName}>
            <div>
                <Link href='/'>
                    <a>
                        <button className="px-3 py-1 bg-slate-900 rounded absolute z-10" >Back</button>
                    </a>
                </Link>
            </div>

            <div className="flex flex-col justify-center items-center ">
                <span className="absolute text-[400px] font-bold text-slate-500">No.{pokeIndex}</span>
                <Image
                    alt={pokemon.name}
                    width={400}
                    height={400}
                    src={`https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${pokeIndex}.png`}
                />
            </div>

            <div className="bg-slate-900 rounded p-5">
                <ul className="flex gap-5">
                    {renderTypes()}
                </ul>

                <div>
                    {renderStats()}
                </div>
            </div>


        </Layout>
    )
}

export default Pokemon

export async function getServerSideProps(context) {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${context.query.name}`)
    const pokemon = await res.json()

    return {
        props: {
            pokemon
        }
    }
}