import React from "react";
import BotCard from "./BotCard";

function YourBotArmy({ bot, toggleArmyStatus }) {
  //your bot army code here...

  return (
    <div className="ui segment inverted olive bot-army">
      <div className="ui five column grid">
        <div className="row bot-army-row">
          <BotCard bot={bot} toggleArmyStatus={toggleArmyStatus} />
          Your Bot Army
        </div>
      </div>
    </div>
  );
}

export default YourBotArmy;