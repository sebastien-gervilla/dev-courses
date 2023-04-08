import { createContext, useState } from "react";
import { UserModel } from "@/api";

interface AuthContextProps {
    user: UserModel | null,
    refresh: () => void
}

const UserContext = createContext<AuthContextProps>({
    user: null,
    refresh: () => {}
});

export default UserContext;