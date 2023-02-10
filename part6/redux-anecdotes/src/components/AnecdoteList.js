import { useSelector, useDispatch } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { hideNotification, showNotification } from '../reducers/notificationReducer'
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

    const handleVote = (id, content) => {
        dispatch(voteAnecdote(id))
        dispatch(showNotification("you voted '" + content + "'"))
        setTimeout(() => {
            dispatch(hideNotification())
        }, 5000)
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
                        has {anecdote.votes}
                        <button onClick={() => handleVote(anecdote.id, anecdote.content)}>vote</button>
                    </div>
                </div>
            )}
        </>
    )
}

export default AnecdoteList