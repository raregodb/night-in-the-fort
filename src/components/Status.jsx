import {Link} from "react-router-dom";
import {buttonVariants} from "@/components/ui/button.jsx";

export function Loading({children = "Загрузка..."}) {
    return <div className="flex w-full items-center justify-center p-8 text-muted-foreground">{children}</div>
}

export function ErrorMessage({error}) {
    return (
        <div className="flex w-full flex-col items-center justify-center gap-2 p-8 text-center">
            <span className="text-lg font-semibold">Не удалось загрузить данные</span>
            <span className="text-muted-foreground">{error?.message}</span>
        </div>
    )
}

export function EmptyState({title, description, to, action}) {
    return (
        <div className="flex w-full flex-col items-center justify-center gap-3 p-8 text-center">
            <span className="text-2xl font-semibold">{title}</span>
            {description && <span className="text-muted-foreground">{description}</span>}
            {to && <Link to={to} className={buttonVariants({size: "lg"})}>{action}</Link>}
        </div>
    )
}
