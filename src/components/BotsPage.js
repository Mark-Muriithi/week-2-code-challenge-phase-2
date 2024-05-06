import React, { useState, useEffect } from "react";
import YourBotArmy from "./YourBotArmy";
import BotCollection from "./BotCollection";

function BotsPage() {
  const [bots, setBots] = useState([]);
  const [armyBots, setArmyBots] = useState([]);
  const [armyStatus, setArmyStatus] = useState(false);

  useEffect(() => {
    fetch("db.json")
      .then((resp) => resp.json())
      .then((data) => {
        setBots(data);
        setArmyBots(data); // Initialize armyBots with all bots
      });
  }, []);

  function toggleArmyStatus(id) {
    // Update army status for the specific bot
    const updatedBots = armyBots.map((bot) =>
      bot.id === id ? { ...bot, armyBot: !bot.armyBot } : bot
    );
    setArmyBots(updatedBots);
  }

  return (
    <div>
      {armyBots.map((bot) =>
        bot.armyBot ? (
          <YourBotArmy
            toggleArmyStatus={toggleArmyStatus}
            key={bot.id}
            bot={bot}
          />
        ) : null
      )}

      {bots.map((bot) => (
        <BotCollection
          key={bot.id}
          bot={bot}
          toggleArmyStatus={toggleArmyStatus}
        />
      ))}
    </div>
  );
}

export default BotsPage;
