import {useEffect, useRef, useState} from "react";
import BrItem from "@/components/shop/BrItem.jsx";
import {Loading} from "@/components/Status.jsx";

const PAGE_SIZE = 24;

export default function CosmeticsList  (props) {
    const {items, pageSize = PAGE_SIZE} = props;

    const [visibleCount, setVisibleCount] = useState(pageSize);
    const [prevItems, setPrevItems] = useState(items);
    const sentinelRef = useRef(null);

    if (items !== prevItems) {
        setPrevItems(items);
        setVisibleCount(pageSize);
    }

    useEffect(() => {
        const sentinel = sentinelRef.current;
        if (!sentinel || !items || visibleCount >= items.length) return;

        const observer = new IntersectionObserver((entries) => {
            if (!entries[0].isIntersecting) return;
            setVisibleCount((count) => Math.min(count + pageSize, items.length));
        }, {rootMargin: "400px"});

        observer.observe(sentinel);
        return () => observer.disconnect();
    }, [items, visibleCount, pageSize]);

    if (!items) return <Loading />;
    if (!items.length) return <div className="p-8 text-center text-muted-foreground">Ничего не найдено</div>;

    return (
        <div className={"flex flex-col h-full"}>
            <div className={"grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-2"}>
                {items.slice(0, visibleCount).map((item) => <BrItem key={item.id} item={item}/>)}
            </div>

            {visibleCount < items.length && (
                <div ref={sentinelRef} className={"h-12 w-full shrink-0 flex items-center justify-center"}>
                    Загрузка...
                </div>
            )}
        </div>
    );
}
