import { IDetail, IPokemon } from "../models/api/pokemon";
import PokemonService from "../services/pokemon-service";

export default class PokemonController {
  static get = async ({
    setPokemons,
    setLoading,
  }: {
    setPokemons: React.Dispatch<React.SetStateAction<IPokemon[]>>;
    setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  }) => {
    try {
      setLoading(true);
      const response = await PokemonService.get();
      const newResponse = response.results.map(
        (pokemon: { name: string; url: string }) => {
          const url = pokemon.url.split("/");
          const id = url[url.length - 2];
          return {
            name: pokemon.name,
            id,
          };
        }
      );
      setPokemons(newResponse.sort(() => Math.random() - 0.5));
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  static getDetail = async ({
    id,
    setDetail,
  }: {
    id: number;
    setDetail: React.Dispatch<React.SetStateAction<IDetail | undefined>>;
  }) => {
    try {
      const response = await PokemonService.getDetail(id);
      console.log(response)
      const newResponse = {
        name: response.name,
        abilities: response.abilities.map(
          (ability: { ability: { name: string } }) => ability.ability.name
        ),
        types: response.types.map(
          (type: { type: { name: string } }) => type.type.name
        ),
        experience: response.base_experience,
      };
      console.log(newResponse)
      setDetail(newResponse);
    } catch (err) {
      console.error(err);
    }
  };
}
