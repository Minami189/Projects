import React, { useState, useEffect } from 'react';
import Header from './Header.jsx';
import SearchBar from './SearchBar.jsx';
import Foods from './Foods.jsx';
import Sidebar from './Sidebar.jsx';
function App() {
  const [foods, setFoods] = useState([]);
  const [tempFoods, setTemp] = useState([]);
  const [plan, setPlan] = useState([]);

  async function fetchData() {
    console.log('loading...');
    const result = await fetch('http://localhost:5000/api');
    const { data } = await result.json();

    if(JSON.stringify(data) !== JSON.stringify(foods)){
      setFoods(data);
      setTemp(data);
    }
  }

  async function fetchPlans(){
    console.log('loading...');
    const result = await fetch('http://localhost:5000/plans');
    const { data } = await result.json();

    if(JSON.stringify(data) !== JSON.stringify(plan)){
      setPlan(data);
    }
  }

  useEffect(()=>{
    fetchData();
    fetchPlans();
  }, [])

  return (
    <div className="foodApp">
    <div className="head">
      <Header/>
      <SearchBar tempFoods={tempFoods} setFoods={setFoods}/>

      <Sidebar setFoods={setFoods} foods={foods} fetchData={fetchData} 
      plan={plan} setPlan={setPlan} tempFoods={tempFoods} 
      setTemp={setTemp} fetchPlans={fetchPlans}/>
    </div>
    <Foods setFoods={setFoods} foods={foods} 
    plan={plan} setPlan={setPlan} 
    fetchPlans={fetchPlans}/>
    </div>
  );
}

export default App;