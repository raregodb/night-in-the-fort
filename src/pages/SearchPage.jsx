import CosmeticsList from "@/components/cosmetics/CosmeticsList.jsx";
import {useEffect, useRef, useState} from "react";
import {getAllCosmetics} from "@/lib/api.js";
import Search from "@/components/cosmetics/Search.jsx";

export default function SearchPage (props) {
    const [items, setItems] = useState(null);
    const [finalItems, setFinalItems] = useState(null);
    const [search, setSearch] = useState("");

    const timer = useRef(null);

    useEffect(() => {
        try {
            getAllCosmetics().then((data) => {
                setItems(data.data);
                setFinalItems(data.data);
            });
        }
        catch (e) {
            console.error(e);
        }
    }, []);

    useEffect(() => {
        if (!finalItems) return;
        if (!search) setFinalItems([...items]);
        if (timer.current) clearTimeout(timer.current);
        timer.current = setTimeout(() => {
            console.log("search")
            setFinalItems(() => finalItems.filter((item) => item.name.includes(search)));
            console.log(finalItems)
        }, 3000)
    }, [search])

    const handleSearchChange = (e) => {
        setSearch(e.target.value);
        console.log(search);
        // if (timer.current) clearTimeout(timer.current);
        // timer.current = setTimeout(() => {
        //
        // }, 1000)
        // setSearch(e.target.value);
    }


    return (
        <div className="w-full h-full flex flex-col">
            <Search value={search} onChange={handleSearchChange} />
            <CosmeticsList items={finalItems}/>
        </div>
    )
}