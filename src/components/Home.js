// src/components/Home.js
import React, { useEffect, useState } from 'react';

const Home = () => {
  const [friends, setFriends] = useState([]); // Initialize as an empty array
  const [error, setError] = useState(''); // Error state to handle any API issues

  useEffect(() => {
    const fetchFriends = async () => {
      try {
        const response = await fetch('http://localhost:7000/api/user/v1/get-users');
        const data = await response.json();

        // Ensure the API response is an array before setting it to state
        if (Array.isArray(data)) {
          setFriends(data);
        } else {
          throw new Error('Unexpected response format');
        }
      } catch (error) {
        console.error('Error fetching friends:', error);
        setError('Unable to load friends. Please try again later.');
      }
    };

    fetchFriends();
  }, []);

  const claimPoints = async (friendId) => {
    try {
      const response = await fetch(`https://leaderboard-website-jjr3.onrender.com/api/user/v1/claim-points`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: friendId }),
      });

      if (response.ok) {
        // Find the friend in the state and update their points
        setFriends((prevFriends) =>
          prevFriends.map((friend) =>
            friend._id === friendId ? { ...friend, points: friend.points + 10 } : friend
          )
        );
      } else {
        throw new Error('Failed to claim points');
      }
    } catch (error) {
      console.error('Error claiming points:', error);
      setError('Unable to claim points at this time.');
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Friends List</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      {Array.isArray(friends) && friends.length > 0 ? (
        friends.map((friend) => (
          <div key={friend._id} className="flex justify-between mb-2 p-2 border rounded">
            <span>{friend.name} - {friend.points} points</span>
            <button
              onClick={() => claimPoints(friend._id)}
              className="text-white bg-green-500 px-2 rounded hover:bg-green-600"
            >
              Claim Points
            </button>
          </div>
        ))
      ) : (
        <p>No friends found.</p>
      )}
    </div>
  );
};

export default Home;
