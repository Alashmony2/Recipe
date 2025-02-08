import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import Categories from "../Categories/Categories";
import StandAlone from "../../components/LoadingScreen/StandAlone";

export default function CategoryDetails() {
    const { categoryName } = useParams(); 
    const [meals, setMeals] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    async function getMeals() {
        setIsLoading(true);
        const { data } = await axios.get(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${categoryName}`);
        setMeals(data.meals);
        setIsLoading(false);
    }

    useEffect(() => {
        getMeals();
    }, [categoryName]);

    if (isLoading) return <StandAlone/>;

    return (
        <div className="">
            <Categories />
            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                {meals.map((meal) => (
                    <div key={meal.idMeal} className="relative max-w-72 mt-20 group transition-transform duration-1000 hover:scale-105 w-full">
                        <div className="rounded-[2rem] overflow-hidden shadow-lg bg-white">
                            <div className="absolute -mt-10 w-full flex justify-center">
                                <div className="h-36 w-36 transition-transform duration-500 group-hover:rotate-[360deg]">
                                    <img
                                        src={meal.strMealThumb}
                                        className="rounded-full object-cover shadow-2xl"
                                        alt={meal.strMeal}
                                    />
                                </div>
                            </div>
                            <div className="px-6 mt-32 mb-7">
                                <h3 className="font-semibold text-xl text-center pt-2 mb-1 text-black line-clamp-1">
                                    {meal?.strMeal}
                                </h3>
                                <div className="flex justify-center mt-4">
                                    <Link to={`/mealdetails/${meal.idMeal}`}>
                                        <button className="px-8 py-2 bg-[#059569] text-white rounded-3xl text-base font-semibold hover:bg-[#059679] hover:scale-105 transition-all">
                                            View Recipe
                                        </button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
