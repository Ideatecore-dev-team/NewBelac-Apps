"use client"
import { useState } from "react";
import BigModal from "@/app/ui/modal/bigModal";

export default function Items() {
    const [modalDetailItemisOpen, setModalDetailItemIsOpen] = useState<boolean>(false);
    const [dataItemDetailModal, setDataItemDetailModal] = useState({
        collectionDetail: {
            collectionImage: "/images/nike.png",
            collectionName: "NIKE REALMARK",
            address: "0x512c1...c5",
            collectionSymbol: "83e29f",
            collectionCategoy: ""
        },
        itemImage: "/images/shoes.png",
        itemName: "Nike Air Max 97",
        itemOwner: "83e29f",
        itemUniqueTag: "#1",
        itemSize: "78",
        itemProductDetails: "",
        itemPrice: 0,
        itemisListed: false,
        itemCondition: {
            shortDesc: "",
            longDesc: ""
        }
    })
    const handleCloseModalDetailItemModal = () => setModalDetailItemIsOpen(false);
    return (
        <div>


            <BigModal
                isOpen={modalDetailItemisOpen}
                collectionImage={dataItemDetailModal.collectionDetail.collectionImage}
                collectionName={dataItemDetailModal.collectionDetail.collectionName}
                collectionSymbol={dataItemDetailModal.collectionDetail.collectionSymbol}
                collectionCategory={dataItemDetailModal.collectionDetail.collectionCategoy}
                itemImage={dataItemDetailModal.itemImage}
                itemName={dataItemDetailModal.itemName}
                itemOwner={dataItemDetailModal.itemOwner}
                itemPrice={dataItemDetailModal.itemPrice}
                itemUniqueTag={dataItemDetailModal.itemUniqueTag}
                itemSize={dataItemDetailModal.itemSize}
                onClose={handleCloseModalDetailItemModal}
            />
        </div>
    )
}