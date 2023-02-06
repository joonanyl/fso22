const Notification = ({ message, lastDeleted }) => {
    const errorStyle = {
        color: "red",
        background: "lightgrey",
        fontSize: 20,
        borderStyle: "solid",
        borderRadius: 5,
        padding: 10,
        marginBottom: 10
    }

    if (message === null)
        return null

    if (message === 'delete')
        return (
            <div style={errorStyle}>
                {`Information of ${lastDeleted} has been deleted already.`}
            </div>
        )

    return (
        <div style={errorStyle}>
            {message}
        </div>
    )
}

export default Notification