import { useEffect, useState } from 'react';
import die from './assets/images/icon-dice.svg';
import dividerMobile from './assets/images/pattern-divider-mobile.svg';
import dividerDesktop from './assets/images/pattern-divider-desktop.svg';

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
        <Message count={count} />
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
          // src={dividerMobile}
          alt="Divider"
        />
      </StyledMain>
    </ThemeProvider>
  );
}

function Message(props: { count: number }) {
  return <p className="advice-count">Advice # {props.count}</p>;
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

    &:hover {
      box-shadow: 0 0 40px ${(props) => props.theme.accentColor};
    }

    .die-image {
      width: 2.4rem;
      height: 2.4rem;
    }
  }

  .divider {
    margin: 2.4rem 0;
    content: url(${dividerMobile});
  }

  @media all and (min-width: 1000px) {
    max-width: 54rem;
    padding: 4.8rem;
    border-radius: 1.5rem;

    .advice-count {
      font-size: 1.3rem;
      letter-spacing: 4.086px;
    }

    .advice-text {
      font-size: 2.8rem;
      letter-spacing: -0.3px;
    }

    .divider {
      content: url(${dividerDesktop});
      margin: 4rem 0;
    }
  }
`;

export default App;
