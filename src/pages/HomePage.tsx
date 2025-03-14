import { useEffect, useState } from "react"
import PokemonController from "../controllers/pokemon-controller"
import { IPokemon } from "../models/api/pokemon"
import { Link } from 'react-router-dom';
import { useSessionStore } from "../store/session";

type PokemonIds = number[];

export default function HomePage() {
    const [pokemons, setPokemons] = useState<IPokemon[]>([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        PokemonController.get({
            setPokemons,
            setLoading
        })
    }, [])

    return (
        <div className="min-h-screen flex flex-col">
            <div className="flex-grow bg-gray-50 p-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {loading
                        ? <div className="text-center col-span-4">
                            <p className="text-lg font-semibold text-gray-800">Cargando...</p>
                        </div>
                        : pokemons.map((pokemon) => (
                            <Link
                                to={`/pokemon/${pokemon.id}`}
                                key={pokemon.id}
                                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
                            >
                                <img
                                    className="w-full h-48 "
                                    src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${pokemon.id}.svg`}
                                    alt={`Pokemon${pokemon.id}`}
                                />
                                <div className="p-4">
                                    <p className="text-lg font-semibold text-gray-800 mb-2 text-center">{pokemon.name}</p>
                                    <IsPokemonCaptured id={+pokemon.id} />
                                </div>
                            </Link>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

interface IProps {
    id: number
}
const IsPokemonCaptured = (props: IProps) => {
    const user = useSessionStore((state) => state.user);
    const { id } = props;
    const savedIds: PokemonIds = JSON.parse(localStorage.getItem('pokemonIds') || '[]');
    return <p className="text-red-500 text-center">
        {savedIds.includes(id) && user ? 'Capturado' : ''}
    </p>
}