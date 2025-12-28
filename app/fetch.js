
export const setImageData = async () => {
  try {
    const response = await fetch("./dataMockup/members.json")
    const data = await response.json()
    return data
  } catch (error) {
    console.error(error)
  }
}

export const getMembers = async () => {
  const response = await fetch("/api/members");
  const data = await response.json();
  return data
}


export const getProjects = async () => {
  const response = await fetch("/api/projects");
   const data = await response.json();
   return data
}

export const getTasks = async () => {
   const response = await fetch("/api/tasks");
   const data = await response.json();
   return data
}


export const setMembers = async () => {
  const response = await fetch("/api/members", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id: 10,
      name: "Marcos Zarate Sanchez",
      phone: "669234532",
      image: "https://images.unsplash.com/photo-1564167706513-020b270b2714",
    }),
  });

  const text = await response.text();  // Usamos .text() para ver el contenido crudo
  console.log("Response Text:", text);  // Esto nos ayudará a ver si es HTML

  // Verifica si la respuesta es JSON antes de hacer parse
  if (response.ok) {
    try {
      const result = JSON.parse(text);  // Intentamos parsear el texto manualmente
      console.log("Success:", result);
      return result;
    } catch (e) {
      console.error("Error parsing JSON:", e);
    }
  } else {
    console.error("Error:", response.status, text);
  }
};

