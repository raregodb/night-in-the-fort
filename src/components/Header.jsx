
import {LucideShoppingCart} from "lucide-react";
import {Button} from "@/components/ui/button.jsx";
import {ModeToggle} from "@/components/mode-toggle.jsx";
import {Link} from "react-router-dom";

export default function Header () {
    return (
        <header className={"flex justify-between items-center w-full h-[70px] bg-sidebar-accent p-4"}>
            <div className={"hover:cursor-pointer"}>
                <Link to="/">
                    <span className={"text-2xl font-bold"}>Night<span className={"text-xs"}> in the </span>Fort</span>
                </Link>

            </div>

            <div className="flex items-center justify-between gap-2">
                <Link to={"/"} className={"hover:scale-110 transition-all duration-75 h-full w-full"}>
                    <span className={"text-2xl font-bold"}>Recents </span>
                </Link>
                <Link to={"/cosmetics"} className={"hover:scale-110 h-full w-full"}>
                    <span className={"text-2xl font-bold"}>Search</span>
                </Link>
            </div>

            <div className={"flex items-center gap-2"}>
                <ModeToggle/>

                <Button>
                    <LucideShoppingCart/>
                </Button>
            </div>
        </header>
    )
}