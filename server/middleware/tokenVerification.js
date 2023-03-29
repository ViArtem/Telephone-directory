import jwt from "jsonwebtoken";

async function checkToken(req, res, next) {
  try {
    if (req.method === "OPTIONS") {
      next();
    }
    // checking for the presence of a token
    if (!req.headers.authorization) {
      return res.redirect("/user/registration");
    }

    // access token verification
    const accessToken = req.headers.authorization.split(" ")[1];
    jwt.verify(accessToken, process.env.ACCESS_KEY);

    next();
  } catch (error) {
    return res.status(401).json({ error: error });
  }
}
export { checkToken };
