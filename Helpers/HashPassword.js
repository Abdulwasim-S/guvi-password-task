import bcrypt from 'bcrypt';

export const generateHashedPassword = async(password)=>{
    const salt = await bcrypt.genSalt(10);
    const hasedPassword = await bcrypt.hash(password,salt);
    return hasedPassword
}

export const verifyHashedPassword = async(password,hasedPassword)=>{
    const verification = await bcrypt.compare(password,hasedPassword);
    return verification;
}