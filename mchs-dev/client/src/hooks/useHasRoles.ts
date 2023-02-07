import useCurrentUser from './useCurrentUser';
export const useHasRole = (roleNames:number[]) =>{
    const {props} = useCurrentUser();
    if(typeof roleNames === "number"){
        if(props?.user != null)
        return props.user.userRole === roleNames;
    }
    else if (Array.isArray(roleNames)) {
        return roleNames.some((role) => role === props?.user.userRole);
    } else {
        return false;
    }
}