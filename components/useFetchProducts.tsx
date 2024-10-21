import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo from "@react-native-community/netinfo";
import axios from 'axios';

const API_URL = 'https://simple-grocery-store-api.online/products';

export const useFetchProducts = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const netInfo = await NetInfo.fetch();
            if (netInfo.isConnected) {
                try {
                    const response = await axios.get(API_URL);
                    setProducts(response.data);
                    await AsyncStorage.setItem('products', JSON.stringify(response.data)); // Save data offline
                } catch (err) {
                    setError('Error fetching data');
                }
            } else {
                try {
                    const localData = await AsyncStorage.getItem('products');
                    if (localData) {
                        setProducts(JSON.parse(localData));
                    } else {
                        setError('No internet connection and no cached data');
                    }
                } catch (err) {
                    setError('Error reading offline data');
                }
            }
            setLoading(false);
        };

        fetchData();
    }, []);

    return { products, loading, error };
};