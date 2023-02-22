import { create } from "zustand";


export interface RestaurantProduct {
    productID: string,
    
    productImage: string,
    productName: string,
    productDescription: string,
    
    productQuantity: string,
    productPrice: string,
}


export interface Restaurant {
    restaurantID: string,
    restaurantAdmin: string,

    restaurantModerators: string[],

    restaurantProducts: RestaurantProduct[],
}

export interface RestaurantSlice {
    currentRestaurant?: Restaurant,
    fetchProducts: () => void;
}

export const restaurantSlice = create<RestaurantSlice> ()((set, get) => ({
    currentRestaurant: undefined,   
    fetchProducts: async () => {
        const res = await fetch('https://api.escuelajs.co/api/v1/products?offset=0&limit=20')
        set({ currentRestaurant: await res.json() })
    },
}))