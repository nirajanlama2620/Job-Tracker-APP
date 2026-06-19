import authService from "../services/auth.service.js";
import jwt from "../utils/jwt.js";

const signup = async (req, res) => {
  const input = req.body;
  try {
     const user = await authService.signup(input);

    const token = jwt.createToken(user);

    res.cookie("authToken", token, {
      httpOnly: true,
      secure: false,
      maxAge: 86400 * 1000,
    });

    res.status(201).json({
      success: true,
      user,
      token
    });
  } catch (error) {
    console.log(error)
    res.status(400).json({ success: false, message: error.message, });
  }
};

const login = async ( req, res) => {
  const input = req.body;
  try {
    const user = await authService.login(input);

    const token = jwt.createToken(user);

    res.cookie("authToken", token, {
       httpOnly: true,
      secure: false,
      maxAge: 86400 * 1000,
    });

    res.status(200).json({ 
      success: true,
      message: "Login successfully",
       user,
       token
       });

  } catch (error) {
    console.log(error)
    res.status(401).json({
      success: false,
      message: error.message,
    });
  }
};

export default {
  login,
  signup
}