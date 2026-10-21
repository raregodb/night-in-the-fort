import Layout from "@/components/Layout.jsx";
import Shop from "@/components/shop/Shop.jsx";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Home from "@/pages/Home.jsx";
import SearchPage from "@/pages/SearchPage.jsx";
import NotFoundPage from "@/pages/NotFound.jsx";
import CosmeticItem from "@/components/cosmetics/CosmeticItem.jsx";
import OfferPage from "@/pages/OfferPage.jsx";
import CartPage from "@/pages/CartPage.jsx";
import WishlistPage from "@/pages/WishlistPage.jsx";
import ErrorPage from "@/pages/ErrorPage.jsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        errorElement: <ErrorPage />,
        children: [
            {index: true, element: <Home />},
            {path: "shop", element: <Shop />},
            {path: "shop/:offerId", element: <OfferPage />},
            {path: "cosmetics", element: <SearchPage />},
            {path: "cosmetics/br/:id", element: <CosmeticItem />},
            {path: "cart", element: <CartPage />},
            {path: "wishlist", element: <WishlistPage />},
            {path: "*", element: <NotFoundPage />},
        ],
    },
])

function App() {
    return <RouterProvider router={router} />
}

export default App
