export async function fetchAvailablePlaces() {
  const response = await fetch("http://localhost:3000/places");
  const resData = await response.json();

  if (!response.ok) {
    const error = new Error("Failed to fetch places");
    throw new error();
  }

  return resData.places;
}

export async function updateUserPlaces(places) {
  const response = await fetch("http://localhost:3000/user-places", {
    method: "PUT",
    body: JSON.stringify({ places: places }),
    headers: {
      "Content-Type": "application/json", // informing browser that data attached to request will be in JSON format. It ensures that data will be extracted correctly in the backend
    },
  });
  const resData = await response.json();

  if (!response.ok) {
    throw new Error("Failed to update data!");
  }
  return resData.message;
}

export async function fetchUserPlaces() {
    const response = await fetch("http://localhost:3000/user-places")
    const resData = await response.json();
    
    if(!response.ok) {
        throw new Error('Failed to fetch user places!')
    }
    return resData.places;
}
