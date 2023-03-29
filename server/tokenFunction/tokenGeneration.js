import jwt from "jsonwebtoken";

class toketGeneration {
  // function generates an access token
  async accessToken(id, username, role, avatar) {
    try {
      const payload = {
        id,
        username,
        role,
        avatar,
      };

      return jwt.sign(payload, process.env.ACCESS_KEY, { expiresIn: "15m" });
    } catch (error) {
      return { accsessTokenValidate: error };
    }
  }
  // function generates an refresh token
  async refreshToken(id, username) {
    try {
      const payload = {
        id,
        username,
      };
      return jwt.sign(payload, process.env.REFRESH_KEY, { expiresIn: "3d" });
    } catch (error) {
      return { refreshTokenValidate: error };
    }
  }
  // function generates a new refresh token after the access token has gone bad
  async refreshAfterUpdatingAccessToken(id, username, exp, iat) {
    try {
      const payload = {
        id,
        username,
      };

      return jwt.sign(payload, process.env.REFRESH_KEY, {
        expiresIn: `${exp - iat - 900}s`,
      });
    } catch (error) {
      return { refreshTokenValidate: error };
    }
  }
}
export default new toketGeneration();
