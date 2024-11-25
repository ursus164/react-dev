import { useEffect, useState } from "react";
import MealItem from "./MealItem";

export default function Meals() {
  const [loadedMeals, setLoadedMeals] = useState([]);

  useEffect(() => {
    async function fetchMeals() {
        const resposne = await fetch("http://localhost:3000/meals");
    
        if (!resposne.ok) {
          // error
        }
    
        const meals = await resposne.json();
        setLoadedMeals(meals); //updating the state so there is a possible loop
      }

      fetchMeals();
    
  }, []); // running side effects after a component renders
  
  return (
    <ul id="meals">
      {loadedMeals.map((meal) => (
        <MealItem key={meal.id} meal={meal}/>
      ))}
    </ul>
  );
}
