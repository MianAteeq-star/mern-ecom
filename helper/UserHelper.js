import bcrypt from "bcrypt"



export const  hashedPassword =async (password)=>{
try {
    const saltRounds = 10
    const hashedPassword = await bcrypt.hash(password, saltRounds)
 return hashedPassword
} catch (error) {
console.log("error in hashedPassword : ", error);
}

} 


export const comparePassword = (password1, hashedPassword) =>{
    return bcrypt.compare(password1, hashedPassword)
}