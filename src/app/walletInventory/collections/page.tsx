import Image from "next/image"
import CollectionCard from "@/app/ui/collections/collection-card";

export default function Collections() {
    const collectionsData = [
        { label: 'Nike Realmark', price: 10.1, items: 68, image: "/nike.png" },
        { label: 'Nike Realmark', price: 10.1, items: 68, image: "/nike.png" },
        { label: 'Nike Realmark', price: 10.1, items: 68, image: "/nike.png" },
        { label: 'Nike Realmark', price: 10.1, items: 68, image: "/nike.png" },
        { label: 'Nike Realmark', price: 10.1, items: 68, image: "/nike.png" },
    ];

    return (
        <div id="collection-page-container">
            <div id="collection-card-wrapper" className="grid grid-cols-4 w-full gap-8">
                {collectionsData.map((collection, key) => (
                    <CollectionCard data={collection} />
                ))}
            </div>
        </div>
    )
}