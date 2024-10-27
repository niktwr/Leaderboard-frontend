// src/components/Leaderboard.js
import React, { useEffect, useState } from 'react';

const Leaderboard = () => {
  const [leaders, setLeaders] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    const fetchLeaders = async () => {
      const response = await fetch('https://leaderboard-website-jjr3.onrender.com/api/user/v1/get-users');
      const data = await response.json();
      setLeaders(data.sort((a, b) => b.points - a.points));
    };
    fetchLeaders();
  }, []);

  const fetchHistory = async (userId) => {
    const response = await fetch('https://leaderboard-website-jjr3.onrender.com/api/user/v1/your-history', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId }),
    });
    const data = await response.json();
    setSelectedUser(data);
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Leaderboard</h2>
      {leaders.map((leader, index) => (
        <div key={leader._id} onClick={() => fetchHistory(leader._id)} className="cursor-pointer">
          {index + 1}. {leader.name} - {leader.points} points
        </div>
      ))}
      {selectedUser && (
        <div className="modal">
          {/* Render selectedUser's history */}
        </div>
      )}
    </div>
  );
};

export default Leaderboard;
