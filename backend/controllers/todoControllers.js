import {pool} from '../db.js';


export const getTodos = async(req,res)=>{
    try{
        const query = "SELECT * FROM todos";
        const [rows] = await pool.query(query);
        res.status(200).json(rows);
    }
    catch(err){
        res.status(500).json({message:"error fetching todos"})
    }
}
export const addTodo = async(req,res)=>{
    try{
        const {title} = req.body;
        const query = "INSERT INTO todos (title) VALUES (?)";
        await pool.query(query,[title])
        res.status(201).json({message:"Todo added successfully"})
    }
    catch(err){
        res.status(500).json({message:"error adding todo"})
    }
}

export const deleteTodo = async(req,res)=>{
    try{
        const {id} = req.params;
        const query = "DELETE FROM TODOS WHERE id = ?";
        await pool.query(query,[id]);
        res.status(200).json({message:"todo deleted successfully"})
    }
    catch(err){
        res.status(500).json({message:"error deleting todo"})
    }
}