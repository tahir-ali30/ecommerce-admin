"use client"

import Layout from "@/app/components/Layout";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function DeleteProductPage({ params }) {
    const {id} = params
    const router = useRouter()
    const [productInfo, setProductInfo] = useState(null)

    useEffect(() => {
        axios.get(`/api/products/${id}`).then(response => {
            setProductInfo(response.data.product);
        })
    },[])

    function goBack() {
        router.push('/products')
    }

    async function deleteProduct() {
        await axios.delete(`/api/products/${id}`)
        goBack()
    }
    return (
        <>
            <h1 className="text-center">
                Do you really want to delete "{productInfo?.title}"?
            </h1>
            <div className="flex gap-2 justify-center">
                <button
                    className="btn-red"
                    onClick={deleteProduct}>
                    YES
                </button>

                <button
                    className="btn-default"
                    onClick={goBack}>
                    NO
                </button>
            </div>
        </>
    )
}