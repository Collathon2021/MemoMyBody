import React, { createContext,useState } from "react";

export const ComContext = createContext();

export default ({ children }) => {
    const [com, setCom] = useState({
        Title: '',
        Story: '',
        //dat: '',
        //useri: '',
    });

    return(
        <ComContext.Provider
            value={{
                com,
                setCom
            }}
        >
            {children}
        </ComContext.Provider>
    );
};

