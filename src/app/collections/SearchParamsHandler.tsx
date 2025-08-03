// app/collections/SearchParamsHandler.tsx
'use client'

import { useSearchParams } from 'next/navigation'
import { useRouter } from 'next/navigation' // Perbaiki import useRouter
import { useEffect } from 'react'

export function SearchParamsHandler({ onCollectionIdChange }: { onCollectionIdChange: (id: number | null) => void }) {
    const searchParams = useSearchParams()
    const collectionIdFromUrl = searchParams.get('collectionId')

    useEffect(() => {
        const selectedCollectionId = collectionIdFromUrl ? Number(collectionIdFromUrl) : null
        onCollectionIdChange(selectedCollectionId)
    }, [collectionIdFromUrl, onCollectionIdChange])

    return null
}