"use client"
import ProductForm from "@/app/components/ProductForm"
import axios from "axios"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"

export default function EditProduct({params}) {
    const productID = params.id
    const [product, setProduct] = useState(null);

    async function getProduct() {
        const res = await axios.get(`/api/products/${productID}`)
        setProduct(res.data.product)
    }

    useEffect(() => {
        getProduct()
    },[])

    return (
        <>
            <h1>Edit Product</h1>
            {product && (<ProductForm {...product} />)}
        </>
    )
}