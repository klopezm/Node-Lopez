import { ROLES } from "../models/Role";
import User from "../models/User";

export const checkRolesExisted = (req, res, next) => {
     if (req.body.roles) {
          for (let i = 0; i < req.body.roles.length; i++) {
               if (!ROLES.includes(req.body.roles[i])) {
                    return res.status(400).json({
                         message: `Role ${req.body.roles[i]} does not exist`,
                    });
               }
          }
     }
   
     next();
}

export const checkDuplicateUsernameOrEmail = async (req, res, next) => {
     try {
          const {username, email} = req.body;

          const user = await User.findOne({ username: username });
          
          if (user) return res.status(400).json({ message: "The user already exists" });
          
          const emailFound = await User.findOne({ email: email });
          
          if (emailFound) return res.status(400).json({ message: "The email already exists" });

          next();
     } catch (error) {
          res.status(500).json({ message: error });
     }
}
