
export const setImageData = async () => {
  try {
    const response = await fetch("./dataMockup/members.json")
    const data = await response.json()
    return data
  } catch (error) {
    console.error(error)
  }
}

