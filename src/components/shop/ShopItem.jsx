import {Card, CardContent, CardFooter, CardHeader} from "@/components/ui/card.jsx";
import BrItem from "@/components/shop/BrItem.jsx";
import InstrumentItem from "@/components/shop/InstrumentItem.jsx";
import TrackItem from "@/components/shop/TrackItem.jsx";
import CarItem from "@/components/shop/CarItem.jsx";
import {useMediaQuery} from "@/hooks/use-media-query.js";
import {getColors} from "@/lib/utils.js";


export default function ShopItem (props) {
    const {entry} = props;
    const {layout} = entry;
    const isDesktop = useMediaQuery("(min-width: 640px)");

    if (!entry) return <div>Loading...</div>

    if (entry.bundle) return (
        <>
            {layout.useWidePreview ? (
                <div className={"w-full h-full"}>
                    <span className={"absolute ml-6 top-2 w-full bg-accent bg-transparent-5"}>{entry.bundle?.name ?? "undef"}</span>
                    <span className={"absolute ml-6 bottom-6 w-full"}> {entry.finalPrice}</span>
                    <img src={entry.bundle?.image} className={"w-full h-full object-cover"}  alt={entry.bundle?.name + " banner"}/>
                </div>

            ) : (
                <div className={"flex flex-col h-full w-full border-8"} style={{background: getColors(entry.colors), border: getColors(entry.colors, true)}}>
                    <span className={"absolute ml-6 top-2 w-full bg-accent bg-transparent-5"}>{entry.bundle?.name ?? "undef"}</span>
                    <span className={"absolute ml-6 bottom-6 w-full"}> {entry.finalPrice}</span>
                    <div className={"flex ml-6 w-full h-full"}>
                        {entry.brItems && entry.brItems.length > 1 && isDesktop && (
                            <div className={"grid grid-cols-5 gap-2 w-full m-auto ml-2"}>
                                {entry.brItems && (
                                    entry.brItems.map((item) => (
                                        <div className={" border-8 border-white h-fit w-fit hover:scale-110 transition-all-ease-in-out duration-300"}>
                                            <BrItem key={item.id} item={item} type={"icon"} />
                                        </div>
                                    ))
                                )}
                            </div>
                        )}

                        <img src={entry.bundle?.image} className={"w-full h-full object-contain z-10"}  alt={entry.bundle?.name + " banner"}/>

                    </div>
                </div>
            )}
        </>

    )

    return (
        <div className={"flex flex-col h-full w-full border-8 border-white p-4"}>
            <div>{layout?.name ?? "undef"}</div>
            <div>{entry?.tileSize ?? "undef"}</div>


            <div className={"flex w-full h-full"}>
                <div className={"grid grid-cols-5 gap-2 w-full"}>
                    {entry.brItems && (
                        entry.brItems.map((item) => (
                            <div className={" border-8 border-white p-4 h-fit w-fit hover:scale-110 transition-all-ease-in-out duration-300"}>
                                <BrItem key={item.id} item={item} type={"icon"} />
                            </div>
                        ))
                    )}
                    {/*{entry.instruments && (*/}
                    {/*    entry.instruments.map((item) => (*/}
                    {/*        <InstrumentItem key={item.id} item={item} />*/}
                    {/*    ))*/}
                    {/*)}*/}
                    {/*{entry.tracks && (*/}
                    {/*    entry.tracks.map((item) => (*/}
                    {/*        <TrackItem key={item.id} item={item} />*/}
                    {/*    ))*/}
                    {/*)}*/}
                    {/*{entry.cars && (*/}
                    {/*    entry.cars.map((item) => (*/}
                    {/*        <CarItem key={item.id} item={item} />*/}
                    {/*    ))*/}
                    {/*)}*/}
                </div>


            </div>

            <div>
                {entry.finalPrice}
            </div>
        </div>
    )
}
