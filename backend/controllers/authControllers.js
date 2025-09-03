import User from "../models/user.model.js";
import generatetoken from "../utils/generatetoken.js";
import bcrypt from "bcrypt";
export async function signUp(req, res) {
    const { username, password, confirmPassword } = req.body;
    if (!username || !password || !confirmPassword) {
        return res.status(400).json({ message: "all fields are required" });
    }

    if (password !== confirmPassword) {
        return res.status(400).json({ message: "passwords do not match" });
    }

    try {
        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(password, salt);
        const newUser = new User({ username: username, password: hashedPassword });

        
        generatetoken(newUser,res);
        await newUser.save();

        res.status(201).json({
            _id: newUser._id,
            username: newUser.username,
            profilePic: newUser.profilePic,
        });
    } catch (err) {
        if (err.code === 11000) {
            return res.status(400).json({ message: "username already exists" });
        }
        console.error(err);
        res.status(500).json({ message: "internal server error" });
    }
}
export const login = async(req,res)=>{
    const {username,password}=req.body;
    const user= await User.findOne({username});
    const isPasswordCorrect=await bcrypt.compare(password,user?.password ||" ");
    
    if(!username || !password){
        return res.status(400).json({message:"all fields are required"});
    }
    if(!user||!isPasswordCorrect){
            return res.status(400).json({error:"invalid password or userName"})
        }
    generatetoken(user, res);
    res.status(200).json({message:"login"})
    
}
export function logout(req,res){
   
    try {
        res.cookie("jwt", "", { maxAge: 0 });
		res.status(200).json({ message: "Logged out successfully" });
        
    } catch (error) {
         console.log(`error;${error.message}`)
        res.status(500).json({error:"internal login error"});
    }
}
