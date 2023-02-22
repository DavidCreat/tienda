import { create } from "zustand";

export interface User {
    isAdmin?: boolean, 
    isRestaurantOwner?: boolean,

    userName?: string,
    userEmail: string,
    userPhone?: string,

    userCurrentToken: string,
    userID: string,

    userTokens?: string,

    
    accesableRestaurants?: string[],
}

export enum Status {
    IDLE,
    LOADING,
    ERROR,
    SUCCEDDED
}


export interface UserSlice {
    currentUser?: User,
    status: Status,
    response: string,
    fetchProducts: () => void,
    
    saveOnStorage: () => void,
    getFromStorage: () => void,
    removeOfStorage: () => void,

    userLogin: ({userEmail, userPassword}: {userEmail: string, userPassword: string}) => void,
    userRegister: ({userEmail, userPassword, userName}: {userEmail: string, userPassword: string, userName: string}) => void,

    userLoginByToken: ({userEmail, userToken}: {userEmail: string, userToken: string}) => void,

    userModeratorRegister: ({currenUserEmail, currentUserToken, userEmail, userPassword, userPhone, userName}: {currenUserEmail: string, currentUserToken: string, userEmail: string, userPassword: string, userPhone: string, userName: string}) => void,

    userCreateRestaurant: ({userEmail, userCurrentToken}: {userEmail: string, userCurrentToken: string}) => void,
    userDeleteRestaurant: ({userEmail, userCurrentToken}: {userEmail: string, userCurrentToken: string}) => void,
}

export const userSlice = create<UserSlice> ()((set, get) => ({
    currentUser: undefined,   

    status: Status.IDLE,

    response: "",

    
    userRegister: async ({userEmail, userPassword, userName}) => {
        let responseStatus: Status = Status.IDLE

        set({status: Status.LOADING})
        const res = await fetch("api/auth/register",{
            method: "POST",
            body: JSON.stringify({
                userEmail, userPassword, userName
            })
        }).then((v) => {
            switch(v.status){
                case 200:
                    responseStatus = Status.SUCCEDDED
                    break;
                default:
                    responseStatus = Status.ERROR
                    break;
            }
        })

        set({status: responseStatus})

    },



    fetchProducts: async () => {
        const res = await fetch('https://api.escuelajs.co/api/v1/products?offset=0&limit=20')
        set({ currentUser: await res.json() })
    },


    saveOnStorage: () => {
        const currentData = get()

        if (!currentData.currentUser) return;

        localStorage.setItem("userName", currentData.currentUser.userName as string)
        localStorage.setItem("userID", currentData.currentUser.userID)
        localStorage.setItem("userCurrentToken", currentData.currentUser.userCurrentToken)
    },





    getFromStorage: () => {



        set({
            currentUser: {
                userID: localStorage.getItem("userID") as string,
                userEmail: localStorage.getItem("userEmail") as string,
                userCurrentToken: localStorage.getItem("userCurrentToken") as string             
            }
        })

    },





    removeOfStorage: () => {

    },





    userCreateRestaurant: ({userCurrentToken, userEmail}) => {

    },





    userLogin: ({userEmail, userPassword}) =>{

    },





    userDeleteRestaurant: ({userEmail, userCurrentToken}) => {

    },




    
    userLoginByToken: ({userEmail, userToken}) => {

    },





    userModeratorRegister: ({userEmail, userName, userPassword, userPhone}) => {

    }
}))
