const { user, employer, jobSeeker } = require('../models');
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
const JobSeekerController = async (req, res) => {

  const { firstName, lastName, email, password, confirmPassword, education, experience, role } = req.body;

  if (!firstName || !lastName || !email || !password || !education || !experience) {
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
    const hashedPassword = await bcrypt.hash(password, salt);
    const confirmHashedPassword = await bcrypt.hash(confirmPassword, salt);
    const checkUser = await user.findOne({ where: { email } })
    if (checkUser) {
      return res.status(400).json({
        message: "User already Exist"
      });
    }
    const User = await user.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      confirmPassword: confirmHashedPassword,
      role: 'jobSeeker'
    })
    // Create a new JobSeeker record associated with the User
    const JobSeeker = await jobSeeker.create({
      education,
      experience
    });
    await JobSeeker.setUser(User);

    // Return a success response
    return res.status(201).json({ message: 'JobSeeker registered successfully' });

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: 'Internal Server Error',
    });
  }

}

const employerController = async (req, res) => {
  try {
    // Extract the data from the request body
    const { firstName, lastName, email, password, confirmPassword, companyName, industry } = req.body;
    // Generate a salt to use for hashing
    const salt = await bcrypt.genSalt(12)
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create a new User record
    const User = await user.create({
      firstName,
      lastName,
      email,
      password:hashedPassword,
      confirmPassword:hashedPassword,
      role:"Employer"
    });

    // Create a new Employer record associated with the User
    const Employer = await employer.create({
      companyName,
      industry
    });
    await Employer.setUser(User);

    // Return a success response
    return res.status(201).json({ message: 'Employer registered successfully' });
  } catch (error) {
    // Handle any errors that occur during the registration process
    console.error('Error registering employer:', error);
    return res.status(500).json({ message: 'Unable to register employer' });
  }
}


const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const findUser = await user.findOne({ where: { email } });

    if (!findUser) {
      const role = findUser.role; // Access the role name directly from the associated role model
      const token = await generatedToken(findUser.id);
      res.status(200).json({
        jwt: token.token,
        type: "Bearer",
        user: {
          id: findUser.id,
          username: findUser.email,
        },
      });
      return res.status(400).json({
        path: req.path,
        message: "Unauthorize",
        error: "Bad Credential",
      });
    }

    const compareWith = await bcrypt.compare(password, findUser.password);

    if (compareWith) {
      const token = await generatedToken(findUser.id);
      return res.status(200).json({

        message: "Login successful",
        jwt: token.token,
        type: "Bearer",
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
    console.log(error);
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
const getEmployer = async (req, res) => {
  const seeker = await employer.findAll({ raw: true });
  const filteredEmployer = seeker.map((user) => {
    delete user.confirmPassword;
    delete user.password;
    return user;
  });
  res.json({
    filteredEmployer: filteredEmployer
  });
};

// Generate JWT
const generatedToken = async (id) => {
  try {
    const token = jwt.sign({ id }, `${process.env.JWT_SECRET}`, { expiresIn: "1d" });
    return { token };
  } catch (error) {
    console.error(error);
    throw new Error("Error generating token");
  }
};

module.exports = { JobSeekerController, employerController, loginUser, getJobSeeker, getEmployer }