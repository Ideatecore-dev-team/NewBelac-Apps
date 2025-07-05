import DetailCard from "../ui/collections/detail-card"

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div className="mt-25">
            <DetailCard />
            <div>{children}</div>
        </div>
    )
}