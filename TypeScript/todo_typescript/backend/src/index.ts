import express,{Request, Response, NextFunction} from "express";
import bodyParser from "body-parser";
import cors from "cors";
import todoRoutes from "./routes/todo.routes";

const app = express();

app.use(bodyParser.json());
app.use(cors()); 

app.use("/todos", todoRoutes);

// middlware to handle error any other request
app.use((err : Error, req : Request,res : Response,next : NextFunction) => {
  res.status(500).json({message:err.message});
})

app.listen(1513, () => {
  console.log('Server is running on port 1513');
})