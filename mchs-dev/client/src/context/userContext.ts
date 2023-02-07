import { createContext } from "react";
import { UserDTO, User } from '../shared/interfaces';

type UserContextType = {
    user: User;
    token: string;
}

interface UserContextProps{
    props: UserContextType | null;
    setProps: (props:UserContextType) => void;
}

const UserContext = createContext<UserContextProps>({
    props: null,
    setProps: ()=>null
});

export default UserContext;