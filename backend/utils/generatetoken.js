import jwt from "jsonwebtoken";

const generateToken=(user,res)=>{
    const payload={
        id:user._id,
        username:user.username
    };
    const token=jwt.sign(payload,process.env.JWT_SECRET,{expiresIn:'1h'});
    res.cookie("jwt", token, {
		maxAge: 15 * 24 * 60 * 60 * 1000, // MS
		httpOnly: true, // prevent XSS attacks cross-site scripting attacks
		sameSite: "strict", // CSRF attacks cross-site request forgery attacks
		secure: process.env.NODE_ENV === "production", // set to true in production
	});
}
export default generateToken;