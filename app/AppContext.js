"use client"
import { createContext, useState } from "react";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
    const [name, setName] = useState("");
    const [number, setNumber] = useState("")
    const avatars = [
        "https://i.pravatar.cc/150?img=1",
        "https://i.pravatar.cc/150?img=2",
        "https://i.pravatar.cc/150?img=3",
        "https://i.pravatar.cc/150?img=4",
    ];

    const imgRandom = avatars[Math.floor(Math.random() * avatars.length)]



    return (
        <AppContext.Provider value={{ name, setName, number, setNumber, imgRandom }}>
            {children}
        </AppContext.Provider>
    );
};
