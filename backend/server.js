import express from "express"
import cors from "cors"
import {connectDB} from "./config/db.js"
import foodRouter from "./routes/foodRoute.js"

// app config
const app = express()
const port = 4000

// middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: true })) // Add this for form data
app.use(cors())

// db connection
connectDB();

// serve static files (images)
app.use("/images", express.static('uploads'))

// api endpoints
app.get("/", (req, res) => {
  res.send("Hello from Pizza Panda Backend")
})

app.use("/api/food", foodRouter);

app.listen(port, () => {
  console.log(`Server started on http://localhost:${port}`)
})