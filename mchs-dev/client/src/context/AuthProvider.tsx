import * as React from 'react';

type AuthContextType = {
    login:string;
    token: string;
    role:string;
}

interface AuthContextProps{
    readonly auth:AuthContextType | null;
    readonly setAuth: (auth: AuthContextType) => void;
}

interface Props {
    children: React.ReactNode;
}

const AuthContext = React.createContext<AuthContextProps>({
    auth: null,
    setAuth: () => null
});

export const AuthProvider:React.FC<Props> = ({children}) =>{
    const [auth, setAuth] = React.useState<AuthContextType | null>(null);
    const value = {
        auth,
        setAuth
    };
    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;