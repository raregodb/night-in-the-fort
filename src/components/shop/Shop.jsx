import OfferCard from "@/components/shop/OfferCard.jsx";
import {ErrorMessage, Loading} from "@/components/Status.jsx";
import {useShop} from "@/hooks/use-api.js";
import {formatDate, groupShopSections} from "@/lib/shop.js";

export default function Shop() {
    const {data: shop, error, loading} = useShop();

    if (loading) return <Loading />;
    if (error) return <ErrorMessage error={error} />;

    const sections = groupShopSections(shop);

    return (
        <div className="flex w-full max-w-7xl flex-col gap-8">
            <div className="flex flex-col gap-1">
                <h1 className="text-4xl font-bold md:text-6xl">Магазин</h1>
                <span className="text-muted-foreground">Ротация от {formatDate(shop.date)} · {shop.entries.length} предложений</span>
            </div>

            {sections.map((section) => (
                <section key={section.id} className="flex flex-col gap-3">
                    <h2 className="text-2xl font-semibold">{section.name}</h2>
                    <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
                        {section.entries.map((entry) => <OfferCard key={entry.offerId} entry={entry} />)}
                    </div>
                </section>
            ))}
        </div>
    )
}
