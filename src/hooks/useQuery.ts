import { useState, useEffect } from 'react';
import { apiEndPoint } from '@/utils/colors';
import axios, { AxiosResponse, AxiosError } from 'axios';

interface QueryResult<T> {
    data: T | null;
    loading: boolean;
    error: AxiosError<T> | null;
}

export const useQuery = <T>(url: string): QueryResult<T> => {


    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<AxiosError<T> | null>(null);

    useEffect(() => {

        const queryData = async () => {
            try {
                const response: AxiosResponse<T> = await axios.get(`${apiEndPoint}/${url}`);

                setData(response.data);
                setError(null);
            }
            catch (err: any) {
                if (axios.isAxiosError(err)) {
                    setError(err);
                }
            }
            finally {
                setLoading(false);
            }
        };

        queryData()

        const intervalId = setInterval(queryData, 2500);

        return () => clearInterval(intervalId);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [url]);

    return { data, loading, error };
};
