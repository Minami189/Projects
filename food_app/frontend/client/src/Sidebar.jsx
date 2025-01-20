import React, { useRef, useEffect } from 'react';

function Sidebar({ setFoods, foods, fetchData, plan, setPlan, tempFoods, setTemp, fetchPlans }) {
    const nameInput = useRef('');
    const meatInput = useRef('');

    
    async function handleCreate() {
        const foodName = nameInput.current.value;
        let meatName = meatInput.current.value;
        if(foodName.length < 1) return alert("must enter foodname");
        if(meatName.length < 1) meatName = "ANY";
        const result = await fetch('http://localhost:5000/api', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name: foodName, meat: meatName }),
        });
        
        nameInput.current.value = "";
        meatInput.current.value = "";
        fetchData();
    }

    async function handleDelete(id){
        await fetch(`http://localhost:5000/plans/${id}`, {
            method: "DELETE"
        });
        setPlan(plan.filter(p => {if(p.idplan != id) return p}));
    }

    async function handleRandomize(){
        const randNum = Math.floor(Math.random() * foods.length);
        const id = foods[randNum].idfood;
        
        await fetch(`http://localhost:5000/plans`,{
            method:'POST',
            headers:{'Content-Type': 'application/json'},
            body: JSON.stringify({
                idfood: id
            })
        });

        fetchPlans();
    }

    async function handleClear(){
        for(const p of plan){
            await fetch(`http://localhost:5000/plans/${p.idplan}`, {
                method: "DELETE"
            });
        }
        fetchPlans();
    }

    async function handleEaten(index){
        const id = plan[index].idfood;
        const planid = plan[index].idplan;
        await fetch(`http://localhost:5000/api/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ lastEaten: new Date().toLocaleDateString('en-CA') }),
        });
        const result = await fetch('http://localhost:5000/api');
        const { data } = await result.json();
        setFoods(data);

        handleDelete(planid);
    }

    return (
        <div className="sidebar">
            <div className="interface">
                <h1>Add Dish</h1>
                <input placeholder="name" type="text" ref={nameInput} />
                <input placeholder="meat" type="text" ref={meatInput} />
                <button className="createButton" onClick={handleCreate}>
                    Create
                </button>
            </div>

            <div className="plan">
                <h1>Weekly Planner</h1>
                <div className="controls">
                    <button onClick={handleRandomize} className='randomizeButton' >Add Random</button>
                    <h2 onClick={handleClear}>🗑</h2>
                </div>
                
           
            <div className='week'>
                { 
                plan.map((day, index)=> 
                <div className="planTemplate" key={index}>
                    <h2 onClick={()=>{handleEaten(index)}}>🍽</h2>
                <div className="dayMeal" onClick={()=>handleDelete(day.idplan)}>
                    <h5>Day {index+1}</h5>
                    {tempFoods.map(tempFoods => tempFoods.idfood == day.idfood ? <h4 key={index}>{tempFoods.name}</h4> : "")}
                    {tempFoods.map(tempFoods => tempFoods.idfood == day.idfood ? <h5 key={index}>{tempFoods.meat}</h5> : "")}
                </div>
                </div>
                )}
            </div>
                

            
            </div>
        </div>
    );
}

export default Sidebar;
