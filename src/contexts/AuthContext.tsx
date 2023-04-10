import { createContext, ReactNode, useState } from "react";
import { Request, UserModel } from "@/api";

interface AuthContextProps {
    user: UserModel | null,
    refresh: () => Promise<void>
}

const AuthContext = createContext<AuthContextProps>({
    user: null,
    refresh: async () => {}
});

interface ProviderProps { 
    initialUser: UserModel | null
    children: ReactNode
}

export const UserContextProvider = ({ initialUser, children }: ProviderProps) => {

    const [user, setUser] = useState(initialUser);

    const refresh = async () => {
        const authRes = await Request.get('/user/auth');

        setUser(authRes.data ? authRes.data : null);
    }

    return (
        <AuthContext.Provider value={{ user, refresh }} >
            {children}
        </AuthContext.Provider>
    );
}

export default AuthContext;