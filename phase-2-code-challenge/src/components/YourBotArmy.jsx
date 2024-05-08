import React from 'react';

const YourBotArmy = ({ army, onRelease, onDischarge }) => {

  const isBotEnlisted = (botId) => {
    return army.some(bot => bot.id === botId);
  };

  const handleRelease = (botId) => {
    if (isBotEnlisted(botId)) {
      fetch(`http://localhost:8000/bots/${botId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: 'released' }),
      })
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to release bot');
        }
        onRelease(botId);
      })
      .catch(error => console.error('Error releasing bot:', error));
    }
  };

  const handleDischarge = (botId) => {
    if (isBotEnlisted(botId)) {
      fetch(`http://localhost:8000/bots/${botId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: 'discharged' }),
      })
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to discharge bot');
        }
        onDischarge(botId);
      })
      .catch(error => console.error('Error discharging bot:', error));
    }
  };

  return (
    <div className='your-bot-army'>
      {army.map((bot) => (
        <div key={bot.id} className='bot-card'>
          <img src={bot.avatar_url} alt={bot.name} />
          <div className='bot-details'>
            <h2>{bot.name}</h2>
            <p>{bot.catchphrase}</p>
            <p>❤️ {bot.health}</p>
            <p>❤️‍🩹 {bot.damage}</p>
            <p>🛡️ {bot.armor}</p>
          </div>
          <button onClick={() => handleRelease(bot.id)}>Release</button>
          <button onClick={() => handleDischarge(bot.id)}>Discharge</button>
        </div>
      ))}
    </div>
  );
};

export default YourBotArmy;
