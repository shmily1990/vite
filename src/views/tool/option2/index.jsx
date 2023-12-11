import { useState, useEffect } from "react"
import { useLocation, useParams } from "react-router-dom"

function Option2(props) {
    const [count, setCount] = useState(0)
    const location = useLocation()
    const params = useParams()

    useEffect(() => {
        console.log(location, params)
    }, [])
    return (
        <div className="home">option2</div>
    )
}

export default Option2