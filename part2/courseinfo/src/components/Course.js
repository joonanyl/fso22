const Header = ({ name }) => {
    return <h3>{name}</h3>
}

const Part = ({ name, exercises }) => {
    return <p>{name + " " + exercises}</p>
}

const Content = ({ parts }) => {
    return (
        <>
            {parts.map(part =>
                <Part key={part.id} name={part.name} exercises={part.exercises} />
            )}
        </>
    )
}

const Total = ({ parts }) => {
    const total = parts.reduce((previousValue, currentValue) => previousValue + currentValue.exercises, 0)

    return <strong>total of {total} exercises</strong>
}

const Course = ({ course }) => {
    return (
        <>
            <Header name={course.name} />
            <Content parts={course.parts} />
            <Total parts={course.parts} />
        </>
    )
}

export default Course