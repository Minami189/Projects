import React, {useState, useEffect, useRef} from 'react';


function SearchBar({tempFoods, setFoods}){
    const dishName = useRef("");
    const dishMeat = useRef("");


    function handleChange(){
       const newName = dishName.current.value.toLowerCase();
       const newMeat = dishMeat.current.value.toLowerCase();

       let newFoods = tempFoods.filter(food=>{
            return(food.name.toLowerCase().startsWith(newName));
       });

       newFoods = newFoods.filter(food=>{
            return(food.meat.toLowerCase().startsWith(newMeat) || food.meat=="ANY");
       });

       setFoods(newFoods);
    }

    

    return(
        <>
            <div className='Search'>
                <h2>Filter:</h2>
                <div className='searchBars'>
                    <input onChange={handleChange} ref={dishName} placeholder='food'></input>
                    <input onChange={handleChange} ref={dishMeat}placeholder='meat'></input>
                </div>
            </div>
        </>
        
        
    );
}

export default SearchBar;