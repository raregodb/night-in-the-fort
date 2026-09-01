
import {useEffect, useRef, useState} from "react";
import BrItem from "@/components/shop/BrItem.jsx";

const PAGE_SIZE = 24;

export default function CosmeticsList  (props) {
    const {items, pageSize = PAGE_SIZE} = props;

    const [visibleCount, setVisibleCount] = useState(pageSize);
    const sentinelRef = useRef(null);

    useEffect(() => {
        setVisibleCount(pageSize);
    }, [items, pageSize]);

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

    return (
        <div className={"flex flex-col h-full"}>
            {!items ? (
                <div>Loading...</div>
            ) : (
                <>
                    <div className={"grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-2"}>
                        {items.slice(0, visibleCount).map((item) => <BrItem key={item.id} item={item}/>)}
                    </div>

                    {visibleCount < items.length && (
                        <div ref={sentinelRef} className={"h-12 w-full shrink-0 flex items-center justify-center"}>
                            Loading...
                        </div>
                    )}
                </>
            )}
        </div>
    );
}
