import express from "express"

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.get("/", (req, res, next) => {
	res.send("Hello world!")
})

app.listen(3000, (error) => {
	if (!error){
		console.log("connect")
	}
	console.log(error)
})