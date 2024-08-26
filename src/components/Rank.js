import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from "./Navbar";

function Rank() {
    const location = useLocation();
    const [category, setCategory] = useState(location.state?.category || 'actor');
    const [candidates, setCandidates] = useState([]);
    const [diffCandidateA, setDiffCandidateA] = useState('');
    const [diffCandidateB, setDiffCandidateB] = useState('');
    const categoryHeadings = {
        actor: "Which is handsomer?",
        actress: "Which is hotter?",
        singer: "Which is better?",
        tvshow: "Which is legendary?",
        movie: "Which is Masterpiece?"
    };

    useEffect(() => {
        if (location.state?.category) {
            setCategory(location.state.category);
            fetchCanditates();
        }
    }, [location.state]);

    const fetchCanditates = async() => {
        try {
            const response = await fetch(`https://whichbetter-json.vercel.app/${category}`);
            const data = await response.json();
            const randomCandidates = data.sort(() => 0.5 - Math.random()).slice(0, 2);
            setCandidates(randomCandidates);
            setDiffCandidateA(rankDiff(candidates[0].rank, candidates[1].rank));
            setDiffCandidateB(rankDiff(candidates[1].rank, candidates[0].rank));
        } catch (error) {
            console.error("Failed to fetch candidates", error);
        }
    }

    const handleRank = (Ra, Rb, winner) => {
        let K = 32;
        if(Ra>1500 || Rb>1500){
            K = 16;
        }
        const Ea = 1/( 1 + Math.pow(10, (Rb-Ra)/400));
        const Sa = winner ? 1 : 0;
        let RankA = Ra + K * (Sa - Ea);  
        return RankA;  
    }
    const rankDiff = (Ra, Rb) => {
        let K = 32;
        if(Ra>1500 || Rb>1500){
            K = 16;
        }
        const Ea = 1/( 1 + Math.pow(10, (Rb-Ra)/400));
        const Sa = 1;
        let RankA = Ra + K * (Sa - Ea); 
        if(RankA - Ra < 0){
            return "-" + Math.round(RankA-Ra);  
        }
        else{
            return "+" + Math.round(RankA-Ra);
        }
    }

    const handleVote = async(winnerId, loserId) => {
        const winner = candidates.find(c => c.id === winnerId);
        const loser = candidates.find(c => c.id === loserId);

        const newWinnerRank = Math.round(handleRank(winner.rank, loser.rank, true));
        const newLoserRank = Math.round(handleRank(loser.rank, winner.rank, false));

        try {
            await fetch(`https://whichbetter-json.vercel.app/${category}/${winnerId}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ rank: newWinnerRank }),
            });
            await fetch(`https://whichbetter-json.vercel.app/${category}/${loserId}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ rank: newLoserRank }),
            });
            fetchCanditates();
        } catch (error) {
            console.error("Failed to update ranks", error);
        }
    }

    useEffect(() => {
        fetchCanditates();
    }, [category]);

    return (
        <div className="header">
        <Navbar></Navbar>
        <div className="content">
            <div className="sidebar">
                <h1 className="sidetext">{categoryHeadings[category]}</h1>
            </div>
            <div className="ranking">
                <div className="canditates">
                    {candidates.map((candidate, index) => (
                        <div className="canditate" key={candidate.id}>
                            <div className="canditateitem" onClick={() => handleVote(candidate.id, candidates.find(c => c.id !== candidate.id).id)}>
                                <div className="image">
                                    <img src={candidate.image} alt={candidate.name}/>
                                </div>
                                <div className="subtext">
                                    <h1>{candidate.name}</h1>
                                    <p>Rank: {candidate.rank} <span>{index === 0 ? diffCandidateA : diffCandidateB}</span></p>
                                </div>
                            </div>
                        </div>
                    ))}

                    <div className="refreshbtn" onClick={fetchCanditates}>
                        <button><img src="https://cdn-icons-png.freepik.com/512/7022/7022719.png" alt=""/></button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    );
  }
  
export default Rank;
  
