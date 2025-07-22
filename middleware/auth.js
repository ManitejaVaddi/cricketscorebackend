import jwt from "jsonwebtoken";
const SECRET = "something"; 

const auth = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "No token provided" });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, SECRET);

    req.user = decoded.id; 
    next();
  } catch (err) {
    console.error("Auth error:", err);
    res.status(403).json({ message: "Unauthorized or token expired" });
  }
};

export default auth;
