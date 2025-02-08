import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom';
import StandAlone from '../../components/LoadingScreen/StandAlone';

export default function Categories() {

    const [category, setCategory] = useState([]);
    const [isLoading, setIsLoading] = useState(true)

    async function getCategory() {
        setIsLoading(true)
        const { data } = await axios.get("https://www.themealdb.com/api/json/v1/1/categories.php");
        setCategory(data.categories);
        setIsLoading(false)
    }

    useEffect(() => {
        getCategory()
    }, [])

    if (isLoading) {
        return <StandAlone />
    }

    return (<>
        <div>
            <h1 className="font-extrabold text-4xl text-[#E97F31]">Learn, Cook, Eat Your Food</h1>
        </div>
        <div className="py-8 flex flex-wrap gap-5">
            <NavLink to={'/'} className="border border-gray-400 px-4 py-2 rounded-3xl text-gray-500 hover:bg-white hover:text-gray-600 hover:shadow-xl transition-all">All</NavLink>
            {category.map((cat) => (
                <NavLink key={cat.idCategory} to={`/category/${encodeURIComponent(cat.strCategory)}`}
                    className="border border-gray-400 px-4 py-2 rounded-3xl text-gray-500 hover:bg-white hover:text-gray-600 hover:shadow-xl transition-all">
                    {cat.strCategory}
                </NavLink>
            ))}
        </div>
    </>

    )
}
