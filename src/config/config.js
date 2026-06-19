import dotenv from "dotenv";

dotenv.config();

const config = {
    jwtSecret: process.env.JWT_SECRET || "",
    port: process.env.PORT || "",
}

export default config;