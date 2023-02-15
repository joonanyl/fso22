import { useMutation, useQuery, useQueryClient } from 'react-query'
import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { getAnecdotes, updateAnecdote } from './requests'
import { useReducer } from 'react'
import NotificationContext from './NotificationContext'

const notificationReducer = (state, action) => {
  switch (action.type) {
    case 'VOTE':
      return action.payload
    case 'CREATE':
      return action.payload
    case 'ERROR':
      return action.payload
    case 'HIDE':
      return null
    default:
      return state
  }
}

const App = () => {
  const [notification, dispatch] = useReducer(notificationReducer, '')

  const queryClient = useQueryClient()

  const updateNoteMutation = useMutation(updateAnecdote, {
    onSuccess: () => {
      queryClient.invalidateQueries('anecdotes')
    }
  })

  const handleVote = (anecdote) => {
    updateNoteMutation.mutate({ ...anecdote, votes: anecdote.votes + 1 })
    dispatch({ type: 'VOTE', payload: `anecdote '${anecdote.content}' voted` })
    setTimeout(() => {
      dispatch({ type: 'HIDE' })
    }, 5000)
  }

  const result = useQuery('anecdotes', getAnecdotes, { retry: false, refetchOnWindowFocus: false })

  if (result.isError) {
    return <div>Cannot get anecdotes due to server problems. Check again later!</div>
  }

  if (result.isLoading) {
    return <div>loading data...</div>
  }

  const anecdotes = result.data

  return (
    <NotificationContext.Provider value={[notification, dispatch]} >
      <div>
        <h3>Anecdote app</h3>
        <Notification notification={notification} />
        <AnecdoteForm />
        {anecdotes.map(anecdote =>
          <div key={anecdote.id}>
            <div>
              {anecdote.content}
            </div>
            <div>
              has {anecdote.votes}
              <button onClick={() => handleVote(anecdote)}>vote</button>
            </div>
          </div>
        )}
      </div>
    </NotificationContext.Provider>
  )
}

export default App
