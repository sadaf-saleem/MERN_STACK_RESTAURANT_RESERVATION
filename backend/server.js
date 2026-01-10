import app from "./app.js";

app.listen(process.env.PORT,()=>{
    console.log(`Server Runing On Port ${process.env.PORT}`)
})