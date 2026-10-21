import Header from "@/components/Header.jsx";
import Footer from "@/components/Footer.jsx";
import {Outlet, ScrollRestoration} from "react-router-dom";

export default function Layout ({children}) {
    return (
        <div className={"flex min-h-screen w-full flex-col"}>
            <Header/>
            <main className={"w-full flex flex-1 flex-col items-center gap-1 md:gap-4 p-2 md:p-4"}>
                {children ?? <Outlet/>}
            </main>
            <Footer/>
            <ScrollRestoration/>
        </div>
    )
}
