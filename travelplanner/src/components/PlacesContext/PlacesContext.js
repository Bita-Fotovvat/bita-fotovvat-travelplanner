import React, { createContext, useContext, useState } from 'react';
import axios from 'axios';
const PlacesContext = createContext();
export const useVideos = () => useContext(VideosContext);
export const VideosProvider = ({ children }) => {
    const [videos, setVideos] = useState([]);
    const getVideos = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/videos`);
            setVideos(response.data);
        } catch (error) {
            console.error("error:", error);
        }
    };
    return (
        <VideosContext.Provider value={{ videos, getVideos }}>
            {children}
        </VideosContext.Provider>
    );
};
