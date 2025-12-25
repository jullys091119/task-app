
export const setImageData = async () => {
  try {
    const response = await fetch("./dataMockup/members.json")
    console.log(response)
    const data = await response.json()
    console.log(data)
    return data
  } catch (error) {
    console.error(error)
  }
}

