// import jwt from "jsonwebtoken";

// const isAuthenticated = async (req, res, next) => {
//   try {
//     const token = req.cookies.token;

//     if (!token) {
//       return res.status(401).json({
//         success: false,
//         message: "User not authenticated",
//       });
//     }

//     const decode = await jwt.verify(token, process.env.SECRET_KEY);

//     if (!decode) {
//       return res.status(401).json({
//         success: false,
//         message: "Invalid token",
//       });
//     }

//     req.id = decode.userId;

//     next();
//   } catch (error) {
//     console.log(error);
//   }
// };

// export default isAuthenticated;

import jwt from "jsonwebtoken";

const isAuthenticated = async (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "User not authenticated",
      });
    }

    // Verify token using the secret from .env
    const decode = jwt.verify(token, process.env.SECRET_KEY);

    if (!decode) {
      return res.status(401).json({
        success: false,
        message: "Invalid token",
      });
    }

    // The payload key must match the one used in generateToken
    req.id = decode.id;

    next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({
      success: false,
      message: "Invalid or expired token",
    });
  }
};

export default isAuthenticated;
