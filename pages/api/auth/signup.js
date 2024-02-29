import User from "@/models/User";
import db from "@/utils/db";
import CryptoJS from "crypto-js";
import { validateEmail } from "@/utils/validation";
import { createRouter } from "next-connect";
import { createActivationToken } from "@/utils/token";
import { sendEmail } from "@/utils/sendEmails";
import { activateEmailTemplate } from "@/emails/activateEmailTemplate";

const router = createRouter();

router.post(async (req, res) => {
  try {
    await db.connectDb();
    const { name, email, password } = req.body;
    if (!name || !email || !password)
      return res.status(400).json({ message: "Please fill in all fields." });

    if (!validateEmail(email))
      return res.status(400).json({ message: "Invalid email." });

    const user = await User.findOne({ email });

    if (user)
      return res.status(400).json({ message: "This email already exsits." });
    if (password < 6)
      return res
        .status(400)
        .json({ message: "Password must be atleast 6 characters." });

    const cryptedPassword = CryptoJS.AES.encrypt(
      password,
      process.env.SECRET_KEY
    );
    const newUser = new User({ name, email, password: cryptedPassword });
    const savedUser = await newUser.save();
    const activation_token = createActivationToken({
      id: savedUser._id.toString(),
    });
    const url = `${process.env.BASE_URL}/activate/${activation_token}`;
    sendEmail(email, url, "", "Activate your account.", activateEmailTemplate);
    await db.disconnectDb();
    return res.json({
      message: "Success Registration, Please activate your to start",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router.handler();
