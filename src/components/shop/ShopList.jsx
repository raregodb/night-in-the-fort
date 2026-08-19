import {useEffect, useState} from "react";
import {getShopItems} from "@/lib/api.js";
import BrItem from "@/components/shop/BrItem.jsx";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs.jsx";
import TrackItem from "@/components/shop/TrackItem.jsx";
import InstrumentItem from "@/components/shop/InstrumentItem.jsx";
import CarItem from "@/components/shop/CarItem.jsx";

export default function ShopList () {
    const [items, setItems] = useState(null);

    useEffect(() => {
        try {
            getShopItems().then((data) => {
                setItems(data.data?.items);
            });
        }
        catch (e) {
            console.error(e);
        }
    }, []);

    return (
        <div className={"flex flex-col h-full overflow-auto"}>
            <Tabs defaultValue="overview" className="w-full">
                <TabsList>
                    <TabsTrigger value="br">BR</TabsTrigger>
                    <TabsTrigger value="tracks">Tracks</TabsTrigger>
                    <TabsTrigger value="instruments">Instruments</TabsTrigger>
                    <TabsTrigger value="cars">Cars</TabsTrigger>
                </TabsList>
                {!items ? (
                    <div>Loading...</div>
                ) : (
                    <>
                        <TabsContent value="br">
                            <div className={"grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-2"}>
                                {items.br.map((item) => <BrItem key={item.id} item={item}/>)}
                            </div>
                        </TabsContent>
                        <TabsContent value="tracks">
                            <div className={"grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-2"}>
                                {items.tracks.map((item) => <TrackItem key={item.id} item={item}/>)}
                            </div>
                        </TabsContent>
                        <TabsContent value="instruments">
                            <div className={"grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-2"}>
                                {items.instruments.map((item) => <InstrumentItem key={item.id} item={item}/>)}
                            </div>
                        </TabsContent>
                        <TabsContent value="cars">
                            <div className={"grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-2"}>
                                {items.cars.map((item) => <CarItem key={item.id} item={item}/>)}
                            </div>
                        </TabsContent>
                    </>

                )}

            </Tabs>


        </div>
    );
}