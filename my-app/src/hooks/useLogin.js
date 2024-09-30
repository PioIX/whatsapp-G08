import { useAuth } from "@/app/context/AuthContext"

const useLogin = () => {
    const [idUser, setIdUser] = useAuth()

    return [idUser, setIdUser]
}

export { useLogin }