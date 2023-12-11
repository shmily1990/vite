import { useState, useEffect } from "react"
import { useLocation, useParams } from "react-router-dom"

function Home(props) {
    const [count, setCount] = useState(0)
    const location = useLocation()
    const params = useParams()

    useEffect(() => {
        console.log(location, params)
    }, [])
    return (
        <div className="home">首页</div>
    )
}

export default Home