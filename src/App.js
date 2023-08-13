import React, { useState, useEffect } from 'react';
import './App.css';

function App() {

  // Count from without
  const [count, _setCountValue] = useState(3);

  function setCount(value) {
    localStorage.setItem('count', JSON.stringify(value))
    return _setCountValue(value)
  }

  // Disable-Enable Button
  const [disabled, setDisabled] = useState(false);

  // Set to 5 sec.
  const handleTimer = () => {
    if (count > 1) {
      setCount(count - 1);
    } else {
      setCount(0);
      setDisabled(true);
      const timeout = setTimeout(() => {
        setDisabled(false);
        setCount(3);
      }, 5000);
      return () => clearTimeout(timeout);
    }
  }

  // useEffect for Disable Button (5 sec.)
  useEffect(() => {
    const storedcound = localStorage.getItem('count');
    //console.log('storedcount: ', storedcound);
    if (storedcound) {
      setCount(parseInt(storedcound));
      if (storedcound === '0') {
        setDisabled(true);
        const timeout = setTimeout(() => {
          setDisabled(false);
          setCount(3);
        }, 5000);
        return () => clearTimeout(timeout);
      }
    }
  }, []);

  return (
    <>

      <button
        onClick={handleTimer}
        disabled={disabled}
      >
        Test Button {count} / 3
      </button>

    </>
  );
}

export default App;
