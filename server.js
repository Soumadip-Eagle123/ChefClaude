import express from "express"
import cors from "cors"
import axios from "axios"
import dotenv from "dotenv"

dotenv.config()

const app = express()
app.use(cors())
app.use(express.json())

app.get("/", (req,res)=>{
    res.send("Server working")
})

app.post("/recipe", async (req, res) => {
    const { ingredients } = req.body

    try {
        const response = await axios.post(
            "https://api-inference.huggingface.co/models/mistralai/Mixtral-8x7B-Instruct-v0.1",
            {
                inputs: `Give recipe using: ${ingredients.join(", ")}`
            },
            {
                headers: {
                    Authorization: `Bearer ${process.env.VITE_HF_ACCESS_TOKEN}`
                }
            }
        )

        res.json(response.data)
    } catch (err) {
        console.error(err.message)
        res.status(500).send("AI error")
    }
})

app.listen(5000, () => {
    console.log("🔥 Server running on http://localhost:5000")
})

