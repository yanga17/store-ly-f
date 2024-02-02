'use client'

import { useInputHandler } from "@/hooks";
import { Dropdown, useBase64 } from "@/shared";
import { wmmMachineNames } from "@/shared/tools/app-variables";
import { apiEndPoint, colors } from "@/utils/colors"
import axios from "axios"
import { ImagePlus, X } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react"
import { toast } from "react-hot-toast"
import Validator from "validatorjs";

const rules = {
    productName: 'required',
    productCode: 'required',
    testMachineName: 'required',
    weight: 'required',
    coolTime: 'required',
    chargingTime: 'required',
    targetTime: 'required',
    cavity: 'required',
    paletteConfig: 'required',
    totalWeight: 'required',
    masterBatch: 'required',
    volume: 'required',
    productImage: 'required',
};

interface Errors {
    [key: string]: string[];
}

export default function Page({ params }: { params: { id: string } }) {
    const { id } = params

    const router = useRouter();

    const [data, setData] = useState({
        isLoading: false,
        productImage: null,
        testMachineName: null,
        productImageName: null,
    })

    const [product, setProduct] = useState()

    const [errors, setErrors] = useState<Errors>({});

    const { handleChange, inputValues, clearValues } = useInputHandler();

    const uploadImage = async (e: any) => {
        e.preventDefault();
        const file = e.target.files[0];
        const base64: any = await useBase64(file)

        setData({ ...data, productImage: base64.split(',')[1], productImageName: file.name })
    };

    const resetImage = () => setData({ ...data, productImage: null, productImageName: null })

    const renderMachines = () => {
        const assignMachine = (option: any) => setData({ ...data, testMachineName: option?.name });

        if (!wmmMachineNames) {
            return <div className="p-3 border w-full bg-grey-darker animate-pulse rounded h-[50px]" />
        }
        else {
            const availableColors = wmmMachineNames?.map((property, index) => ({
                id: index,
                name: property,
                photoURL: 'clear'
            }))

            const data: any = availableColors

            return <Dropdown options={data} onSelect={assignMachine} />
        }
    }

    const productInfo = async () => {
        try {
            const url = `api/v1/product/getproductinfo`
            const response = await axios.get(`${apiEndPoint}/${url}/${id}`)

            if (response?.data[0]) {
                setProduct(response?.data[0])
            }
            else {
                toast('Product not found', {
                    icon: '❌',
                    style: {
                        borderRadius: '10px',
                        background: '#333',
                        color: '#fff',
                    },
                    duration: 3000,
                });

                router.push('/products')
            }
        }
        catch (error) {
            toast('Product not found, please re-try', {
                icon: '❌',
                style: {
                    borderRadius: '10px',
                    background: '#333',
                    color: '#fff',
                },
                duration: 3000,
            });

            router.push('/products')
        }
    }

    useEffect(() => {
        productInfo()
    }, [id])

    if (!product) {
        return <div>Loading</div>
    }

    const { product_code, product_name, weight, cool_time, charging_time, target_time, count_per_shot, amount_per_pallet, total_weight, master_batch, volume, image, test_run_machine } = product

    const editProduct = async (e: any) => {
        e.preventDefault()

        setData({ ...data, isLoading: true })

        const productData = {
            product_code: inputValues?.productCode ? inputValues?.productCode : product_code,
            product_name: inputValues?.productName ? inputValues?.productName : product_name,
            test_run_machine: data?.testMachineName ? data?.testMachineName : test_run_machine,
            weight: inputValues?.weight ? inputValues?.weight : weight,
            cool_time: inputValues?.coolTime ? inputValues?.coolTime : cool_time,
            charging_time: inputValues?.chargingTime ? inputValues?.chargingTime : charging_time,
            target_time: inputValues?.targetTime ? inputValues?.targetTime : target_time,
            count_per_shot: inputValues?.cavity ? inputValues?.cavity : count_per_shot,
            amount_per_pallet: inputValues?.paletteConfig ? inputValues?.paletteConfig : amount_per_pallet,
            total_weight: inputValues?.totalWeight ? inputValues?.totalWeight : total_weight,
            master_batch: inputValues?.masterBatch ? inputValues?.masterBatch : master_batch,
            volume: inputValues?.volume ? inputValues?.volume : volume,
            image: data?.productImage ? inputValues?.productImage : image,
        }

        try {
            const url = `api/v1/product/updateproduct`
            const response = await axios.put(`${apiEndPoint}/${url}/${id}`, productData)

            if (response?.data?.message === "(Rows matched: 1  Changed: 1  Warnings: 0") {
                setData({ ...data, isLoading: false })

                toast('Product edited successfully',
                    {
                        icon: '✅',
                        style: {
                            borderRadius: '10px',
                            background: '#333',
                            color: '#fff',
                        },

                        duration: 3000,
                    }
                );

                clearValues()

                router.push('/products')
            }
            else {
                console.log(response)

                setData({ ...data, isLoading: false })

                toast('Failed to edit product, please re-try',
                    {
                        icon: '❌',
                        style: {
                            borderRadius: '10px',
                            background: '#333',
                            color: '#fff',
                        },

                        duration: 3000,
                    }
                );
            }
        }
        catch (error: any) {
            toast(`${error?.message}, please re-try`,
                {
                    icon: '❌',
                    style: {
                        borderRadius: '10px',
                        background: '#333',
                        color: '#fff',
                    },

                    duration: 3000,
                }
            );
        }
    }


    return (
        <form className="w-full h-screen flex flex-col justify-space gap-4">
            <div className='w-full flex items-start justify-between gap-4'>
                <div className='w-[48%] lg:w-[24%]'>
                    <p className='text-gray-500 font-medium text-sm '>Product Name</p>
                    <input
                        className="w-full placeholder:italic border p-[13px] cursor-pointer outline-none text-sm rounded text-gray-500 mt-1 shadow"
                        type='text'
                        name="productName"
                        placeholder="12L bucket"
                        value={inputValues.productName !== undefined ? inputValues.productName : product_name || ''}
                        onChange={(e) => handleChange('productName', e.target.value)}
                    />
                </div>
                <div className='w-[48%] lg:w-[24%]'>
                    <p className='text-gray-500 font-medium text-sm '>Product Code</p>
                    <input
                        className="w-full placeholder:italic border p-[13px] cursor-pointer outline-none text-sm rounded text-gray-500 mt-1 shadow"
                        type='text'
                        name="productCode"
                        placeholder="12L2476BUC"
                        value={inputValues.productCode !== undefined ? inputValues.productCode : product_code || ''}
                        onChange={(e) => handleChange('productCode', e.target.value)}
                    />
                </div>
                <div className='w-[48%] lg:w-[24%]'>
                    <p className='text-gray-500 font-medium text-sm '>Test Machine</p>
                    <div className='shadow w-full mt-1'>
                        {renderMachines()}
                    </div>
                </div>
                <div className='w-[48%] lg:w-[24%]'>
                    <p className='text-gray-500 font-medium text-sm '>Weight</p>
                    <input
                        className="w-full placeholder:italic border p-[13px] cursor-pointer outline-none text-sm rounded text-gray-500 mt-1 shadow"
                        type='number'
                        name="weight"
                        placeholder="120"
                        value={inputValues.weight !== undefined ? inputValues.weight : weight || ''}
                        onChange={(e) => handleChange('weight', e.target.value)}
                    />
                </div>
            </div>
            <div className='w-full flex items-start justify-between gap-4'>
                <div className='w-[48%] lg:w-[24%]'>
                    <p className='text-gray-500 font-medium text-sm '>Cool Time <span className='text-gray-500 text-xs'>(sec)</span></p>
                    <input
                        className="w-full placeholder:italic border p-[13px] cursor-pointer outline-none text-sm rounded text-gray-500 mt-1 shadow"
                        type='number'
                        name="coolTime"
                        placeholder="3"
                        value={inputValues.coolTime !== undefined ? inputValues.coolTime : cool_time || ''}
                        onChange={(e) => handleChange('coolTime', e.target.value)}
                    />
                </div>
                <div className='w-[48%] lg:w-[24%]'>
                    <p className='text-gray-500 font-medium text-sm '>Charging Time <span className='text-gray-500 text-xs'>(sec)</span></p>
                    <input
                        className="w-full placeholder:italic border p-[13px] cursor-pointer outline-none text-sm rounded text-gray-500 mt-1 shadow"
                        type='number'
                        name="2"
                        placeholder="2"
                        value={inputValues.chargingTime !== undefined ? inputValues.chargingTime : charging_time || ''}
                        onChange={(e) => handleChange('chargingTime', e.target.value)}
                    />
                </div>
                <div className='w-[48%] lg:w-[24%]'>
                    <p className='text-gray-500 font-medium text-sm '>Target Time <span className='text-gray-500 text-xs'>(sec)</span></p>
                    <input
                        className="w-full placeholder:italic border p-[13px] cursor-pointer outline-none text-sm rounded text-gray-500 mt-1 shadow"
                        type='number'
                        name="targetTime"
                        placeholder="8"
                        value={inputValues.targetTime !== undefined ? inputValues.targetTime : target_time || ''}
                        onChange={(e) => handleChange('targetTime', e.target.value)}
                    />
                </div>
                <div className='w-[48%] lg:w-[24%]'>
                    <p className='text-gray-500 font-medium text-sm '>Cavity</p>
                    <input
                        className="w-full placeholder:italic border p-[13px] cursor-pointer outline-none text-sm rounded text-gray-500 mt-1 shadow"
                        type='number'
                        name="cavity"
                        placeholder="4"
                        value={inputValues.cavity !== undefined ? inputValues.cavity : count_per_shot || ''}
                        onChange={(e) => handleChange('cavity', e.target.value)}
                    />
                </div>
            </div>
            <div className='w-full flex items-start justify-between gap-4'>
                <div className='w-[48%] lg:w-[24%]'>
                    <p className='text-gray-500 font-medium text-sm '>Quantity Per Palette</p>
                    <input
                        className="w-full placeholder:italic border p-[13px] cursor-pointer outline-none text-sm rounded text-gray-500 mt-1 shadow"
                        type='number'
                        name="paletteConfig"
                        placeholder="3"
                        value={inputValues.paletteConfig !== undefined ? inputValues.paletteConfig : amount_per_pallet || ''}
                        onChange={(e) => handleChange('paletteConfig', e.target.value)}
                    />
                </div>
                <div className='w-[48%] lg:w-[24%]'>
                    <p className='text-gray-500 font-medium text-sm '>Total Weight <span className='text-gray-500 text-xs'>(g)</span></p>
                    <input
                        className="w-full placeholder:italic border p-[13px] cursor-pointer outline-none text-sm rounded text-gray-500 mt-1 shadow"
                        type='number'
                        name="2"
                        placeholder="140"
                        value={inputValues.totalWeight !== undefined ? inputValues.totalWeight : total_weight || ''}
                        onChange={(e) => handleChange('totalWeight', e.target.value)}
                    />
                </div>
                <div className='w-[48%] lg:w-[24%]'>
                    <p className='text-gray-500 font-medium text-sm '>Master Batch <span className='text-gray-500 text-xs'>(%)</span></p>
                    <input
                        className="w-full placeholder:italic border p-[13px] cursor-pointer outline-none text-sm rounded text-gray-500 mt-1 shadow"
                        type='number'
                        name="masterBatch"
                        placeholder="8"
                        value={inputValues.masterBatch !== undefined ? inputValues.masterBatch : master_batch || ''}
                        onChange={(e) => handleChange('masterBatch', e.target.value)}
                    />
                </div>
                <div className='w-[48%] lg:w-[24%]'>
                    <p className='text-gray-500 font-medium text-sm '>Volume <span className='text-gray-500 text-xs'>(L)</span></p>
                    <input
                        className="w-full placeholder:italic border p-[13px] cursor-pointer outline-none text-sm rounded text-gray-500 mt-1 shadow"
                        type='number'
                        name="volume"
                        placeholder="4"
                        value={inputValues.volume !== undefined ? inputValues.volume : volume || ''}
                        onChange={(e) => handleChange('volume', e.target.value)}
                    />
                </div>
            </div>
            <div className='w-full flex items-start justify-between gap-4'>
                <div className='w-[48%] lg:w-[24%]'>
                    <label className="flex flex-col items-center justify-center w-full md:w- bg-white text-black h-[200px] rounded-lg shadow border relative">
                        <div className="flex flex-col items-center justify-center pt-7 h-[190px] w-[190px]">
                            {
                                !data?.productImage && image ?
                                    <figure className='w-full h-full flex items-center justify-center'>
                                        <Image
                                            src={`data:image/jpeg;base64,${image}`}
                                            alt={`${String(product_name)?.slice(0, 5)}`}
                                            height={120}
                                            width={120}
                                            className='object-contain'
                                        />
                                    </figure>
                                    :
                                    <>
                                        <figure className='w-full h-full flex items-center justify-center'>
                                            <Image
                                                src={`data:image/jpeg;base64,${data?.productImage}`}
                                                alt={`${data?.productImageName}`}
                                                height={120}
                                                width={120}
                                                className='object-contain'
                                            />
                                        </figure>
                                    </>
                            }
                        </div>
                        {!data?.productImage && <input name='image' type="file" className="opacity-0" onChange={uploadImage} />}
                        {data?.productImage && <X size={40} strokeWidth={1.5} absoluteStrokeWidth color={colors[0]?.red} className={`lg:ease-in-out lg:duration-300 absolute top-2 right-2 cursor-pointer`} onClick={resetImage} />}
                    </label>
                </div>
            </div>
            <button className='w-full md:w-1/4 p-2 rounded bg-purple text-white uppercase shadow' onClick={editProduct}>{data?.isLoading ? 'Saving Changes...' : 'Save Changes'}</button>
        </form>
    )
}
