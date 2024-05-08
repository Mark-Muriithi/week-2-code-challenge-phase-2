import HomePage from './components/HomePage';
import BotSpecs from './components/BotSpecs';
import YourBotArmy from './components/YourBotArmy';
import { Route,  Routes } from'react-router-dom';
import { useState } from'react';
import "./App.css"
function App() {
  const [army, setArmy] = useState([]);

  return (
    <>
      <Routes>
          <Route exact path="/" element={<HomePage/>} />
          <Route path="/bots/:botId" element={<BotSpecs army={army} setArmy={setArmy} />} />
          <Route path="/your-bot-army" element={<YourBotArmy army={army} />}/>
          </Routes>
    </>
  );
}

export default App;