import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {getBrCosmeticById} from "@/lib/api.js";
import {getRarity} from "@/lib/rarity.js";
import {getColors} from "@/lib/utils.js";
import {Badge} from "@/components/ui/badge.jsx";

export default function CosmeticItem() {
    const pathId = useParams().id;
    const [item, setItem] = useState(null);
    const [status, setStatus] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!pathId) return
        const response = getBrCosmeticById(pathId).then((data) => {
            setStatus(data.status);
            if (data.error) setError(data.error);
            if (data.data) setItem(data.data);
        })
    }, [pathId]);

    if (!status) return <div>Loading...</div>

    if (status === 404) return <div>Not found</div>;
    else if (error) return <div>Error: {error.message}</div>;

    return (
        <div className={"flex w-full h-full gap-4 justify-between items-center"}>
            <div className={`flex-1 flex-col border-4 border-white w-fit h-full`}
                 style={{background: item.series?.colors ? getColors(item.series.colors) : getRarity(item.rarity.value).color }}
            >
                {item.images?.icon || item.images?.featured ? (
                    <div className={`w-fit h-full relative`}>
                        {item.series?.image && (
                            <img
                                src={item.series?.image}
                                alt={`${item.name} Background`}
                                className={`absolute inset-0 z-0 h-full w-full object-cover`}
                            />
                        )}
                        <img
                            src={item.images?.featured || item.images?.icon}
                            alt={`${item.name} Icon`}
                            className={`relative z-10 h-full object-contain`}
                        />
                    </div>
                ) : (
                    <div className={`h-full w-full aspect-square object-contain`}
                         style={{backgroundColor: getRarity(item.rarity?.value).color}}>
                        <span className={"text-2xl"}>Oops! No Icon</span>
                    </div>
                )}
            </div>

            <div className={`flex-1 flex flex-col border-4 border-gray-500 w-full h-full justify-items-center items-center justify-start p-2 gap-2`}>
                <h1 className={`text-5xl font-bold`}>{item.name}</h1>
                <div className={`text-2xl flex gap-2 items-center justify-between`}>
                    {item.rarity?.displayValue && (
                        <Badge className={"text-xl"} style={{backgroundColor: getRarity(item.rarity?.value).color}}>{item.rarity?.displayValue}</Badge>
                    )}
                    {item.type?.displayValue && (
                        <Badge className={"text-xl"}>{item.type?.displayValue}</Badge>
                    )}
                </div>
                <div className={"flex flex-col items-center justify-items-center"}>
                    {item.introduction?.text && (
                        <span>{item.introduction.text}</span>
                    )}
                    {item.set?.text && (
                        <span>{item.set.text}</span>
                    )}
                    {item.description && (
                        <span className={"text-2xl py-4"}>{item.description}</span>
                    )}
                </div>
            </div>
        </div>
    )
}