import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import contactRoute from "./routes/contact.mjs"

dotenv.config()
const app = express()

app.use(cors())
app.use(express.json())
app.use("/api/contact", contactRoute)

app.listen(5000, () => {
  console.log("Server running on http://localhost:5000")
})
