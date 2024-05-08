import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import BotCard from './BotCard';

const BotCollection = ({ bots, onAddToArmy, army }) => {
  const [sortCriteria, setSortCriteria] = useState('name');
  const [enlistedBots, setEnlistedBots] = useState([]);

  useEffect(() => {
    const enlistedBotIds = army.map(bot => bot.id);
    setEnlistedBots(bots.filter(bot => enlistedBotIds.includes(bot.id)));
  }, [army, bots]);

  const handleSort = criteria => {
    setSortCriteria(criteria);
  };

  const sortedBots = bots.sort((a, b) => {
    switch (sortCriteria) {
      case 'health':
        return b.health - a.health;
      case 'damage':
        return b.damage - a.damage;
      case 'armor':
        return b.armor - a.armor;
      case 'name':
        return a.name.toLowerCase() < b.name.toLowerCase() ? -1 : 1;
      default:
        return 0;
    }
  });

  const isBotEnlisted = (bot) => {
    return army.some((enlistedBot) => enlistedBot.id === bot.id);
  };

  const handleClick = (bot) => {
    if (!isBotEnlisted(bot)) {
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
          setEnlistedBots(prevEnlistedBots => [...prevEnlistedBots, bot]);
          onAddToArmy(bot);
        })
        .catch(error => {
          console.error('Error enlisting bot:', error);
          alert('Failed to enlist bot. Please try again.');
        });
    } else {
      alert('Bot is already enlisted.');
    }
  }

  const filteredBots = sortedBots.filter((bot) => !isBotEnlisted(bot));

  return (
    <div>
      <div className='sort-bar'>
        <span>Sort by: </span>
        <button onClick={() => handleSort('name')}>Name</button>
        <button onClick={() => handleSort('health')}>Health</button>
        <button onClick={() => handleSort('damage')}>Damage</button>
        <button onClick={() => handleSort('armor')}>Armor</button>
      </div>
      <div className='botcollection'>
        {filteredBots.map(bot => (
          <div key={bot.id}>
            <Link to={`/bots/${bot.id}`}>
              <BotCard bot={bot} onEnlist={handleClick} isEnlisted={isBotEnlisted(bot)} />
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BotCollection;