import jwt from "jsonwebtoken";
export function signToken(obj: {
  user_first_name: string;
  user_id: number;
  user_role: string;
}) {
  const token = jwt.sign(
    {
      data: {
        ...obj
      },
    },
    process.env.SECRET,
    { expiresIn: "10h" }
  );

  return token;
}
