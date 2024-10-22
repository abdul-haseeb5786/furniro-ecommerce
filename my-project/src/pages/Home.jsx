import React from 'react';
import HomePage from "../components/HomePage";
import BrowseRange from '../components/BrowseRange';
import Products from '../components/Products';
import RoomInspiration from '../components/RoomInspiration';
import picture1 from "../assets/Share (1).png";

function Home() {
    return (
        <div>
            <HomePage />
            <BrowseRange />
            <Products />
            <RoomInspiration />
            <img className="mt-10 w-full" src={picture1} alt="description of image" />
        </div>
    )
}

export default Home;