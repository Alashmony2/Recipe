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

                <div className="cart p-5 rounded-3xl h-fit bg-white">
                    <h3 className="font-semibold text-2xl">Ingredients</h3>
                    <hr className="mt-2 h-1 bg-gray-300" />
                    <div className="mt-5">
                        {Array.from({ length: 20 }).map((_, i) => {
                            const ingredient = meal[`strIngredient${i + 1}`];
                            const measure = meal[`strMeasure${i + 1}`];
                            if (ingredient && ingredient.trim()) {
                                return (
                                    <div key={i}>
                                        <div className="flex justify-between">
                                            <span>{ingredient}: </span>
                                            <span>{measure}</span>
                                        </div>
                                        <hr className="mt-2 h-[.10rem] bg-gray-300" />
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
