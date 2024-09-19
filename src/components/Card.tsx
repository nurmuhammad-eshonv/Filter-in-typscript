import { FC } from 'react'
interface User {
    name: string,
    age : number
 }
 interface CardProps {
    user: User
 }
const Card:FC<CardProps> = ({user}) => {
  
  return (
    <div>
       <div>
      <p>Name: {user.name}</p>
      <p>Age: {user.age}</p>
    </div>
    </div>
  )
}

export default Card