import React, { useState, useEffect } from 'react';

const TypingEffect = ({ text, delay = 50 }) => {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDisplayText((prevText) => prevText + text.charAt(currentIndex));
      setCurrentIndex((prevIndex) => prevIndex + 1);
    }, delay);

    if (currentIndex === text.length) {
      clearTimeout(timer);
    }

    return () => clearTimeout(timer);
  }, [currentIndex, delay, text]);

  return <span>{displayText}</span>;
};

export default TypingEffect;