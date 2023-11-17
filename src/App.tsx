import { useEffect, useState } from 'react';
import die from './assets/images/icon-dice.svg';
function App() {
  const [count, setCount] = useState(0);
  const [advice, setAdvice] = useState('');

  const getAdvice = async () => {
    const res = await fetch('https://api.adviceslip.com/advice');
    const data = await res.json();
    setAdvice(data.slip.advice);
    setCount((c) => c + 1);
  };

  useEffect(() => {
    getAdvice();
  }, []);

  return (
    <main>
      <p>Advice # {count}</p>
      <p>{advice}</p>
      <img
        onClick={getAdvice}
        role="button"
        aria-label="Get Advice"
        src={die}
        alt="Dice Icon"
      />
    </main>
  );
}

export default App;
