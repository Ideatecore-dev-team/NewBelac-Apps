import DetailCard from "../ui/collections/detail-card"
import NavButton from "../ui/navbutton"

export default function Layout({ children }: { children: React.ReactNode }) {
    const menuData = [
        { label: 'Collections', href: '/walletInventory/collections' },
        { label: 'Items', href: '/walletInventory/items' },
    ];

    return (
        <div id="layout-wallet-inventory-container" className="mt-10 flex flex-col">
            <DetailCard />
            <NavButton initialMenuItems={menuData} />
            <div>{children}</div>
        </div>
    )
}