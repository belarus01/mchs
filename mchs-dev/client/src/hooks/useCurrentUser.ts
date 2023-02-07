import { useContext } from 'react';
import UserContext from '../context/userContext';
const useCurrentUser = () => {
    const {props, setProps} = useContext(UserContext);
    return {
        props,
        setProps
    };
};

export default useCurrentUser;