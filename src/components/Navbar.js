import {Link} from 'react-router-dom';


function Navbar() {
    return (
        <div className="navbar">
            <div className="logo">
                <p>WhichBetter</p>
            </div>
            <div className="navelement">
                <ul>
                    <li><Link to='/home'>Home</Link></li>
                    <li className="dropdown">
                        <Link className="dropbtn" to="/categories">Categories</Link>
                        <div className="dropdown-content">
                            <Link to='/rank' state={{ category: 'actor'}} className='dropdownlink'>Actors</Link>
                            <Link to='/rank' state={{ category: 'actress'}} className='dropdownlink'>Actresses</Link>
                            <Link to='/rank' state={{ category: 'singer'}} className='dropdownlink'>Singers</Link>
                            <Link to='/rank' state={{ category: 'tvshow'}} className='dropdownlink'>Tv Shows</Link>
                            <Link to='/rank' state={{ category: 'movie'}} className='dropdownlink'>Movies</Link>
                        </div>
                    </li>
                    <li><Link to='/leaderboard'>LeaderBoard</Link></li>
                    <li><Link to='/upload'>Upload</Link></li>
                </ul>
            </div>
        </div>
    );
  }
  
export default Navbar;
  