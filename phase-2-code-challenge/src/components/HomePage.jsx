import React, { useState, useEffect } from 'react';
import BotCollection from './BotCollection';
import YourBotArmy from './YourBotArmy';
const HomePage = () => {
  const [army, setArmy] = useState([]);
  const [bots, setBots] = useState([]);

  useEffect(() => {
    if (bots.length === 0) {
      fetch('http://localhost:8000/bots')
        .then((response) => {
          if (!response.ok) {
            throw new Error('Failed to fetch bot data');
          }
          return response.json();
        })
        .then((data) => {
          setBots(data);
        })
        .catch((error) => {
          console.error('Error fetching bot data:', error);
        });
    }
  }, [bots]);

  function onAddToArmy(bot) {
    setArmy(prevArmy => [...prevArmy, bot]);
  }

  const handleReleaseFromArmy = (botId) => {
    setArmy((prevArmy) => prevArmy.filter((b) => b.id !== botId));
  };

  const handleDischarge = (botId) => {
    fetch(`http://localhost:8000/bots/${botId}`, {
      method: 'DELETE',
    })
      .then(() => {
        setArmy((prevArmy) => prevArmy.filter((b) => b.id !== botId));
      })
      .catch(error => console.error('Error discharging bot:', error));
  };

  const handleEnlist = (bot) => {
    setArmy((prevArmy) => [...prevArmy, bot]);
    fetch('http://localhost:8000/bots', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(bot),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to enlist bot');
        }
        return response.json();
      })
      .then(data => {
        onAddToArmy(data);
      })
      .catch(error => console.error('Error enlisting bot:', error));
  };

  return (
    <div>
      <h1>Your Bot Army</h1>
      <YourBotArmy army={army} onRelease={handleReleaseFromArmy} onDischarge={handleDischarge} />
      <h1>Bot Collection</h1>
      <BotCollection bots={bots} army={army} onAddToArmy={onAddToArmy} onEnlist={handleEnlist}/>
    </div>
  );
};

export default HomePage;
