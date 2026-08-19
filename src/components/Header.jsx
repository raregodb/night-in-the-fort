
import {LucideShoppingCart} from "lucide-react";
import {Button} from "@/components/ui/button.jsx";
import {ModeToggle} from "@/components/mode-toggle.jsx";

export default function Header () {
    return (
        <header className={"flex justify-between items-center w-full h-[70px] bg-sidebar-accent p-4"}>
            <div>
                <span className={"text-2xl font-bold"}>Night<span className={"text-xs"}> in the </span>Fort</span>
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