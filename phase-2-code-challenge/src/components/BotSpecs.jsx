import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

const BotSpecs = ({ onAddToArmy }) => {
  const { botId } = useParams();
  const [bot, setBot] = useState(null);
  
  useEffect(() => {
    fetch(`http://localhost:8000/bots/${botId}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch bot details');
        }
        return response.json();
      })
      .then(data => setBot(data))
      .catch(error => console.error('Error fetching bot details:', error));
  }, [botId])

  const handleClick = (bot) => {
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
    {bot ? (
      <>
        <img src={bot.avatar_url} alt={bot.name} />
        <h2>{bot.name}</h2>
        <p>{bot.bot_class}</p>
        <p>Health: {bot.health}</p>
        <p>Damage: {bot.damage}</p>
        <p>Armor: {bot.armor}</p>
        <p>Catchphrase: {bot.catchphrase}</p>
        <p>Created at : {bot.created_at}</p>
        <p>Updated at: {bot.updated_at} </p>
        <Link to="/" key={bot.id}><button>Go back</button></Link>
      </>
    ) : (
      <p>Loading...</p>
    )}
  </div>
  )
};

export default BotSpecs;
