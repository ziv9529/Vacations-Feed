import jwt from "jsonwebtoken";
export default function verifyAdmin(req, res, next) {
  const authorization = req?.headers?.authorization;
  jwt.verify(authorization, process.env.SECRET, (err, decoded) => {
    if (err || decoded?.data?.user_role !== "admin") {
      return next({ ...err, status: 401 });
    } else {
      return next();
    }
  });
}
