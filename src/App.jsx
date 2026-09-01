import Layout from "@/components/Layout.jsx";
import Shop from "@/components/shop/Shop.jsx";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Home from "@/pages/Home.jsx";
import SearchPage from "@/pages/SearchPage.jsx";
import NotFoundPage from "@/pages/NotFound.jsx";
import CosmeticItem from "@/components/cosmetics/CosmeticItem.jsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            {index: true, element: <Home />},
            {path: "shop", element: <Shop />},
            {path: "cosmetics", element: <SearchPage />},
            {path: "cosmetics/br/:id", element: <CosmeticItem />},
            {path: "*", element: <NotFoundPage />},
        ],
    },
])

function App() {
    return <RouterProvider router={router} />
}

export default App
