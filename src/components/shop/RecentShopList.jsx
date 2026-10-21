import BrItem from "@/components/shop/BrItem.jsx";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs.jsx";
import TrackItem from "@/components/shop/TrackItem.jsx";
import InstrumentItem from "@/components/shop/InstrumentItem.jsx";
import CarItem from "@/components/shop/CarItem.jsx";
import {ErrorMessage, Loading} from "@/components/Status.jsx";
import {useApi} from "@/hooks/use-api.js";
import {getRecentShopItems} from "@/lib/api.js";
import {Car, Guitar, Music, Shirt} from "lucide-react";

const TABS = [
    {value: "br", label: "Косметика", icon: Shirt, Item: BrItem},
    {value: "tracks", label: "Треки", icon: Music, Item: TrackItem},
    {value: "instruments", label: "Инструменты", icon: Guitar, Item: InstrumentItem},
    {value: "cars", label: "Машины", icon: Car, Item: CarItem},
];

export default function RecentShopList () {
    const {data, error, loading} = useApi(getRecentShopItems);

    if (loading) return <Loading />;
    if (error) return <ErrorMessage error={error} />;

    const items = data?.items ?? {};
    const tabs = TABS.filter((tab) => items[tab.value]?.length);

    if (!tabs.length) return <span className="text-muted-foreground">Новинок пока нет</span>;

    return (
        <div className="flex w-full flex-col">
            <Tabs defaultValue={tabs[0].value} className="w-full">
                <TabsList>
                    {tabs.map(({value, label, icon: Icon}) => (
                        <TabsTrigger key={value} value={value}>
                            <Icon />
                            {label} ({items[value].length})
                        </TabsTrigger>
                    ))}
                </TabsList>
                {tabs.map(({value, Item}) => (
                    <TabsContent key={value} value={value}>
                        <div className="grid grid-cols-2 gap-4 p-2 md:grid-cols-3 lg:grid-cols-4">
                            {items[value].map((item) => <Item key={item.id} item={item}/>)}
                        </div>
                    </TabsContent>
                ))}
            </Tabs>
        </div>
    );
}
