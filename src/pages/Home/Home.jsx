import axios from 'axios';
import React, { useEffect, useState } from 'react'
import StandAlone from '../../components/LoadingScreen/StandAlone';
import Iteam from '../../components/Iteam/Iteam';
import Categories from '../../pages/Categories/Categories';

export default function Home() {

    const [iteam, setIteam] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    async function getIteam() {
        setIsLoading(true)
        const { data } = await axios.get("https://www.themealdb.com/api/json/v1/1/search.php?s=");
        setIteam(data.meals);
        setIsLoading(false)
    }

    useEffect(() => {
        getIteam()
    }, [])

    if (isLoading) {
        return <StandAlone />
    }

    return <div >
        <Categories />
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 ">
            {iteam.map((meal) => (
                <Iteam key={meal.idMeal} meal={meal} />
            ))}
        </div>
    </div>
}
