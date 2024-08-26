import React, { useState } from 'react';
import Navbar from './Navbar';

function Upload() {
    const [name, setName] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [category, setCategory] = useState('actor');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleNameChange = (e) => {
        setName(e.target.value);
    };

    const handleImageChange = (e) => {
        setImageUrl(e.target.value);
    };

    const handleCategoryChange = (e) => {
        setCategory(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        fetch(`http://localhost:8000/${category}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to fetch existing entries');
            }
            return response.json();
        })
        .then(data => {
            const exists = data.some(item => item.name.toLowerCase() === name.toLowerCase());
            if (exists) {
                setError(`Canditate with the name "${name}" already exists as ${category}.`)
                throw new Error(`Canditate with the name "${name}" already exists as ${category}.`);
            }

            const newData = {
                name: name,
                rank: 500,
                image: imageUrl
            };

            return fetch(`http://localhost:8000/${category}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newData)
            });
        })
        .then(response => {
            setLoading(false);
            if (!response.ok) {
                return response.text().then(text => { throw new Error(text); });
            }
            return response.json();
        })
        .then(result => {
            console.log('Success:', result);
        })
        .catch(error => {
            setLoading(false);
            setError(error.message);
            console.error('Error:', error);
        });

    }


    return (
        <div className="header">
            <Navbar />
            <div className="content">
                <div className="sidebar">
                    <h1 className="sidetext">Upload?</h1>
                </div>
                <div className="ranking">
                    <div className="canditates">
                        <div className="canditate">
                            <div className="canditateitem">
                                <div
                                    className="image"
                                    style={{
                                        background: `url(https://i.pinimg.com/474x/7e/8e/b8/7e8eb817d442b5507a71c0251b86d470.jpg) no-repeat center`,
                                        backgroundSize: 'cover'
                                    }}
                                >
                                    <img id="canditateimg" src={imageUrl} alt="" />
                                </div>
                                <div className="subtext">
                                    <h1 className="canditatename">{name}</h1>
                                    <p>
                                        Rank: 500 <span>+50</span>
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="form">
                            <form onSubmit={handleSubmit}>
                                <label htmlFor="name">Name:</label>
                                <input
                                    type="text"
                                    name="name"
                                    placeholder={`${category.toUpperCase()} NAME`}
                                    id="name"
                                    required
                                    maxLength="25"
                                    className="canditatenameinput"
                                    value={name}
                                    onChange={handleNameChange}
                                />
                                <label htmlFor="image">Image Url:</label>
                                <input
                                    type="text"
                                    name="imageurl"
                                    placeholder="Image Url(ex:https://i.pinimg.com/564x/93/8d/f2/938df221b55f700bf88fd5ab06f2c8ed.jpg)"
                                    id="image"
                                    className="canditateimageinput"
                                    value={imageUrl}
                                    onChange={handleImageChange}
                                />
                                <label htmlFor="cat">Category:</label>
                                <select name="category" id="cat" onChange={handleCategoryChange}>
                                    <option value="actor">Actor</option>
                                    <option value="actress">Actress</option>
                                    <option value="singer">Singer/Musician</option>
                                    <option value="tvshow">Tv Show/Animation</option>
                                    <option value="movie">Movie</option>
                                </select>
                                <button type="submit">Upload!</button>
                                <h1>{error ? error : ''}</h1>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <div className="loading-upload" style={{ display: loading ? 'flex' : 'none' }}>
                <h1>{error ? error : 'Uploading...'}</h1>
            </div>
        </div>
    );
}

export default Upload;
