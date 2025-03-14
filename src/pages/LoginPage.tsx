import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/use-auth";
import { useState } from "react";

export default function LoginPage() {
    const navigate = useNavigate();
    const { signIn } = useAuth();
    const [input, setInput] = useState({
        username: '',
        password: ''
    })
    const [errorMessage, setErrorMessage] = useState(false)

    const onSubmit = () => {
        if (input.username === 'user' || input.password === 'user') {
            signIn({ id: '1', name: 'Cristoper Jhanfranco' }, () => {
                navigate("/", { replace: true });
            })
        } else {
            setErrorMessage(true)
        }
    }
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setErrorMessage(false)
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
    }
    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="w-full max-w-md space-y-8 bg-white p-6 rounded-lg shadow-md">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-gray-900">Iniciar sesión</h2>
                    <p className="mt-2 text-sm text-gray-600">Ingresa tus credenciales para acceder</p>
                </div>
                <div className="space-y-4">
                    <div>
                        <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                            Usuario
                        </label>
                        <input
                            name="username"
                            type="text"
                            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                            placeholder="Ingresa tu usuario"
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                            Contraseña
                        </label>
                        <input
                            name="password"
                            type="password"
                            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                            placeholder="Ingrese contraseña"
                            onChange={handleChange}
                        />
                    </div>
                    {errorMessage &&
                        <div className="text-red-500">Usuario o contraseña incorrecto</div>
                    }
                </div>
                <div>
                    <button
                        onClick={onSubmit}
                        className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                        Ingresar
                    </button>
                </div>
            </div>
        </div>
    )
}
