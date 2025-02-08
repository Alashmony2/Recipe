import React from "react";
import { Link } from "react-router-dom";

export default function Iteam({meal}) {

  return (
    <div className="relative max-w-72  mt-20 group transition-transform duration-1000 hover:scale-105 w-full">
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
          <h3 className="font-semibold text-xl text-center pt-2 mb-1 text-black">
          {meal?.strMeal}
          </h3>
          <p className="text-[#059672]  text-center italic pb-3">
          <i className="fa-solid fa-earth-americas"></i>  {meal.strArea}
          </p>
          <div className="flex justify-center mt-4">
            <Link to={`/mealdetails/${meal.idMeal}`} className="px-8 py-2 bg-[#059569] text-white rounded-3xl text-base font-semibold hover:bg-[#059679] hover:scale-105 transition-all">
              View Recipe
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
