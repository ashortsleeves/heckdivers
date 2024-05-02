import React, { useState, useEffect } from 'react';

const RandomCharacter = ({ onUpdate }) => {
  const [randomCharacter, setRandomCharacter] = useState('');

  useEffect(() => {
    const intervalId = setInterval(() => {
      // Generate a random number between 0 and 2 to select a type of character
      const typeIndex = Math.floor(Math.random() * 3);

      let newCharacter;
      switch (typeIndex) {
        case 0:
          // Generate a random number between 0 and 9
          newCharacter = Math.floor(Math.random() * 10);
          break;
        case 1:
          // Generate a random uppercase letter
          newCharacter = String.fromCharCode(65 + Math.floor(Math.random() * 26));
        
          if (newCharacter === "T" || newCharacter === "H") {
            newCharacter = "THEY_ARE_HERE";
          }
          
          break;
        case 2:
          // Generate a random symbol
          const symbols = '!@#$%^&*()_+-=[]{}|;:,.<>?';
          newCharacter = symbols.charAt(Math.floor(Math.random() * symbols.length));
          break;
        default:
          newCharacter = '';
      }

      setRandomCharacter(newCharacter);
      onUpdate(newCharacter);
    }, Math.random() * 1400 + 100); // Random interval between 0.1 and 1.5 seconds

    // Clear the interval on component unmount to avoid memory leaks
    return () => clearInterval(intervalId);
  }, []); // Empty dependency array means this effect runs only once after the component mounts

  return <span className={randomCharacter}>{randomCharacter}</span>;
};

const TwoHundredRandomCharacters = () => {
  const [characters, setCharacters] = useState(Array(100).fill(''));

  useEffect(() => {
    const intervalIds = characters.map((_, index) => {
      return setInterval(() => {
        setCharacters(prevChars => {
          const newChars = [...prevChars];
          newChars[index] = String.fromCharCode(Math.floor(Math.random() * 127));
          return newChars;
        });
      }, Math.random() * 1400 + 100); // Random interval between 0.1 and 1.5 seconds

      // Return intervalId for cleanup
      return intervalIds;
    });

    // Clear all intervals on component unmount to avoid memory leaks
    return () => {
      intervalIds.forEach(clearInterval);
    };
  }, []);

  return (
    <div className="inline">
      {characters.map((char, index) => (
        <RandomCharacter key={index} onUpdate={(newChar) => {
          setCharacters(prevChars => {
            const newChars = [...prevChars];
            newChars[index] = newChar;
            return newChars;
          });
        }} />
      ))}
    </div>
  );
};

export default TwoHundredRandomCharacters;
