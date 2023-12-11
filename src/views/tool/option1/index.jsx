import { useState, useEffect } from "react"
import { useLocation, useParams } from "react-router-dom"

function Option1(props) {
    const [count, setCount] = useState(0)
    const location = useLocation()
    const params = useParams()

    useEffect(() => {
        console.log(location, params)
    }, [])
    return (
        <div className="home">option1</div>
    )
}

export default Option1