import React from 'react'

export default function Result({ score, playAgain }) {
  return (
    <div className="score-board">
      <div className="score">You scored {score} / 5 correct answers</div>
      <button className="playBtn" onClick={playAgain}>Play Again</button>
    </div>
  )
}
