import { createContext,useContext, useState } from "react";

const Context = createContext();

export const StateContext = ({children}) => {
    
    const [user, setUser] = useState(null);

    return (
        <Context.Provider value={{user, setUser}}>
            {children}
        </Context.Provider>
    )
}

export const useStateContext = () => useContext(Context);

