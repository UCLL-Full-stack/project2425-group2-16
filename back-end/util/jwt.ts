import jwt from "jsonwebtoken";

const generateJWTtoken = ({username}: {username: string}): string => {
    const payload = {username}
    const secret = process.env.JWT_SECRET as string;
    const expire = process.env.JWT_EXPIRES_HOURS;
    const options = {expiresIn: `${expire}h`, issuer: `games_app`}

    try{
        const token = jwt.sign(payload, secret, options);
        return token;
    }

    catch (error){
        console.log(error);
        throw new Error('There was an error generating JWT token, see server log for details.');
    }
}

export default generateJWTtoken;