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
};

export class App extends React.Component<{}, State> {
  state: State = {
    hasClock: true,
    clockName: 'Clock-0',
  };

  componentDidMount(): void {
    document.addEventListener('contextmenu', (event: MouseEvent) => {
      event.preventDefault();

      this.setState({ hasClock: false });
    });

    document.addEventListener('click', () => {
      this.setState({ hasClock: true });
    });
  }

  updateClockName = (): void => {
    const prevClock = this.state.clockName;
    const clock = getRandomName();

    this.setState({
      clockName: clock,
    });

    // eslint-disable-next-line no-console
    console.debug(`Renamed from ${prevClock} to ${clock}`);
  };

  render() {
    const { hasClock, clockName } = this.state;

    return (
      <>
        <h1>React clock</h1>
        {hasClock && (
          <Clock name={clockName} updateClockName={this.updateClockName} />
        )}
      </>
    );
  }
}
