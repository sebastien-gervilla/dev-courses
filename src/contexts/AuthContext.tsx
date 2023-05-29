import { createContext, ReactNode, useState } from "react";
import { Request, UserModel } from "@/api";
import Router from 'next/router';
import { Modal } from "@/components";
import { useModal } from "@/hooks";
import { LoginForm, SignupForm } from "@/components/Form";

interface AuthContextProps {
    user: UserModel | null,
    refresh: () => Promise<void>,
    openAuthModal: (modalType: ModalType) => void
}

const AuthContext = createContext<AuthContextProps>({
    user: null,
    refresh: async () => {},
    openAuthModal: () => {}
});

interface ProviderProps { 
    initialUser: UserModel | null
    children: ReactNode
}

export const UserContextProvider = ({ initialUser, children }: ProviderProps) => {

    const modal = useModal();
    const [modalType, setModalType] = useState<ModalType>('login');

    const [user, setUser] = useState(initialUser);

    const refresh = async () => {
        const authRes = await Request.get('/user/auth');

        setUser(authRes.data ? authRes.data : null);

        if (!authRes.data)
            Router.reload();
    }

    const switchModal = () => setModalType(type => type === 'login' ? 'signup' : 'login');

    const openAuthModal = (newModalType: ModalType = 'login') => {
        (newModalType !== modalType) && setModalType(newModalType);
        modal.open();
    }

    return (
        <AuthContext.Provider value={{ user, refresh, openAuthModal }} >
            {children}
            {!user && <Modal 
                isOpen={modal.isOpen}
                onClose={modal.close}
                body={
                    modalType === 'login' ? 
                        <LoginForm switchModal={switchModal} refresh={refresh} close={modal.close} /> :
                        <SignupForm switchModal={switchModal} close={modal.close} />
                }
            />}
        </AuthContext.Provider>
    );
}

type ModalType = 'login' | 'signup';

export default AuthContext;