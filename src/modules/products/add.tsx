'use client'

import { useState } from 'react';
import { Dropdown, useBase64 } from '@/shared';
import { useInputHandler } from '@/hooks';
import { wmmMachineNames } from '@/shared/tools/app-variables';
import { apiEndPoint, colors } from '@/utils/colors';
import { ImagePlus, X } from 'lucide-react';
import Image from 'next/image';
import Validator from "validatorjs";
import axios from 'axios';
import { toast } from 'react-hot-toast';

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

export const AddProductsModule = () => {
    const [data, setData] = useState({
        isLoading: false,
        productImage: null,
        testMachineName: null,
        productImageName: null,
    })

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

    const addProduct = async (e: any) => {
        e.preventDefault()

        const productData = {
            ...data,
            productName: inputValues?.productName,
            productCode: inputValues?.productCode,
            weight: inputValues?.weight,
            coolTime: inputValues?.coolTime,
            chargingTime: inputValues?.chargingTime,
            targetTime: inputValues?.targetTime,
            cavity: inputValues?.cavity,
            paletteConfig: inputValues?.paletteConfig,
            totalWeight: inputValues?.totalWeight,
            masterBatch: inputValues?.masterBatch,
            volume: inputValues?.volume,
        };

        const validateLogs = new Validator(productData, rules);

        if (validateLogs.fails()) {
            setErrors(validateLogs.errors.all());
            return;
        }

        if (validateLogs.passes()) {
            setData({ ...data, isLoading: true })

            const payLoad = {
                product_code: inputValues?.productCode,
                product_name: inputValues?.productName,
                test_run_machine: data?.testMachineName,
                weight: inputValues?.weight,
                cool_time: inputValues?.coolTime,
                charging_time: inputValues?.chargingTime,
                target_time: inputValues?.targetTime,
                count_per_shot: inputValues?.cavity,
                amount_per_pallet: inputValues?.paletteConfig,
                total_weight: inputValues?.totalWeight,
                master_batch: inputValues?.masterBatch,
                volume: inputValues?.volume,
                image: data?.productImage,
            }

            try {

                const url = `api/v1/product/insertproduct`
                const response = await axios.post(`${apiEndPoint}/${url}`, payLoad)

                if (response.data.message === "Success") {
                    setData({ ...data, isLoading: false })

                    toast('Product created successfully',
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
                }
                else {
                    setData({ ...data, isLoading: false })

                    toast('Failed to create product, please re-try',
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
            catch (error) {
                setData({ ...data, isLoading: false })

                toast('Please refresh and try again',
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
                        value={inputValues.productName || ''}
                        onChange={(e) => handleChange('productName', e.target.value)}
                    />
                    {errors.productName && <span className="text-red text-sm">{errors.productName[0]}</span>}
                </div>
                <div className='w-[48%] lg:w-[24%]'>
                    <p className='text-gray-500 font-medium text-sm '>Product Code</p>
                    <input
                        className="w-full placeholder:italic border p-[13px] cursor-pointer outline-none text-sm rounded text-gray-500 mt-1 shadow"
                        type='text'
                        name="productCode"
                        placeholder="12L2476BUC"
                        value={inputValues.productCode || ''}
                        onChange={(e) => handleChange('productCode', e.target.value)}
                    />
                    {errors.productCode && <span className="text-red text-sm">{errors.productCode[0]}</span>}
                </div>
                <div className='w-[48%] lg:w-[24%]'>
                    <p className='text-gray-500 font-medium text-sm '>Test Machine</p>
                    <div className='shadow w-full mt-1'>
                        {renderMachines()}
                    </div>
                    {errors.testMachineName && <span className="text-red text-sm">{errors.testMachineName[0]}</span>}
                </div>
                <div className='w-[48%] lg:w-[24%]'>
                    <p className='text-gray-500 font-medium text-sm '>Weight</p>
                    <input
                        className="w-full placeholder:italic border p-[13px] cursor-pointer outline-none text-sm rounded text-gray-500 mt-1 shadow"
                        type='number'
                        name="weight"
                        placeholder="120"
                        value={inputValues.weight || ''}
                        onChange={(e) => handleChange('weight', e.target.value)}
                    />
                    {errors.weight && <span className="text-red text-sm">{errors.weight[0]}</span>}
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
                        value={inputValues.coolTime || ''}
                        onChange={(e) => handleChange('coolTime', e.target.value)}
                    />
                    {errors.coolTime && <span className="text-red text-sm">{errors.coolTime[0]}</span>}
                </div>
                <div className='w-[48%] lg:w-[24%]'>
                    <p className='text-gray-500 font-medium text-sm '>Charging Time <span className='text-gray-500 text-xs'>(sec)</span></p>
                    <input
                        className="w-full placeholder:italic border p-[13px] cursor-pointer outline-none text-sm rounded text-gray-500 mt-1 shadow"
                        type='number'
                        name="2"
                        placeholder="2"
                        value={inputValues.chargingTime || ''}
                        onChange={(e) => handleChange('chargingTime', e.target.value)}
                    />
                    {errors.chargingTime && <span className="text-red text-sm">{errors.chargingTime[0]}</span>}
                </div>
                <div className='w-[48%] lg:w-[24%]'>
                    <p className='text-gray-500 font-medium text-sm '>Target Time <span className='text-gray-500 text-xs'>(sec)</span></p>
                    <input
                        className="w-full placeholder:italic border p-[13px] cursor-pointer outline-none text-sm rounded text-gray-500 mt-1 shadow"
                        type='number'
                        name="targetTime"
                        placeholder="8"
                        value={inputValues.targetTime || ''}
                        onChange={(e) => handleChange('targetTime', e.target.value)}
                    />
                    {errors.targetTime && <span className="text-red text-sm">{errors.targetTime[0]}</span>}
                </div>
                <div className='w-[48%] lg:w-[24%]'>
                    <p className='text-gray-500 font-medium text-sm '>Cavity</p>
                    <input
                        className="w-full placeholder:italic border p-[13px] cursor-pointer outline-none text-sm rounded text-gray-500 mt-1 shadow"
                        type='number'
                        name="cavity"
                        placeholder="4"
                        value={inputValues.cavity || ''}
                        onChange={(e) => handleChange('cavity', e.target.value)}
                    />
                    {errors.cavity && <span className="text-red text-sm">{errors.cavity[0]}</span>}
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
                        value={inputValues.paletteConfig || ''}
                        onChange={(e) => handleChange('paletteConfig', e.target.value)}
                    />
                    {errors.paletteConfig && <span className="text-red text-sm">{errors.paletteConfig[0]}</span>}
                </div>
                <div className='w-[48%] lg:w-[24%]'>
                    <p className='text-gray-500 font-medium text-sm '>Total Weight <span className='text-gray-500 text-xs'>(g)</span></p>
                    <input
                        className="w-full placeholder:italic border p-[13px] cursor-pointer outline-none text-sm rounded text-gray-500 mt-1 shadow"
                        type='number'
                        name="2"
                        placeholder="140"
                        value={inputValues.totalWeight || ''}
                        onChange={(e) => handleChange('totalWeight', e.target.value)}
                    />
                    {errors.totalWeight && <span className="text-red text-sm">{errors.totalWeight[0]}</span>}
                </div>
                <div className='w-[48%] lg:w-[24%]'>
                    <p className='text-gray-500 font-medium text-sm '>Master Batch <span className='text-gray-500 text-xs'>(%)</span></p>
                    <input
                        className="w-full placeholder:italic border p-[13px] cursor-pointer outline-none text-sm rounded text-gray-500 mt-1 shadow"
                        type='number'
                        name="masterBatch"
                        placeholder="8"
                        value={inputValues.masterBatch || ''}
                        onChange={(e) => handleChange('masterBatch', e.target.value)}
                    />
                    {errors.masterBatch && <span className="text-red text-sm">{errors.masterBatch[0]}</span>}
                </div>
                <div className='w-[48%] lg:w-[24%]'>
                    <p className='text-gray-500 font-medium text-sm '>Volume <span className='text-gray-500 text-xs'>(L)</span></p>
                    <input
                        className="w-full placeholder:italic border p-[13px] cursor-pointer outline-none text-sm rounded text-gray-500 mt-1 shadow"
                        type='number'
                        name="volume"
                        placeholder="4"
                        value={inputValues.volume || ''}
                        onChange={(e) => handleChange('volume', e.target.value)}
                    />
                    {errors.volume && <span className="text-red text-sm">{errors.volume[0]}</span>}
                </div>
            </div>
            <div className='w-full flex items-start justify-between gap-4'>
                <div className='w-[48%] lg:w-[24%]'>
                    <label className="flex flex-col items-center justify-center w-full md:w- bg-white text-black h-[200px] rounded-lg shadow border relative">
                        <div className="flex flex-col items-center justify-center pt-7 h-[190px] w-[190px]">
                            {
                                data?.productImage ?
                                    <figure className='w-full h-full flex items-center justify-center'>
                                        <Image
                                            src={`data:image/jpeg;base64,${data.productImage}`}
                                            alt={`${data?.productImageName}`}
                                            height={120}
                                            width={120}
                                            className='object-contain'
                                        />
                                    </figure>
                                    :
                                    <>
                                        <ImagePlus size={40} strokeWidth={1.5} absoluteStrokeWidth color={colors[0]?.black} className={`lg:ease-in-out lg:duration-300`} />
                                        <p className={`pt-1 tracking-wider text-sm text-gray-500 font-medium`}>Upload Image</p>
                                    </>
                            }
                        </div>
                        {!data?.productImage && <input name='image' type="file" className="opacity-0" onChange={uploadImage} />}
                        {data?.productImage && <X size={40} strokeWidth={1.5} absoluteStrokeWidth color={colors[0]?.red} className={`lg:ease-in-out lg:duration-300 absolute top-2 right-2 cursor-pointer`} onClick={resetImage} />}
                    </label>
                    {errors.productImage && <span className="text-red text-sm">{errors.productImage[0]}</span>}
                </div>
            </div>
            <button className='w-full md:w-1/4 p-2 rounded bg-purple text-white uppercase shadow' onClick={addProduct}>{data?.isLoading ? 'Adding Product...' : 'Add Product'}</button>
        </form>
    )
}
