import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";

const registerUser = asyncHandler(async (req, res) => {
  // get user details from frontend
  // validation - not empty
  // check if user already exists through username and email
  // check for images, check for avatar
  // upload them to cloudinary, avatar
  // create user object - create entry in dB
  // remove  password and refresh token field from response
  // check for user creation
  // return res

  const { fullName, username, email, password } = req.body;

  if (
    [fullName, email, username, password].some((field) => field?.trim() === "")
  ) {
    throw new ApiError(400, "All fields are required");
  }

   const existedUser = await User.findOne({
     $or: [{ username }, { email }],
   });

   if (existedUser) {
     throw new ApiError(409, "User with email or username already exists");
   }

   
});

export { registerUser };
