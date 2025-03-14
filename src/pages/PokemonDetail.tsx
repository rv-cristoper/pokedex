import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PokemonController from "../controllers/pokemon-controller";
import { IDetail } from "../models/api/pokemon";
import { useSessionStore } from "../store/session";

type PokemonIds = number[];

export default function PokemonDetail() {
    const { id } = useParams();
    const user = useSessionStore((state) => state.user);
    const [detail, setDetail] = useState<IDetail>();
    const [capturedPokemon, setCapturedPokemon] = useState(false);

    const savePokemonId = (pokemonId: number) => {
        const savedIds: PokemonIds = JSON.parse(localStorage.getItem('pokemonIds') || '[]');
        if (!savedIds.includes(pokemonId)) {
            savedIds.push(pokemonId);
            localStorage.setItem('pokemonIds', JSON.stringify(savedIds));
            setCapturedPokemon(true);
        }
    };

    const isPokemonCaptured = () => {
        if (!id) return false;
        const savedIds: PokemonIds = JSON.parse(localStorage.getItem('pokemonIds') || '[]');
        return savedIds.includes(+id);
    }

    const captured = isPokemonCaptured();

    useEffect(() => {
        if (id) PokemonController.getDetail({ id: +id, setDetail })
    }, [id])

    return (
        <div className="flex justify-center items-center h-[100vh]">
            <div
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 p-8"
            >
                <h1 className=" text-2xl font-bold text-center pb-4">{detail?.name || ''}</h1>
                <img
                    className="w-full h-48"
                    src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${id}.svg`}
                    alt={`Pokemon${id}`}
                />
                <div className="p-4">
                    <div className="mb-4">
                        <p className="font-bold">Tipo:</p>
                        <ul className="list-disc pl-4">
                            {detail?.types.map((type, index) => (
                                <li key={index} className="text-sm">{type}</li>
                            ))}
                        </ul>
                    </div>
                    <div className="mb-4">
                        <p className="font-bold">Habilidades:</p>
                        <ul className="list-disc pl-4">
                            {detail?.abilities.map((ability, index) => (
                                <li key={index} className="text-sm">{ability}</li>
                            ))}
                        </ul>
                    </div>
                    <div>
                        <p className="font-bold">Experiencia:</p>
                        <p className="text-sm">{detail?.experience}</p>
                    </div>
                    {(id && user) &&
                        (
                            captured || capturedPokemon ?
                                <p className="text-sm text-center bg-red-500 w-full text-white px-4 py-2 rounded-lg mt-4 ">Capturado
                                </p> :
                                <button
                                    className="text-sm bg-green-500 w-full text-white px-4 py-2 rounded-lg mt-4 cursor-pointer"
                                    onClick={() => savePokemonId(+id)}
                                >
                                    Capturar
                                </button>)
                    }
                </div>
            </div>
        </div>

    )
}