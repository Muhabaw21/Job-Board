
const {jobSeeker} = require("../models");
const bcrypt =require("bcryptjs");
const registration = async(req, res)=>{
      
const {firstName, lastName, email, password,confirmPassword,education, experience, address, role} = req.body;

    if(!firstName || !lastName || !email || !password || !education || !experience || !address || !role){
            return res.status(400).json({            
                    path: req.path,
                    error: 'Please add all fields',
                    message: 'All fields required',
                    status: 400,         
            });
        }
  try {
    if (password !== confirmPassword) {
              return res.status(400).json({
                message: 'Passwords do not match',
                  });
    } 
     // Generate a salt to use for hashing
const salt = await bcrypt.genSalt(12)
const hashedPassword =  await bcrypt.hash(password, salt);
const confirmHashedPassword = await bcrypt.hash(confirmPassword, salt);
const checkUser = await jobSeeker.findOne({where:{email}})
                if(checkUser){
                    return res.status(400).json({
                        message: "User already Exist"
                    });
}
               // Check if passwords match
  if (password !== confirmPassword) {
                    return res.status(400).json({
                      message: 'Passwords do not match',
                    });
                }   
const saveJobSeeker = await jobSeeker.create({
        firstName, 
        lastName,
        email,
        password:hashedPassword,
        confirmPassword:confirmHashedPassword,
        role,
        education,
        experience,
        address
})
if(saveJobSeeker){
                return res.status(201).json({
                    message:"Successfully Registered"
                })
                
              }    
            else {
                return res.status(400).json({
                  path: req.path,
                  error: 'Please add all fields',
                  message: 'All fields required',
                  status: 400,
                });
              }


        } catch (error) {
            console.error(error);
            return res.status(500).json({
              message: 'Internal Server Error',
            });
        }
    
      }
      const loginUser = async (req, res) => {
        const { email, password } = req.body;
      
        try {
          const findUser = await jobSeeker.findOne({ where: { email } });
      
          if (!findUser) {
            return res.status(400).json({
              path: req.path,
              message: "Unauthorize",
              error: "Bad Credential",
            });
          }
      
          const compareWith = await bcrypt.compare(password, findUser.password);
      
          if (compareWith) {
            return res.status(200).json({
              message:"Login successful",
              user: {
                id: findUser.id,
                username: findUser.email,
              },
            });
          } else {
            return res.status(401).json({
              path: req.path, 
              message: "Invalid User Name or Password",
              status: 401,
            });
          }
        } catch (error) {
          return res.status(500).json({
            path: req.path,
            message: "Internal Server Error",
            status: 500,
          });
        }
      };
      
      const getJobSeeker = async (req, res) => {
        const seeker = await jobSeeker.findAll({ raw: true });
        const filteredJobSeeker = seeker.map((user) => {
          delete user.confirmPassword;
          delete user.password;
          return user;
        });
        res.json({
          filteredJobSeeker: filteredJobSeeker
        });
      };
      
      module.exports = {registration, loginUser, getJobSeeker}