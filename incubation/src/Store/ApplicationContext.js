import React,{ createContext, useState } from 'react'

 

export const ApplicationContext = createContext(null)


function   Application({ children }) {
    const [Application,setApplication] = useState(null)
    return (
        <ApplicationContext.Provider value={{ Application, setApplication }}>
            {children}
        </ ApplicationContext.Provider>
    )
}

export default Application
