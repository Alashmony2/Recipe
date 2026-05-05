import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import StandAlone from "../../components/LoadingScreen/StandAlone";
import Iteam from './../../components/Iteam/Iteam';

export default function AreaPage() {
    const { areaPage } = useParams();
    const [meals, setMeals] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    async function getMeals() {
        setIsLoading(true);
        const { data } = await axios.get(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${areaPage}`);
        console.log(areaPage);

        console.log(data.meals);

        setMeals(data.meals || []);
        setIsLoading(false);
    }

    useEffect(() => {
        getMeals();
    }, [areaPage]);

    if (isLoading) return <StandAlone />;
    if (meals.length === 0) {
        return <>
            <p className="font-extrabold text-4xl text-[#E97F31]">{areaPage}</p>
            <p className="pt-7 text-center text-gray-900 text-[30px] dark:text-gray-100">No meals found for this area.</p>
            <div className="text-center pt-9">
                <Link to="/areas" className="  bg-[#E97F31] mt-4 px-8 py-2 rounded-3xl text-center text-white hover:bg-[#d66d20]">Back to Areas</Link>
            </div>
        </>
    }

    return <>
        <div>
            <p className="font-extrabold text-4xl text-[#E97F31]">{areaPage}</p>
        </div>
        <div className="pt-5 grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 place-items-center">
            {meals.map((meal) => (
                <Iteam key={meal.idMeal} meal={meal} />
            ))}
        </div>
        <div className="text-center pt-9">
            <Link to="/areas" className="  bg-[#E97F31] mt-4 px-8 py-2 rounded-3xl text-center text-white hover:bg-[#d66d20]">Back to Areas</Link>
        </div>
    </>
}
