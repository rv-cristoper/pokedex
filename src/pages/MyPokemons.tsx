import { useNavigate } from "react-router-dom";
import { useSessionStore } from "../store/session";
import { useEffect } from "react";

export default function MyPokemons() {
    const navigate = useNavigate();
    const user = useSessionStore((state) => state.user);
    const validatingSession = useSessionStore(state => state.validatingSession);
    const setValidatingSession = useSessionStore(state => state.setValidatingSession);

    useEffect(() => {
        if (!user) navigate('/');
        setValidatingSession(false)
    }, [user, setValidatingSession, navigate])

    if (validatingSession) return <div>Validando sesión...</div>

    return (
        <div>
            <h1>Mis Pokemones</h1>
        </div>
    );
}