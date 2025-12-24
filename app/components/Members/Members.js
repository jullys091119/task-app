import { Avatar } from "@heroui/react"

export const Members = () => {
    const data  =  ["1", "2", "3", "4"]

   const ShowAvatar = () => {
     return (
         
        
            <Avatar/>
        
     )
   }

    return (
        <div>
            <h3>Members</h3>

            {
                data.map((item, i)=> (<ShowAvatar key={i}/>))
            }
            
        </div>
    )
}