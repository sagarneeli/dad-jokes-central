import React from 'react';

type JokeProps = {
  text: string;
  textColor: string;
};

const JokeCard: React.FC<JokeProps> = ({ text, textColor }) => {
  return (
    <div
      className={`bg-white bg-opacity-30 p-4 sm:p-6 md:p-8 lg:p-10 rounded shadow ${textColor}`}
    >
      <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl">{text}</p>
    </div>
  );
};

export default JokeCard;
