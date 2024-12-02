require("dotenv").config();

const config = require("./config.json");
const mongoose = require("mongoose");

mongoose.connect(config.connectionString);

const User = require("./models/user.model.js");
const University = require("./models/education.modal.js");
const Experience = require("./models/experience.modal.js");

const express = require("express");
const cors = require("cors");
const app = express();

const jwt = require("jsonwebtoken");
const { authenticateToken } = require("./utilities.js");

app.use(express.json());

app.use(
  cors({
    origin: "*", // or '*' to allow all origins
  })
);

app.get("/", (req, res) => {
  res.json({ data: " hello" });
});

//Create Account

app.post("/create-account", async (req, res) => {
  const {
    name,
    surname,
    email,
    speciality,
    password,
    experience,
    about,
    price,
    phone,
    available,
    dateOfBirth
  } = req.body;

  if (!name) {
    return res
      .status(400)
      .json({ error: true, message: "Full name is required" });
  }

  if (!surname) {
    return res
      .status(400)
      .json({ error: true, message: "Full name is required" });
  }
  if (!email) {
    return res.status(400).json({ error: true, message: "Email is required" });
  }

  if (!password) {
    return res
      .status(400)
      .json({ error: true, message: "Password is required" });
  }

  const isUser = await User.findOne({ email: email });

  if (isUser) {
    return res.json({
      error: true,
      message: "User already exist",
    });
  }

  const user = new User({
    name,
    surname,
    speciality,
    email,
    password,
    experience,
    about,
    price,
    phone,
    dateOfBirth,
    available,
  });

  await user.save();

  const accessToken = jwt.sign({ user }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "36000m",
  });

  return res.json({
    error: false,
    user: {
      ...user.toObject(),
      userId: user.userId, // Explicitly include the auto-generated userId
    },
    accessToken,
    message: "registration successful",
  });
});

/* Login */
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email) {
    return res.status(400).json({ message: "Email is required" });
  }
  if (!password) {
    return res.status(400).json({ message: "Password is required" });
  }

  const userInfo = await User.findOne({ email: email });

  if (!userInfo) {
    return res.status(400).json({ message: "User not found" });
  }

  if (userInfo.email === email && userInfo.password === password) {
    const user = { user: userInfo };
    const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: "36000m",
    });

    return res.json({
      error: false,
      message: "Login Successful",
      user: {
        id: userInfo.userId, // Include the user ID in the response
        email: userInfo.email,
      },
      accessToken,
    });
  } else {
    return res.status(400).json({
      error: true,
      message: "Invalid credentials",
    });
  }
});


// Get all Teachers

app.get("/get-all-teacher", async (req, res) => {
  try {
    // Retrieve all users from the database
    // You can use .select() to exclude sensitive information like password
    const users = await User.find().select("-password");

    return res.json({
      error: false,
      users: users,
      message: "Users retrieved successfully",
    });
  } catch (error) {
    console.error("Error retrieving users:", error);
    return res.status(500).json({
      error: true,
      message: "Failed to retrieve users",
    });
  }
});



app.put("/update-profile", authenticateToken, async (req, res) => {
  try {
    const {
      name,
      surname,
      speciality,
      experience,
      about,
      price,
      phone,
      dateOfBirth, // Make sure this matches exactly
      available
    } = req.body;

    // Extract user ID from the authenticated token
    const userId = req.user.user._id;

    // Find the user by MongoDB _id
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        error: true,
        message: "User not found"
      });
    }

    // Update fields if they are provided in the request
    if (name) user.name = name;
    if (surname) user.surname = surname;
    if (speciality) user.speciality = speciality;
    if (experience) user.experience = experience;
    if (about) user.about = about;
    if (price !== undefined) user.price = price;
    if (phone) user.phone = phone;

    // Specifically handle dateOfBirth
    if (dateOfBirth) {
      try {
        // Validate and parse the date
        const parsedDate = new Date(dateOfBirth);
        
        // Check if the date is valid
        if (!isNaN(parsedDate.getTime())) {
          user.dateOfBirth = parsedDate;
        } else {
          return res.status(400).json({
            error: true,
            message: "Invalid date format"
          });
        }
      } catch (dateError) {
        console.error("Date parsing error:", dateError);
        return res.status(400).json({
          error: true,
          message: "Failed to parse date"
        });
      }
    }

    if (available !== undefined) user.available = available;

    // Save the updated user
    await user.save();

    // Respond with updated user information (excluding sensitive data)
    return res.json({
      error: false,
      user: {
        _id: user._id,
        name: user.name,
        surname: user.surname,
        speciality: user.speciality,
        experience: user.experience,
        about: user.about,
        price: user.price,
        phone: user.phone,
        dateOfBirth: user.dateOfBirth, // Include dateOfBirth in response
        available: user.available
      },
      message: "Profile updated successfully"
    });
  } catch (error) {
    console.error("Profile update error:", error);
    return res.status(500).json({
      error: true,
      message: "Failed to update profile"
    });
  }
});

// Get user based on Id
app.get("/get-user/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;

    // Find user by the custom userId, excluding password
    const user = await User.findOne({ userId: userId }).select("-password");

    if (!user) {
      return res.status(404).json({
        error: true,
        message: "User not found",
      });
    }

    return res.json({
      error: false,
      user: user,
      message: "User retrieved successfully",
    });
  } catch (error) {
    console.error("Error retrieving user:", error);
    return res.status(500).json({
      error: true,
      message: "Failed to retrieve user",
    });
  }
});


// Get  Teacher --- Your Profile

