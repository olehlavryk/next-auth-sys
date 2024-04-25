import mongoose, { Schema } from "mongoose"

mongoose.connect(process.env.MONGO_URI)
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

const User = mongoose.models.User || mongoose.model("User", userSchema)
export default User