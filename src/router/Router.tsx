
import {
    BrowserRouter,
    Routes,
    Route,
} from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import HomePage from "../pages/HomePage";
import PokemonDetail from "../pages/PokemonDetail";
import Layout from "../components/Layout";
import MyPokemons from "../pages/MyPokemons";

export default function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<LoginPage />} />
                <Route element={<Layout />}>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/pokemon/:id" element={<PokemonDetail />} />
                    <Route path="/mypokemons" element={<MyPokemons />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}