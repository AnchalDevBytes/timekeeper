import jwt, { JwtPayload } from "jsonwebtoken";

const tokenSecret = process.env.TOKEN_SECRET ?? "tokenSecret";

export const generateToken = ( user: { id: number; email: string; name?: string | null }) => {
    return jwt.sign({
        userId: user.id,
        email: user.email,
        name: user.name
    }, tokenSecret, { expiresIn : '1d' });
}

export const verifyToken = (token : string) => {
    const verifiedUser = jwt.verify(token, tokenSecret) as JwtPayload;
    return verifiedUser;
}
