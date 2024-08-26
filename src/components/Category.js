import React, { useState, useEffect } from 'react';
import {Link} from 'react-router-dom';
import Navbar from "./Navbar";

function Categories() {
    const [actorsLen, setActorsLen] = useState(0);
    const [actressLen, setActessesLen] = useState(0);
    const [singerLen, setSingerLen] = useState(0);
    const [tvshowLen, setTvShowLen] = useState(0);
    const [movieLen, setMovieLen] = useState(0);

    const fetchCategoryCount = async (category) => {
        try {
            const response = await fetch(`http://localhost:8000/${category}`);
            const data = await response.json();
            return data.length;
        } catch (error) {
            console.error(`Failed to fetch count for ${category}`, error);
            return 0;
        }
    };
    const fetchLengths = async() => {
        const actorsLength = await fetchCategoryCount('actor');
        const actressesLength = await fetchCategoryCount('actress');
        const singersLength = await fetchCategoryCount('singer');
        const tvShowsLength = await fetchCategoryCount('tvshow');
        const moviesLength = await fetchCategoryCount('movie');

        setActorsLen(actorsLength);
        setActessesLen(actressesLength);
        setSingerLen(singersLength);
        setTvShowLen(tvShowsLength);
        setMovieLen(moviesLength);
    };

    useEffect(() => {
        fetchLengths();
    }, []);
    
    return (
        <div className="header">
        <Navbar></Navbar>
        <div className="content">
            <div className="sidebar">
                <h1 className="sidetext">Choose Category</h1>
            </div>
            <div className="categories">
                <div className="items">
                    <Link to='/rank' className="item" state={{category: 'actor'}}>
                        <div className="title">
                            <h1>Actors...?</h1>
                        </div>
                        <div className="subtexts">
                            <p>Who's handsomer?</p>
                            <p className="canditatecount">{actorsLen}</p>
                        </div>
                    </Link>
                    <Link to='/rank' className="item" state={{category: 'actress'}}>
                        <div className="title">
                            <h1>Actesses...?</h1>
                        </div>
                        <div className="subtexts">
                            <p>Who's hotter?</p>
                            <p className="canditatecount">{actressLen}</p>
                        </div>
                    </Link>
                    <Link to='/rank' className="item" state={{category: 'singer'}}>
                        <div className="title">
                            <h1>Singers/Musicians...?</h1>
                        </div>
                        <div className="subtexts">
                            <p>Who's better?</p>
                            <p className="canditatecount">{singerLen}</p>
                        </div>
                    </Link>
                    <Link to='/rank' className="item" state={{category: 'tvshow'}}>
                        <div className="title">
                            <h1>Tv Show/Animation...?</h1>
                        </div>
                        <div className="subtexts">
                            <p>Who's legendary?</p>
                            <p className="canditatecount">{tvshowLen}</p>
                        </div>
                    </Link>
                    <Link to='/rank' className="item" state={{category: 'movie'}}>
                        <div className="title">
                            <h1>Movie...?</h1>
                        </div>
                        <div className="subtexts">
                            <p>Who's masterpiece?</p>
                            <p className="canditatecount">{movieLen}</p>
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    </div>
    );
  }
  
export default Categories;
  