import React from 'react';

type State = {
  today: Date;
};

type Props = {
  name: string;
  updateClockName: () => void;
};

export class Clock extends React.Component<Props, State> {
  state: State = {
    today: new Date(),
  };

  timerIdTodo = 0;

  timerIdClock = 0;

  componentDidMount() {
    this.timerIdTodo = window.setInterval(() => {
      this.setState({
        today: new Date(),
      });

      // eslint-disable-next-line no-console
      console.info(this.state.today.toUTCString().slice(-12, -4));
    }, 1000);

    this.timerIdClock = window.setInterval(() => {
      this.props.updateClockName();
    }, 3300);
  }

  componentWillUnmount() {
    window.clearInterval(this.timerIdTodo);
    window.clearInterval(this.timerIdClock);
  }

  render() {
    return (
      <div className="Clock">
        <strong className="Clock__name">
          {this.props.name}
        </strong>

        {' time is '}

        <span className="Clock__time">
          {this.state.today.toUTCString().slice(-12, -4)}
        </span>
      </div>
    );
  }
}
