import { useState } from "react"

const Statistics = ({ good, neutral, bad, all, avg, positive }) => {
  if (all !== 0) {
    return (
      <>
        <h2>Statistics</h2>
        <table>
          <tbody>
            <tr>
              <StatisticLine statistic={good} text="Good" />
            </tr>
            <tr>
              <StatisticLine statistic={neutral} text="Neutral" />
            </tr>
            <tr>
              <StatisticLine statistic={bad} text="Bad" />
            </tr>
            <tr>
              <StatisticLine statistic={all} text="All" />
            </tr>
            <tr>
              <StatisticLine statistic={avg} text="Average" />
            </tr>
            <tr>
              <StatisticLine statistic={positive} text="Positive" />
            </tr>
          </tbody>
        </table>
      </>
    )
  }
  return <p>No feedback given</p>
}

const StatisticLine = ({ text, statistic }) => {
  return (
    <>
      <td>{text}</td>
      <td>{statistic}</td>
    </>
  )
}

const Button = ({ clickHandler, text }) => (
  <button onClick={clickHandler}>{text}</button>
)

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [all, setAll] = useState(0)

  const incrementGood = (value) => {
    setGood(value)
    setAll(all + 1)
  }

  const incrementNeutral = (value) => {
    setNeutral(value)
    setAll(all + 1)
  }

  const incrementBad = (value) => {
    setBad(value)
    setAll(all + 1)
  }

  let avg = (good - bad) / all

  let positive = (good / all) * 100 + "%"

  return (
    <div>
      <h2>Give feedback</h2>
      <Button clickHandler={() => incrementGood(good + 1)} text="Good" />
      <Button
        clickHandler={() => incrementNeutral(neutral + 1)}
        text="Neutral"
      />
      <Button clickHandler={() => incrementBad(bad + 1)} text="Bad" />
      <Statistics
        good={good}
        neutral={neutral}
        bad={bad}
        all={all}
        avg={avg}
        positive={positive}
      />
    </div>
  )
}

export default App
