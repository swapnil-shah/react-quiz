import React, { Component } from 'react'
import './App.css';
import QuestionBox from './Components/QuestionBox'
import Result from './Components/Result'
export class App extends Component {
  state = {
    questionBank: [],
    score: 0,
    responses: 0
  };
  getQuestions = () => {
    fetch("https://opentdb.com/api.php?amount=5&category=9&type=multiple")
      .then((response) => {
        return response.json();
      })
      .then((json) => {
        this.setState({
          questionBank: json.results
        });
      })
      .catch(function (ex) {
        console.log("An error occurred while parsing!", ex);
      });
  };
  computeAnswer = (answer, correctAnswer) => {
    if (answer === correctAnswer) {
      this.setState({
        score: this.state.score + 1
      })
    }
    this.setState({
      responses: this.state.responses < 5 ? this.state.responses + 1 : 5
    })
  }
  playAgain = () => {
    this.getQuestions();
    this.setState({
      score: 0,
      responses: 0
    })
  }
  componentDidMount() {
    this.getQuestions()
  }
  render() {
    console.log("this.state.options", this.state.questionBank)
    return (
      <div className="container">
        <div className="title">QuizBee</div>
        {this.state.questionBank.length > 0 && this.state.responses < 5 && this.state.questionBank.map(({ question, correct_answer, incorrect_answers }, index) => {
          const options = [...incorrect_answers, correct_answer]
          return <QuestionBox
            question={question}
            options={options}
            selected={answer => this.computeAnswer(answer, correct_answer)}
            key={index}
          />
        })
        }
        {this.state.responses === 5 ? (<Result score={this.state.score} playAgain={this.playAgain} />) : null}
      </div >
    )
  }
}

export default App
