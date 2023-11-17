import { useEffect, useState } from 'react';
import die from './assets/images/icon-dice.svg';
import styled, { ThemeProvider } from 'styled-components';
import { lightTheme, darkTheme } from './Theme.ts';
import GlobalStyle from './GlobalStyle.ts';

function App() {
  const [count, setCount] = useState(0);
  const [advice, setAdvice] = useState('');
  const [theme, setTheme] = useState('dark');

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
    <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
      <GlobalStyle />
      <StyledMain>
        <p className="advice-count">Advice # {count}</p>
        <p className="advice-text">{advice}</p>
        <div className="die-container">
          <img
            className="die-image"
            onClick={getAdvice}
            role="button"
            aria-label="Get Advice"
            src={die}
            alt="Dice Icon"
          />
        </div>
      </StyledMain>
    </ThemeProvider>
  );
}

const StyledMain = styled.main`
  background-color: ${(props) => props.theme.cardBgColor};

  .advice-count {
    color: ${(props) => props.theme.accentColor};
  }

  .advice-text {
    color: ${(props) => props.theme.mainTextColor};
  }

  .die-container {
    background-color: ${(props) => props.theme.accentColor};
  }

  .die-image {
  }
`;

export default App;
