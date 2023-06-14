import jwt from "jsonwebtoken";
import {} from "dotenv/config.js";

export const generateToken = async (value) => {
  const token = await jwt.sign(
    { value }, 
    process.env.SECRET_KEY, 
    {expiresIn: "1d",
  });
  return token;
};
