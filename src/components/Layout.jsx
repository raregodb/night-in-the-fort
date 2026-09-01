import Header from "@/components/Header.jsx";
import Footer from "@/components/Footer.jsx";
import {Outlet} from "react-router-dom";

export default function Layout () {
    return (
        <div className={"w-full h-full"}>
            <Header/>
            <main className={"h-[calc(100vh-110px)] w-full flex flex-col justify-between items-center gap-1 md:gap-4 p-1 md:p-4 overflow-y-auto"}>
                <Outlet/>
            </main>
            <Footer/>
        </div>
    )
}
