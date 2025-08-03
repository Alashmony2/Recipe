import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import StandAlone from "../../components/LoadingScreen/StandAlone";

export default function MealDetails() {
    const { id } = useParams();
    const [meal, setMeal] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    async function getMealDetails() {
        setIsLoading(true);
        const { data } = await axios.get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
        setMeal(data.meals[0]);
        setIsLoading(false);
    }

    useEffect(() => {

        getMealDetails();
    }, [id]);

    if (isLoading) return <StandAlone />;

    return (
        <>
            <h1 className="font-bold text-5xl -mt-7">{meal.strMeal}</h1>
            <div className="grid lg:grid-cols-3 pt-7">
                <div className="img">
                    <img src={meal.strMealThumb} className="rounded-3xl" alt={meal.strMeal} />
                    <div className="text-center pt-8 space-x-5">
                        {meal.strYoutube && (
                            <a href={meal.strYoutube} target="_blank" rel="noopener noreferrer">
                                <button className="px-4 py-2 rounded-lg bg-[#DC2626] text-white">
                                    <span><i className="fa-brands fa-youtube pr-2"></i></span>Youtube
                                </button>
                            </a>
                        )}
                        {meal.strSource && (
                            <a href={meal.strSource} target="_blank" rel="noopener noreferrer">
                                <button className="px-4 py-2 rounded-lg bg-[#21BA75] text-white">
                                    <span><i className="fa-solid fa-globe pr-2"></i></span>Source
                                </button>
                            </a>
                        )}
                    </div>
                </div>

                <div className="px-4">
                    <p>{meal.strInstructions}</p>
                </div>

                <div className="cart p-6 rounded-3xl h-fit bg-white dark:bg-gray-800 shadow-lg dark:shadow-gray-800/50 transition-colors duration-300">
                    <h3 className="font-semibold text-2xl text-gray-900 dark:text-white mb-4">Ingredients</h3>
                    <hr className="h-px bg-gray-200 dark:bg-gray-600 border-0" />
                    <div className="mt-6 space-y-4">
                        {Array.from({ length: 20 }).map((_, i) => {
                            const ingredient = meal[`strIngredient${i + 1}`];
                            const measure = meal[`strMeasure${i + 1}`];
                            if (ingredient && ingredient.trim()) {
                                return (
                                    <div key={i} className="group">
                                        <div className="flex justify-between items-center py-2 px-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200">
                                            <span className="text-gray-800 dark:text-gray-200 font-medium">{ingredient}</span>
                                            <span className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-sm font-medium px-3 py-1 rounded-full">
                                                {measure}
                                            </span>
                                        </div>
                                        {i < 19 && meal[`strIngredient${i + 2}`] && (
                                            <hr className="h-px bg-gray-100 dark:bg-gray-700 border-0 my-1" />
                                        )}
                                    </div>
                                );
                            }
                            return null;
                        })}
                    </div>
                </div>
            </div>
        </>
    );
}
