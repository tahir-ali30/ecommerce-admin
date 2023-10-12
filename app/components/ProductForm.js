"use client"

import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react"
import { ReactSortable } from "react-sortablejs";

export default function ProductForm({
    _id,
    title: existingTitle,
    description: existingDesc,
    price: existingPrice,
    image: existingImages,
    category: existingCategory,
    properties: existingProperties,
}) {
    const router = useRouter()
    const [productDetails, setProductDetails] = useState({
        title: existingTitle || '',
        description: existingDesc || '',
        price: existingPrice || '',
        image: existingImages || [],
        category: existingCategory || '',
        properties: existingProperties || {},
    })

    const [categories, setCategories] = useState([])

    useEffect(() => {
        axios.get('/api/categories').then(result => {
            setCategories(result.data)
        })
    },[])

    function handleChange(e) {
        setProductDetails({ ...productDetails, [e.target.name]: e.target.value })
    }

    async function saveProduct(e) {
        e.preventDefault()
        if (_id) {
            const res = await axios.put('/api/products', { ...productDetails, _id });
        } else {
            const res = await axios.post('/api/products', productDetails);
        }
        router.push('/products')
    }

    async function uploadImages(ev) {
        const files = ev.target?.files;
    //     if (files?.length > 0) {
    //         const data = new FormData();
    //         for (const file of files) {
    //             data.append('file', file);
    //         }
    //         const res = await fetch('/api/upload', {
    //             method: 'POST',
    //             body: data,
    //         });
    // }
        const reader = new FileReader();
        reader.readAsDataURL(files[0]);
        reader.onload = () => {
            setProductDetails({ ...productDetails, image: [...productDetails.image, reader.result] });
        }
    }

    function updateImagesOrder(images) {
        setProductDetails({...productDetails, image: images})
    }

    const propertiesToFill = [];
    if (categories.length > 0 && productDetails.category) {
        let catInfo = categories.find(({ _id }) => _id === productDetails.category);
        propertiesToFill.push(...catInfo.properties);
        // while (catInfo?.parent?._id) {
        //     const parentCat = categories.find(({ _id }) => _id === catInfo?.parent?._id);
        //     propertiesToFill.push(...parentCat.properties);
        //     catInfo = parentCat;
        // }
    }

    function setProductProp(name, value) {
        setProductDetails({ ...productDetails, properties: { ...productDetails.properties, [name]: value } });
    }

    return (
            <form onSubmit={saveProduct}>
            <label htmlFor="title">Product Name</label>
            <input type="text"
                placeholder="Product Name"
                name="title"
                value={productDetails.title}
                onChange={handleChange} />
            
            <label >Category</label>
            <select
                value={productDetails.category}
                onChange={(ev) => setProductDetails({ ...productDetails, category: ev.target.value })}>
                <option value="">Uncategorized</option>
                {!!categories && categories.map(category => {
                    return <option key={category._id} value={category._id}>
                        {category.name}
                    </option>
                })}
            </select>

            {/* listing properties */}
            {propertiesToFill.length > 0 && propertiesToFill.map(property => {
                return <div className="">
                    <label>{`${property.name[0].toUpperCase()}${property.name.slice(1)}`}</label>
                    <div>
                    <select
                        value={productDetails.properties[property.name]}
                        onChange={(ev) => setProductProp(property.name, ev.target.value) }>
                        {property.values.map(value => {
                        return <option value={value}>{value}</option>
                    })}
                        </select>
                    </div>
                </div>
                })
            }
            
            <label htmlFor="photos">
                Photos
            </label>
            <div className="mb-2 flex flex-wrap gap-1">

                <ReactSortable className="flex flex-wrap gap-1"
                    list={productDetails.image}
                    setList={updateImagesOrder}>
                {/* rendering images */}
                    {!!productDetails.image.length && productDetails.image.map(img => {
                        return <div className="h-28 bg-white p-4 shadow-sm rounded-sm">
                            <Image className="max-h-full max-w-max" src={`${img}`} alt={productDetails.title} width={100} height={100}></Image>
                        </div>
                })}
                </ReactSortable>

                <label className="w-24 h-24 border border-gray-200 text-center flex flex-col items-center justify-center text-sm gap-1 text-gray-700 rounded-sm cursor-pointer bg-white shadow-sm">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 8.25H7.5a2.25 2.25 0 00-2.25 2.25v9a2.25 2.25 0 002.25 2.25h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25H15m0-3l-3-3m0 0l-3 3m3-3V15" />
                    </svg>
                    Add Images
                    <input type="file" name="productImage"
                        onChange={uploadImages} className="hidden" />
                </label>

            </div>

            
            <label htmlFor="description">Description</label>
            <textarea placeholder="Description"
                name="description" id="" cols="30" rows="10"
                value={productDetails.description}
                onChange={handleChange} />
            
            <label htmlFor="price">Price (in USD)</label>
                <input type="text"
                    placeholder="Price"
                    name="price"
                    value={productDetails.price}
                    onChange={handleChange} />

            <button type="submit" className="btn-primary">Save</button>
            <button
                className="btn-default ml-2"
                onClick={() => console.log(productDetails)}
                type="button">SHOW</button>
            </form>
    )
}