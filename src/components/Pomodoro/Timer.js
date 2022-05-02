import React, { Component } from 'react';
import './Timer.css';

export default class Timer extends Component {
    constructor(){
        super();

        //initialState
        this.state = {
            alert:{
                type:'',
                message:'',
            }, 

            time: 0
        };

        this.times ={
            defaultTime: 1500, //25 min
            shortBreak: 300, // 5 min
            longBreak: 900, // 15 min
        }
    }


    componentDidMount(){

        //establece tiempo por defecto cuando el componente sea montado
        this.setDefaultTime()
    }

    setDefaultTime() {
        this.setState({
            time: this.times.defaultTime
        })
    }

    //buttons
    setTimeForWork = () => {
        this.setState({
            alert: {
                type: 'work',
                message: 'Working!'    
            }
        })

        this.setTime(this.times.defaultTime);

    }
    setTimeForShortBreak = () => {
        this.setState({
            alert: {
                type: 'shortBreak',
                message: 'Short Break!'    
            }
        })
        
        this.setTime(this.times.shortBreak);
    }
    setTimeForLongBreak = () => {
        this.setState({
            alert: {
                type: 'longBreak',
                message: 'Long Break!'    
            }
        })
        this.setTime(this.times.longBreak);
    }

    setTime = (newTime) => {
        this.restartInterval();
        this.setState({
            time: newTime,
        })
    }

    restartInterval = () => {
        clearInterval(this.interval);

        this.interval = setInterval(this.countDown, 1000);
    }

    countDown = () => {
        if(this.state.time === 0){
            this.setState({
                alert: {
                    type: 'Beep',
                    message: 'Beeeeeeeeeep'
                }
            });
        }
        else{
            this.setState({
                time: this.state.time - 1
            });
        }
    }

    displayTimer(seconds){
        let m = Math.floor((seconds / 60) % 60);
        m = ( m < 10 ) ? '0' + m : m;

        let s = seconds % 60;
        s = ( s < 10 ) ? '0' + s : s;
        
        return `${m} : ${s}`;
    }

  render() {
      const {alert:{message, type}, time} =this.state;
    return (
      <div className = "Pomodoro">
          <div className = {`alert ${type}`}>
                {message}
          </div>

          <div className = {`timer ${type}`}>
                {this.displayTimer(time)}
          </div>

          <div className = "types">
              <button 
                className = "start"
                onClick= {this.setTimeForWork}
              > 
                    Start Working
              </button>
              <button 
                className = "short"
                onClick= {this.setTimeForShortBreak}
                > 
                Short Break
              </button>
              <button 
                className = "long"
                onClick= {this.setTimeForLongBreak}
                > 
                Long Break
              </button>
          </div>
      </div>
    )
  }
}
