
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

export const getEvents = async () => {
  const response = await fetch("/api/events");
  const data = await response.json();
  return data
}





export const setMembers = async (name, role, avatar) => {
  function generarIdNumerico() {
    const timestamp = Date.now();
    const random = Math.floor(Math.random() * 1000000);
    return Number(`${timestamp}${random}`);
  }

  let id = generarIdNumerico()
  const response = await fetch("/api/members", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id: id,
      nombre: name,
      rol: role,
      avatar: avatar,
    }),
  });

  const text = await response.text();

  if (response.ok) {
    try {
      const result = JSON.parse(text);
      console.log("Success:", result);
      return result;
    } catch (e) {
      console.error("Error parsing JSON:", e);
    }
  } else {
    console.error("Error:", response.status, text);
  }
};


export const setNewProject = async (name, subtitle, description, asignados) => {
  try {
    const response = await fetch("/api/projects", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nombre: name,
        subtitulo: subtitle,
        descripcion: description,
        asignados: asignados,
      }),
    });

    if (response.ok) {
      const result = await response.json();
      console.log("Proyecto creado con éxito:", result);
      return result; 
    } else {
      const errorData = await response.json().catch(() => ({}));
      console.error("Error al crear proyecto:", response.status, errorData);
      throw new Error(errorData.message || "Error al crear el proyecto");
    }
  } catch (error) {
    console.error("Error de red o inesperado:", error);
    throw error; 
  }
};

export const setNewTask = async (date,task, descriptionTask,color) => {

  try {
    const response = await fetch("/api/events", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        date,
        task,
        descriptionTask,
        completed: false,
        color
      }),
    })

    if (response.ok) {
      const result = await response.json();
      console.log("Tarea creada con éxito:", result);
      return result; 
    } else {
      const errorData = await response.json().catch(() => ({}));
      console.error("Error al crear la tarea:", response.status, errorData);
      throw new Error(errorData.message || "Error al crear la tarea ");
    }
  } catch (error) {
    console.error("Error de red o inesperado:", error);
    throw error; 
  }
}