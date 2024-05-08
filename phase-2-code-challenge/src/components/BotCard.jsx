import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

 const BotCard = ({ bot, onEnlist, isEnlisted }) => {
  const { avatar_url, name, catchphrase, health, damage, armor, bot_class } = bot;

  const handleClick = (e) => {
    e.preventDefault();
    onEnlist(bot);
  };

  return (
    <div>
    <Card className="bot-card" key={bot.id}>
      <Card.Img src={avatar_url} alt={name} />
      <Card.Body>
        <Card.Title>{name}</Card.Title>
        <Card.Text>
          <p>{catchphrase}</p>
          <p>❤️‍🩹 {health}</p>
          <p>{damage}</p>
          <p>🛡️ {armor}</p>
        </Card.Text>
        <Button variant={isEnlisted ? 'secondary' : 'primary'} onClick={handleClick} disabled={isEnlisted}>{isEnlisted ? 'Enlisted' : 'Enlist'}</Button>
        <p>{bot_class}</p>
      </Card.Body>
    </Card>
    </div>
  );
};
export default BotCard;
