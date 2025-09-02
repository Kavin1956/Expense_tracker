const express = require ("express")
const mongoose = require("mongoose")
const app = express()
const cors = require("cors")
app.use(express.json());
app.use(cors());
const PORT =3333;



mongoose.connect("mongodb+srv://kavinselvan1956_db_user:kavinsp1956@cluster0.ufhmc9l.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
.then(() => {
    console.log("Connected to MongoDB");
    
}).catch((error) => {
    console.log(error);
}); 

const expenseSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    amount:{
        type:Number,
        required:true
    }
})

const Expense = mongoose.model("Expense",expenseSchema);


app.get("/",(req,res)=>{
    res.send("Good morning");
})

app.post("/post",async(req,res)=>{
    try {
        const {title,amount}=req.body;
        const NewExpense = new Expense({
            title,
            amount
        })

        await NewExpense.save();
        res.json({message:"Expense created successfully",expense:NewExpense});
        
    } catch (error) {
        res.json({message:"Error creating expense",error:error.message});
    }

})

app.get("/get",async(req,res)=>{
    try {
        const expense = await Expense.find();
        res.json({messsage:"Expense retried Successfully",expense})
    } catch (error) {
        res.json({message:"Error retrieving expense"})
    }
})

app.delete("/delete/:id",async(req,res)=>{
    try {
        const {id}=req.params;
        await Expense.findByIdAndDelete(id);
        res.json({message: "Expense deleted succesfully"});
    } catch (error) {
        res.json(
            {message:"Error deleting expense",error:error}
        )
    }
})

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`)
})