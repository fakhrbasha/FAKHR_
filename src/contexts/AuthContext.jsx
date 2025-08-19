import { createContext, useState , useEffect} from "react";
import { getLoggedUserDataApi } from "../services/AuthServices";


export const AuthContext = createContext();



export default function AuthContextProvider({ children }) {
    const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('token') != null);

    const [UserDate,setUserDate]  = useState(null)
    async function getUserDate(){
        const response = await getLoggedUserDataApi()
        if(response.message == "success"){
            setUserDate(response.user)
        }
    }
    useEffect(()=>{
        if(isLoggedIn){
            getUserDate()
        }else{
            setUserDate(null)
        }
    },[isLoggedIn])

    return <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn, UserDate , setUserDate }}>
            {children}
        </AuthContext.Provider>
}