app.get("/get-teacher", authenticateToken, async (req, res) => {
  const { user } = req.user;

  const isUser = await User.findOne({ _id: user._id });

  if (!isUser) {
    return res.sendStatus(401);
  }

  return res.json({
    user: {
      name: isUser.name,
      surname: isUser.surname,
      speciality: isUser.speciality,
      email: isUser.email,
      _id: isUser._id,
      createdOn: isUser.createdOn,
    },
    message: "",
  });
});



// add university

app.post("/create-university", authenticateToken, async (req, res) => {
  try {
    const {
      university,
      faculty,
      startDate,
      endDate,
      about_university
    } = req.body;

    // Validate required fields
    if (!university) {
      return res.status(400).json({
        error: true,
        message: "University name is required"
      });
    }

    if (!faculty) {
      return res.status(400).json({
        error: true,
        message: "Faculty is required"
      });
    }

    if (!startDate) {
      return res.status(400).json({
        error: true,
        message: "Start date is required"
      });
    }

    if (!endDate) {
      return res.status(400).json({
        error: true,
        message: "End date is required"
      });
    }

    // Get teacher ID from authenticated token
    const teacherId = req.user.user._id;

    // Create new university entry
    const universityEntry = new University({
      university,
      faculty,
      startDate: new Date(startDate),
      endDate: new Date(endDate),
      about_university,
      teacherId
    });

    // Save the university entry
    await universityEntry.save();

    // Respond with the created university entry
    return res.status(201).json({
      error: false,
      university: {
        universityId: universityEntry.universityId,
        university: universityEntry.university,
        faculty: universityEntry.faculty,
        startDate: universityEntry.startDate,
        endDate: universityEntry.endDate,
        about_university: universityEntry.about_university
      },
      message: "University entry created successfully"
    });

  } catch (error) {
    console.error("Create university error:", error);
    return res.status(500).json({
      error: true,
      message: "Failed to create university entry"
    });
  }
});


// get universtiy by teacher ID

app.get("/get-teacher-universities/:teacherId", async (req, res) => {
  try {
    const { teacherId } = req.params;

    // Validate if the teacherId is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(teacherId)) {
      return res.status(400).json({
        error: true,
        message: "Invalid teacher ID"
      });
    }

    // Convert to MongoDB ObjectId
    const validTeacherId = new mongoose.Types.ObjectId(teacherId);

    // Find all universities for this teacher
    const universities = await University.find({ teacherId: validTeacherId });

    // Check if any universities exist
    if (universities.length === 0) {
      return res.status(404).json({
        error: true,
        message: "No universities found for this teacher"
      });
    }

    return res.json({
      error: false,
      universities: universities.map(uni => ({
        universityId: uni.universityId,
        university: uni.university,
        faculty: uni.faculty,
        startDate: uni.startDate,
        endDate: uni.endDate,
        about_university: uni.about_university
      })),
      message: "Universities retrieved successfully"
    });

  } catch (error) {
    console.error("Get teacher universities error:", error);
    return res.status(500).json({
      error: true,
      message: "Failed to retrieve universities"
    });
  }
});


// Add Experience  
app.post("/create-experience", authenticateToken, async (req, res) => {
  try {
    const {
      company_name,
      position,
      startDate,
      endDate,
      about_experience
    } = req.body;
    
    // Validate required fields
    if (!company_name) {
      return res.status(400).json({
        error: true,
        message: "Company name is required"
      });
    }
    
    if (!position) {
      return res.status(400).json({
        error: true,
        message: "Position is required"
      });
    }
    
    if (!startDate) {
      return res.status(400).json({
        error: true,
        message: "Start date is required"
      });
    }
    
    if (!endDate) {
      return res.status(400).json({
        error: true,
        message: "End date is required"
      });
    }
    
    // Get teacher ID from authenticated token
    const teacherId = req.user.user._id;
    
    // Create new experience entry
    const experienceEntry = new Experience({
      company_name,
      position,
      startDate: new Date(startDate),
      endDate: new Date(endDate),
      about_experience,
      teacherId
    });
    
    // Save the experience entry
    await experienceEntry.save();
    
    // Respond with the created experience entry
    return res.status(201).json({
      error: false,
      experience: {
        experienceId: experienceEntry._id,
        company_name: experienceEntry.company_name,
        position: experienceEntry.position,
        startDate: experienceEntry.startDate,
        endDate: experienceEntry.endDate,
        about_experience: experienceEntry.about_experience
      },
      message: "Experience entry created successfully"
    });
  } catch (error) {
    console.error("Create experience error:", error);
    return res.status(500).json({
      error: true,
      message: "Failed to create experience entry"
    });
  }
});


// Get Experiences by Teacher ID
app.get("/get-teacher-experiences/:teacherId", async (req, res) => {
  try {
    const { teacherId } = req.params;

    // Validate that the teacherId is provided
    if (!teacherId) {
      return res.status(400).json({
        error: true,
        message: "Teacher ID is required"
      });
    }

    // Find experiences for the specific teacher
    const experiences = await Experience.find({ teacherId: teacherId });

    // Check if any experiences exist for this teacher
    if (experiences.length === 0) {
      return res.status(404).json({
        error: true,
        message: "No experiences found for this teacher"
      });
    }

    // Return the experiences
    return res.json({
      error: false,
      experiences: experiences,
      message: "Teacher experiences retrieved successfully"
    });
  } catch (error) {
    console.error("Error retrieving teacher experiences:", error);
    return res.status(500).json({
      error: true,
      message: "Failed to retrieve teacher experiences"
    });
  }
});






app.listen(5000);

module.exports = app;
