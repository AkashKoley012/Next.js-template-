import CircleIconBtn from "@/components/button/circleIconBtn";
import Footer from "@/components/footer";
import Header from "@/components/header";
import LoginInput from "@/components/inputs/logininput";
import styles from "@/styles/forget.module.scss";
import { Form, Formik } from "formik";
import Link from "next/link";
import * as Yup from "yup";
import { useState } from "react";
import { BiLeftArrowAlt } from "react-icons/bi";
import DotLoaderSpinner from "@/components/loaders/dotLoader";
export default function Forget() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState("");
  const emailValidation = Yup.object({
    email: Yup.string()
      .required(
        "You'll need this when you log in and if you ever need to reset your password."
      )
      .email("Enter a valid email address."),
  });
  const forgetHandler = async () => {
    try {
      setLoading(true);
      const { data } = await axios.post("/api/auth/forgot", {
        email,
      });
      setError("");
      setSuccess(data.message);
      setLoading(false);
      setEmail("");
    } catch (error) {
      setLoading(false);
      setSuccess("");
      setError(error.response.data.message);
    }
  };
  return (
    <>
      {loading && <DotLoaderSpinner loading={loading} />}
      <Header country="India" />
      <div className={styles.forget}>
        <div>
          <div className={styles.forget__header}>
            <div className={styles.back__svg}>
              <BiLeftArrowAlt />
            </div>
            <span>
              Forget your password <Link href="/">Login instead</Link>
            </span>
          </div>
          <Formik
            enableReinitialize
            initialValues={{ email }}
            validationSchema={emailValidation}
            onSubmit={() => {
              forgetHandler();
            }}
          >
            {(form) => (
              <Form>
                <LoginInput
                  type="text"
                  name="email"
                  icon="email"
                  placeholder="Email Address"
                  onChange={(e) => setEmail(e.target.value)}
                />
                <CircleIconBtn type="submit" text="Send link" />
                <div style={{ marginTop: "10px" }}>
                  {error && <span className={styles.error}>{error}</span>}
                  {success && <span className={styles.success}>{success}</span>}
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
      <Footer country="India" />
    </>
  );
}
