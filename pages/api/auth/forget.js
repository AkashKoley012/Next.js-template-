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
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "The email does not exist" });
    }
    const user_id = createResetToken({
      id: user._id.toString(),
    });
    const url = `${process.env.BASE_URL}/auth/reset/${user_id}`;
    sendEmail(email, url, "", "Reset your password.", resetEmailTemplate);
    await db.disconnectDb();
    return res.json({
      message:
        "An email has been sent to your account. use it to reset your password",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router.handler();
