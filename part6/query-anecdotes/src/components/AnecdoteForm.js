import { useContext } from 'react'
import NotificationContext from '../NotificationContext'
import { useMutation, useQueryClient } from "react-query"
import { createAnecdote } from "../requests"

const AnecdoteForm = () => {
  const [notification, dispatch] = useContext(NotificationContext)
  const queryClient = useQueryClient()

  const newAnecdoteMutation = useMutation(createAnecdote, {
    onSuccess: () => {
      queryClient.invalidateQueries('anecdotes')
    }
  })

  const onCreate = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    dispatch({ type: 'CREATE', payload: `anecdote '${content}' added` })
    setTimeout(() => {
      dispatch({ type: 'HIDE' })
    }, 5000)
    newAnecdoteMutation.mutate({ content, votes: 0 }, {
      onError: () => {
        dispatch({ type: 'ERROR', payload: `Anecdote content is too short, must have a minimum length of 5 characters` })
        setTimeout(() => {
          dispatch({ type: 'HIDE' })
        }, 5000)
      }
    })
  }

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
