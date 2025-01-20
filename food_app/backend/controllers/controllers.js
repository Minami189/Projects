import mysql from 'mysql2';
import pool from '../database/db.js';



//--------------------------------------For the food tables---------------------------------------------
export async function getAllFood(req,res){
    const [result] = await pool.query("SELECT * FROM food");
    res.json({success:true, data:result});
}

export async function createFood(req,res){
    const {name, meat} = req.body;
    try{
        const result = await pool.query("INSERT INTO food(`name`, meat) VALUES(?, ?)", [name, meat]);
        res.json({success:true, result:result});
    }catch(error){
        res.json({success:false})
    }
}

export async function getSingleFood(req, res){
    const {id} = req.params;
    try{
        const [result] = await pool.query("SELECT * FROM food where idfood = ?", [id]);
        res.json({success:true, data: result});
    }catch(error){
        res.json({succss:false});
    }
}

export async function removeFood(req,res){
    const {id} = req.params;

    try{
        const result = await pool.query("DELETE FROM food where idfood = ?", [id]);
        res.json({success:true, msg:result});
    }catch(error){
        res.json({success:false, msg:error});
    }

}

export async function editFood(req,res){
    const {id} = req.params;
    const {lastEaten, plan} = req.body;

    try{
        const result = await pool.query("UPDATE food SET lastEaten = ? where idfood = ?", [lastEaten, id]);
        return res.json({success:true, msg:result});
    }catch(error){
        return res.json({success:false, msg:error});
    }
}



//---------------------------------------For  the weekly plan---------------------------------------------------

export async function getPlans(req,res){

    try{
        const [result] = await pool.query("SELECT * FROM plan ORDER BY idplan");
        res.json({success:true, data:result});
    }catch(error){
        res.json({success:false, error:error})
    }
}

export async function createPlan(req,res){
    const {idfood} = req.body;
    try{
        const result = await pool.query("INSERT INTO plan(idfood) VALUES(?)", [idfood]);
        res.json({success:true, msg:result});
    }catch(error){
        res.json({success:false, msg:error});
    }
    
}

export async function deletePlan(req,res){
    const {id} = req.params;
    console.log(id);
    const {idfood} = req.body;
    if(idfood){
        const result = await pool.query("DELETE FROM plan where idfood = ?", [idfood]);
        return res.json({success:true, msg:result});
    }
    const  result = await pool.query("DELETE FROM plan where idplan = ?", [id]);
    res.json({success:true, msg:result});
}

