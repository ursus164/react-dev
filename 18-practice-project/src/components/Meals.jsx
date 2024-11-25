import { useEffect, useState } from "react";

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
        <li key={meal.id}>{meal.name}</li>
      ))}
    </ul>
  );
}
