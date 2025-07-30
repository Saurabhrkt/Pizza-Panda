import mongoose from "mongoose"

export const connectDB = async () => {

    await mongoose.connect('mongodb+srv://sc42436:saurabh123@cluster0.tmrp9sa.mongodb.net/pizza-panda').then(() => {
      console.log("MongoDB connected")
    })

}


