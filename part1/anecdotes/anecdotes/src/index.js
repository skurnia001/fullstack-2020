import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({ text, handleClick }) => {
  return (
    <button onClick={handleClick}>{text}</button>
  )
}

const Anecdote = ({ title, anecdote, point }) => {
  return (
    <div>
      <h1>{title}</h1>
      <p>{anecdote}</p>
      <p>has {point} votes</p>
    </div>
  )
}

const App = (props) => {
  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState(new Array(props.anecdotes.length).fill(0))
  const changePointsByIndex = () => () => {
    const copy = [...points]
    copy[selected]++
    setPoints(copy)
  }
  let idxMaxPoint = points.indexOf(Math.max(...points)); // courtesy https://stackoverflow.com/questions/11301438/return-index-of-greatest-value-in-an-array/11301464
  const changeSelected = () => () => setSelected(Math.floor(Math.random() * props.anecdotes.length))
  return (
    <div>
      <Anecdote title="Anecdote of the day" anecdote={props.anecdotes[selected]} point={points[selected]} />
      <Button text="vote" handleClick={changePointsByIndex()} />
      <Button text="next anecdote" handleClick={changeSelected()} />
      <Anecdote title="Anecdote with most votes" anecdote={props.anecdotes[idxMaxPoint]} point={points[idxMaxPoint]} />
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)