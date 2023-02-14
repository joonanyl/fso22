import { useSelector, useDispatch } from 'react-redux'
import { vote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'
import Notification from './Notification'

const AnecdoteList = () => {
    const anecdotes = useSelector(({ filter, anecdotes }) => {
        if (filter === '') {
            return [...anecdotes]
        }
        return [...anecdotes.filter((anecdote) => anecdote.content.toLowerCase().includes(filter.toLowerCase()))]
    })
    const dispatch = useDispatch()

    const sortByVotes = (a, b) => b.votes - a.votes

    const handleVote = (anecdote) => {
        const changedAnecdote = { ...anecdote, votes: anecdote.votes + 1 }
        dispatch(vote(changedAnecdote))
        dispatch(setNotification(`you voted '${anecdote.content}'`, 5))
    }

    return (
        <>
            <h2>Anecdotes</h2>
            <Notification />
            {anecdotes.sort(sortByVotes).map(anecdote =>
                <div key={anecdote.id}>
                    <div>
                        {anecdote.content}
                    </div>
                    <div>
                        has {anecdote.votes} votes
                        <button onClick={() => handleVote(anecdote)}>vote</button>
                    </div>
                </div>
            )}
        </>
    )
}

export default AnecdoteList