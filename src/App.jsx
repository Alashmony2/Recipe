import { createHashRouter, RouterProvider } from "react-router-dom";
import Sidebar from "./components/Sidebar/Sidebar";
import Home from "./pages/Home/Home";
import CategoryDetails from "./pages/CategoryDetails/CategoryDetails";
import MealDetails from "./pages/MealDetails/MealDetails";
import Areas from "./pages/Areas/Areas.jsx";

function App() {
  const router = createHashRouter([
    {
      path: "/",
      element: <Sidebar />,
      children: [
        { index: true, element: <Home /> },
        { path: "areas", element: <Areas /> },
        { path: "category/:categoryName", element: <CategoryDetails /> },
        { path: "mealdetails/:id", element: <MealDetails /> },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
