import { useState } from "react"

const App = () => {
  const anecdotes = [
    "If it hurts, do it more often",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients",
  ]

  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState(new Array(anecdotes.length).fill(0))

  const getRandom = () => {
    return Math.floor(Math.random() * anecdotes.length)
  }

  const vote = (i) => {
    const copy = [...points]
    copy[i] += 1
    setPoints(copy)
  }

  const getMostVoted = () => {
    return points.indexOf(Math.max(...points))
  }

  return (
    <>
      <h2>Anecdote of the day</h2>
      <div>{anecdotes[selected]}</div>
      <div>Votes: {points[selected]}</div>
      <button onClick={() => vote(selected)}>Vote</button>
      <button onClick={() => setSelected(getRandom())}>
        Get a random anecdote
      </button>
      <h2>Most voted anecdote</h2>
      <div>{anecdotes[getMostVoted()]}</div>
    </>
  )
}

export default App
