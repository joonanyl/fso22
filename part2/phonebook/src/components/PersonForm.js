const PersonForm = ({ onSubmit, nameValue, numberValue, nameOnChange, numberOnChange }) => {
    return (
        <>
            <form onSubmit={onSubmit}>
                <h2>Add a new</h2>
                <div>
                    name: <input value={nameValue} onChange={nameOnChange} />
                </div>
                <div>
                    number: <input value={numberValue} onChange={numberOnChange} />
                </div>
                <div>
                    <button type="submit">add</button>
                </div>
            </form>
        </>
    )
}

export default PersonForm