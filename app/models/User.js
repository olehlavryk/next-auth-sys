import mongoose, { Schema } from "mongoose"

console.log(process.env.MONGO_URI)

// TODO: move this to .env
mongoose.connect("mongodb+srv://olehlavrik:oVCUufdbL9ddQPKZ@cluster0.9hpwwyv.mongodb.net/AppDB")
mongoose.Promise = global.Promise

// check if connection is successful
mongoose.connection.on("connected", () => {
  console.log("Connected to MongoDB")
})

const userSchema = new Schema({
  name: String,
  email: String,
  password: String
}, { timestamps: true })

const User = mongoose.model.User || mongoose.model("User", userSchema)
export default User