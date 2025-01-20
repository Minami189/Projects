import React, {useEffect} from 'react';

function Foods({ foods, setFoods, plan, setPlan, fetchPlans }) {
    
    
    async function handleDelete(id) {
        await fetch(`http://localhost:5000/plans/${id}`, {
            method: 'DELETE',
            headers:{"Content-Type": "application/json"},
            body: JSON.stringify({idfood: id})
        });
        const response = await fetch(`http://localhost:5000/api/${id}`, {
            method: 'DELETE',
        });
   
        setFoods(foods.filter(f => f.idfood != id));
        setPlan(plan.filter(p=> p.idfood != id));
    }

    async function handleEaten(id) {
        await fetch(`http://localhost:5000/api/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ lastEaten: new Date().toLocaleDateString('en-CA') }),
        });
        const result = await fetch('http://localhost:5000/api');
        const { data } = await result.json();
        setFoods(data);
    }

    function formatDate(dateString) {
        if (!dateString) return 'N/A';
        const date = new Date(dateString);
        return new Intl.DateTimeFormat('en-US', { month: 'long', day: 'numeric', year: 'numeric' }).format(date);
    }

    function formatDays(lastEaten) {
        if (!lastEaten) return 'N/A';
        const today = new Date();
        const lastAte = new Date(lastEaten);
        return Math.round((today - lastAte) / 1000 / 60 / 60 / 24 - 1);
    }

    async function handlePlan(id){
        const result = await fetch(`http://localhost:5000/plans`,{
            method:'POST',
            headers:{'Content-Type': 'application/json'},
            body: JSON.stringify({
                idfood: id
            })
        });
        fetchPlans();
    }

    return (
        <>
        <h1 className='planner'>Add Dishes to Planner</h1>
        <div className="foods">
            
            {foods.map((food, index) => (
                <div key={index} className="food" onClick={()=>handlePlan(food.idfood)}>
                    <div className="foodHead">
                        <button onClick={(event) => {event.stopPropagation(); handleEaten(food.idfood)}} className='eatButton'>🍽</button>
                        <h3>{food.name}</h3>
                        <button onClick={(event) => {event.stopPropagation(); handleDelete(food.idfood)}}>✖</button>
                    </div>
                    <h5 className="meat">{food.meat}</h5>
                    <div className="info">
                        <div className={food.lastEaten ? "Eaten" : "lastAte"}>{`Last Ate: ${formatDate(food.lastEaten)}`}</div>
                        <div className={food.lastEaten ? "Eaten" : "lastAte"}>{`Days not Eaten: ${formatDays(food.lastEaten)}`}</div>
                    </div>
                </div>
            ))}
        </div>
        </>
    );
}

export default Foods;
