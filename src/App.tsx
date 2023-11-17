import { useEffect, useState } from 'react';
import die from './assets/images/icon-dice.svg';
import dividerMobile from './assets/images/pattern-divider-mobile.svg';
import styled, { ThemeProvider } from 'styled-components';
import { lightTheme, darkTheme } from './Theme.ts';
import GlobalStyle from './GlobalStyle.ts';
import sun from './assets/images/icon-sun.svg';
import moon from './assets/images/icon-moon.svg';

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
        <img
          className="toggle-dark"
          role="button"
          aria-label="Toggle Dark Mode"
          src={theme === 'light' ? moon : sun}
          alt="Dark Mode Toggle"
          onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
        />
        <p className="advice-count">Advice # {count}</p>
        <p className="advice-text">&ldquo;{advice}&rdquo;</p>
        <div
          className="die-container"
          onClick={getAdvice}
        >
          <img
            className="die-image"
            role="button"
            aria-label="Get Advice"
            src={die}
            alt="Dice Icon"
          />
        </div>
        <img
          className="divider"
          src={dividerMobile}
          alt="Divider"
        />
      </StyledMain>
    </ThemeProvider>
  );
}

const StyledMain = styled.main`
  background-color: ${(props) => props.theme.cardBgColor};
  max-width: 34.3rem;
  padding: 4rem 2.4rem;
  border-radius: 1rem;
  text-align: center;
  position: relative;

  .toggle-dark {
    position: absolute;
    right: 1rem;
    top: 1rem;
    cursor: pointer;
  }

  .advice-count {
    color: ${(props) => props.theme.accentColor};
    font-size: 1.1rem;
    letter-spacing: 3.457px;
    margin-bottom: 2.4rem;
  }

  .advice-text {
    color: ${(props) => props.theme.mainTextColor};
    font-size: 2.4rem;
    letter-spacing: -0.257px;
  }

  .die-container {
    background-color: ${(props) => props.theme.accentColor};
    width: 6.4rem;
    height: 6.4rem;
    display: grid;
    place-items: center;
    border-radius: 50%;
    position: absolute;
    left: 50%;
    bottom: 0;
    transform: translate(-50%, 50%);
    cursor: pointer;

    .die-image {
      width: 2.4rem;
      height: 2.4rem;
    }
  }

  .divider {
    margin: 2.4rem 0;
  }
`;

export default App;
