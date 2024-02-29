import User from "@/models/User";
import db from "@/utils/db";
import CryptoJS from "crypto-js";
import { validateEmail } from "@/utils/validation";
import { createRouter } from "next-connect";
import { createResetToken } from "@/utils/token";
import { sendEmail } from "@/utils/sendEmails";
import { resetEmailTemplate } from "@/emails/resetEmailTemplate";

const router = createRouter();

router.post(async (req, res) => {
  try {
    await db.connectDb();
    const { user_id, password } = req.body;
    const user = await User.findById(user_id);
    if (!user) {
      return res.status(400).json({ message: "This Account does not exist" });
    }
    const cryptedPassword = CryptoJS.AES.encrypt(
      password,
      process.env.SECRET_KEY
    );
    await user.UpdateOne({
      password: cryptedPassword,
    });
    await db.disconnectDb();
    return res.json({
      message: "Password changed",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router.handler();
