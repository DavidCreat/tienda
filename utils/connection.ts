//IMPORT MONGOOSE
import { Restaurant } from "@/zustand/slices/restaurantSlices"
import { User } from "@/zustand/slices/userSlices"
import mongoose, { Model } from "mongoose"

// CONNECTING TO MONGOOSE (Get Database Url from .env.local)
const { DATABASE_URL } = process.env

// connection function
export const connect = async () => {
  const conn = await mongoose
    .connect(DATABASE_URL as string)
    .catch(err => console.log(err))
  console.log("Mongoose Connection Established") 


  // OUR TODO SCHEMA
  const UserSchema = new mongoose.Schema<User>({
    isAdmin: Boolean,
    isRestaurantOwner: Boolean,
    userID: String,
    userEmail: String,
    userName: String,
    userPhone: String,
    userTokens: String,
    userCurrentToken: String,
    accesableRestaurants: [String],
  })


  const RestaurantSchema = new mongoose.Schema<Restaurant>({
    restaurantAdmin: Boolean,
    restaurantID: String,
    restaurantModerators: [String],
    restaurantProducts: [{
        productID: String,
        
        productImage: String,
        productName: String,
        productDescription: String,
        
        productQuantity: String,
        productPrice: String,
    }]
  })

  // OUR TODO MODEL
  const User = mongoose.models.User || mongoose.model("User", UserSchema)
  const Restaurant = mongoose.models.Restaurant || mongoose.model("Restaurant", RestaurantSchema)

  return { conn, User, Restaurant }
}   