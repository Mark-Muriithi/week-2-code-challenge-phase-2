import React from "react";
import BotCard from "./BotCard";
import BotSpecs from "./BotSpecs";

function BotCollection({ bots, toggleArmyStatus }) {
  return (
    <div className="ui four column grid">
      <div className="row">
        {bots.map((bot) => (
          <React.Fragment key={bot.id}>
            <BotCard bot={bot} toggleArmyStatus={toggleArmyStatus} />
            <BotSpecs bot={bot} />
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

export default BotCollection;
