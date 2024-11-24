import React, { useState, useEffect } from "react";
import "../styles/Gallery.css";

const Gallery = () => { // display data
    const [tours, settours] = useState([]); //store
    const [loading, setLoading] = useState(true); //load while data is loading
    const [error, setError] = useState(null); //handle errors

    useEffect(() => {
        const fetchTours = async () => { //function to fetch data
            try {
                const response = await fetch("https://course-api.com/react-tours-project"); // call API 
                if (!response.ok) {
                    throw new Error('Error: fetch failed'); // Handle and display an error message if the fetch fails
                }
                const data = await response.json();//into json
                settours(data); // data fetched into state
                setLoading(false); //loading to false after fetching data
            } catch (error) {
                console.error("Error", error); //log full error
                setError(error.message); //error message if fetch fails
                setLoading(false); //loading to false to stop
            }
        };
        fetchTours();//call fetch function 
    }, []); //empty array so it rusn once
    const removeTour = (id) => {
        settours(tours.filter((tour) => tour.id !== id)); //remove tour (using filter = kind of filtering out the tour)
    };
    if (loading) return <p>Loading...</p> // render loading
    if (error) return <p>Error</p> // render error
    return (
        <div className="gallery-container">
            {tours.map((tour) => (
                <div key={tour.id} className="tour-container">
                    <img src={tour.image} alt={tour.name} className="tour-img" />
                    <h2>{tour.name}</h2>
                    <p>${tour.price}</p>
                    <p>{tour.description}</p>
                    <button onClick={() => removeTour(tour.id)}>Not Interessed</button>
                </div>
            ))}
        </div>
    ); // in the section above we looped through the tours array and displayed the tours available, displayed the tours details, created button to say not interested using removetour defined above 
};

export default Gallery; 