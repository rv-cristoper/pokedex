import { useEffect } from "react";
import { useSessionStore } from "../store/session";
import { Link, Outlet } from "react-router-dom";
import useAuth from "../hooks/use-auth";

export default function Layout() {
    const user = useSessionStore((state) => state.user);
    const { signOut } = useAuth();
    const setUser = useSessionStore((state) => state.setUser);


    useEffect(() => {
        if (!user) {
            const newUser = localStorage.getItem('user')
            if (newUser) setUser(JSON.parse(newUser))
        }
    }, [user, setUser])

    return (
        <div>
            <header className="bg-black shadow-md py-4 px-6 flex justify-end items-center">
                {user
                    ? <div className="flex justify-end items-center">
                        <p className="text-sm font-semibold text-white">{user?.name || ''}</p>
                        <span className="text-white mx-4">|</span>
                        <Link to={`/mypokemons`}>
                            <button className=" text-sm bg-red-500 text-white px-4 py-1 rounded-lg cursor-pointer">
                                Mis pokemones
                            </button>
                        </Link>
                        <span className="text-white ml-4">|</span>
                        <button className=" text-sm ml-4 bg-white text-black px-4 py-1 rounded-lg cursor-pointer" onClick={() => signOut(() => { })}>
                            Cerrar sesión
                        </button>

                    </div>
                    : <Link to={`/login`}>
                        <button className=" text-sm bg-white text-black px-4 py-1 rounded-lg cursor-pointer">
                            Iniciar sesión
                        </button>
                    </Link>
                }

            </header>
            <main className="overflow-x-hidden overflow-y-auto p-6">
                <Outlet />
            </main>
        </div>

    )
}