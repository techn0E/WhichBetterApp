import {Link} from 'react-router-dom';
import Navbar from "./Navbar";

function Home() {
    return (
    <div className="header">
        <Navbar></Navbar>
        <div className="content">
            <div className="sidebar">
                <Link to='/categories' className="startbtn"><h1>Start Now!</h1></Link>
            </div>
            <Link className="title" to='/categories'>
                <div className="texts">
                    <h1>Welcome to <span>"Which is Better?"</span></h1>
                    <p>Real rankings made with real critics...</p>
                </div>
            </Link>
        </div>
    </div>
    );
  }
  
export default Home;
  