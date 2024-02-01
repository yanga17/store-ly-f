'use client'

import { apiEndPoint } from "@/utils/colors"
import axios from "axios"
import { useEffect, useState } from "react"
import { toast } from "react-hot-toast"

export const Operators = () => {
    const [operators, setOperators] = useState<any[]>()

    const getOperators = async () => {
        try {
            const url = `api/v1/user/getoperator`
            const operators = await axios.get(`${apiEndPoint}/${url}`)

            if (operators?.data) {
                setOperators(operators?.data)
            }
            else {
                toast(``,
                    {
                        icon: '🔄',
                        style: {
                            borderRadius: '10px',
                            background: '#333',
                            color: '#fff',
                        },
                    }
                );
            }
        }
        catch (error) {
            toast(``,
                {
                    icon: '🔄',
                    style: {
                        borderRadius: '10px',
                        background: '#333',
                        color: '#fff',
                    },
                }
            );
        }
    }

    useEffect(() => {
        getOperators()

        const intervalId = setInterval(getOperators, 2000);

        return () => clearInterval(intervalId);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return operators
}

export const Managers = () => {
    const [managers, setManagers] = useState<any[]>()

    const getManagers = async () => {
        try {
            const url = `api/v1/user/getteamleader`
            const managers = await axios.get(`${apiEndPoint}/${url}`)

            if (managers?.data) {
                setManagers(managers?.data)
            }
            else {
                toast(``,
                    {
                        icon: '🔄',
                        style: {
                            borderRadius: '10px',
                            background: '#333',
                            color: '#fff',
                        },
                    }
                );
            }
        }
        catch (error) {
            toast(``,
                {
                    icon: '🔄',
                    style: {
                        borderRadius: '10px',
                        background: '#333',
                        color: '#fff',
                    },
                }
            );
        }
    }

    useEffect(() => {
        getManagers()

        const intervalId = setInterval(getManagers, 2000);

        return () => clearInterval(intervalId);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return managers
}

export const Products = () => {
    const [products, setProducts] = useState<any[]>()

    const getProducts = async () => {
        try {
            const url = `api/v1/product/getproducts`
            const products = await axios.get(`${apiEndPoint}/${url}`)

            if (products?.data) {
                setProducts(products?.data)
            }
            else {
                toast(``,
                    {
                        icon: '🔄',
                        style: {
                            borderRadius: '10px',
                            background: '#333',
                            color: '#fff',
                        },
                    }
                );
            }
        }
        catch (error) {
            toast(``,
                {
                    icon: '🔄',
                    style: {
                        borderRadius: '10px',
                        background: '#333',
                        color: '#fff',
                    },
                }
            );
        }
    }

    useEffect(() => {
        getProducts()

        const intervalId = setInterval(getProducts, 2000);

        return () => clearInterval(intervalId);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return products
}