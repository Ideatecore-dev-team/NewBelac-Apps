import DetailCard from "../ui/collections/detail-card"

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div className="mt-10">
            <DetailCard />
            <div>{children}</div>
        </div>
    )
}