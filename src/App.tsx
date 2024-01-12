import React from 'react';
import './App.scss';
import { Clock } from './components/Clock/Clock';

function getRandomName(): string {
  const value = Date.now().toString().slice(-4);

  return `Clock-${value}`;
}

type State = {
  hasClock: boolean;
  clockName: string;
  previousClockName: string;
};

export class App extends React.Component<{}, State> {
  state: State = {
    hasClock: true,
    clockName: 'Clock-0',
    previousClockName: '',
  };

  timerId = 0;

  componentDidMount(): void {
    document.addEventListener('contextmenu', (event: MouseEvent) => {
      event.preventDefault();

      this.setState({ hasClock: false });
      clearInterval(this.timerId);
    });

    this.timerId = window.setInterval(() => {
      this.setState((prevState) => ({
        clockName: getRandomName(),
        previousClockName: prevState.clockName,
      }));
      // eslint-disable-next-line no-console
      console.debug(`Renamed from ${this.state.previousClockName} to ${this.state.clockName}`);
    }, 3300);

    document.addEventListener('click', () => {
      this.setState({ hasClock: true });
    });
  }

  render() {
    const { hasClock, clockName } = this.state;

    return (
      <>
        <h1>React clock</h1>
        {hasClock && <Clock name={clockName} />}
      </>
    );
  }
}
