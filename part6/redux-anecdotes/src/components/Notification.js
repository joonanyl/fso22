import { useSelector } from "react-redux"

const Notification = () => {
  const notification = useSelector(({ notification }) => {
    return notification
  })
  const style = notification !== ''
    ? {
      border: 'solid',
      padding: 10,
      borderWidth: 1
    }
    : {
      display: 'none'
    }
  return (
    <div style={style}>
      {notification}
    </div>
  )
}

export default Notification