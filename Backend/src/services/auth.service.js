import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import * as repository from "../repositories/auth.repository.js";

const signup = async (data) => {

  // Check if email already exists
  const user = await repository.findByEmail(data.email);

  if (user) {
    throw {
      status: 409,
      message: "Email already exists"
    };
  }

  // Generate salt
  const salt = await bcrypt.genSalt(10);

  // Hash password
  const hashedPassword = await bcrypt.hash(data.password, salt);

  // Create User
  const createdUser = await repository.createUser({
    full_name: data.full_name,
    email: data.email,
    password: hashedPassword,
    role: data.role,
  });

  // Return user data without password
  return {
    id: createdUser.id,
    full_name: createdUser.full_name,
    email: createdUser.email,
    role: createdUser.role,
  };

};

const login = async ( data ) => {
  const user = await repository.findByEmail( data.email );

  // console.log("USER FROM DB:", user);
  if (!user) {
    throw new Error( "Invalid credentials" );
  }

  const match = await bcrypt.compare( data.password, user.password );

  if (!match) {
    throw new Error( "Invalid credentials" );
  }

  return { 
    id: user.id,
    full_name: user.full_name,
    email: user.email,
    role: user.role,
    password: user.password
  };
};

export default {
  signup,
  login
}