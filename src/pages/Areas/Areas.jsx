import axios from "axios";
import { useEffect, useState } from "react";
import StandAlone from './../../components/LoadingScreen/StandAlone';

export default function Areas() {
    const [areas, setAreas] = useState([]);
    const [isLoading, setIsLoading] = useState(true)

    async function getAreas() {
        setIsLoading(true)
        const { data } = await axios.get("https://www.themealdb.com/api/json/v1/1/list.php?a=list");
        setAreas(data.meals);
        setIsLoading(false)
    }

    useEffect(() => {
        getAreas()
    }, [])

    if (isLoading) {
        return <StandAlone />
    }
    return <>
        <div>
            <p className="font-extrabold text-4xl text-[#E97F31]">Explore cuisines by region</p>
        </div>
        <div className="pt-5 flex flex-wrap gap-5">
            {areas.map((area) => (
                <div key={area.strCountry} className="border border-gray-400 px-4 py-2 rounded-3xl text-gray-500 hover:bg-white hover:text-gray-600 hover:shadow-xl transition-all cursor-pointer">
                    {area.strArea}
                </div>
            ))}
        </div>
    </>
}
