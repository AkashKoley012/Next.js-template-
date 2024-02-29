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
import jwt from "jsonwebtoken";
import axios from "axios";
import { Router } from "next/router";
export default function Reset({ token }) {
  const [password, setPassword] = useState("");
  const [conf_password, setConf_Password] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState("");
  const passwordValidation = Yup.object({
    password: Yup.string()
      .required(
        "Enter a combination of at least six numbers,letters and punctuation marks(such as ! and &)."
      )
      .min(6, "Password must be atleast 6 characters.")
      .max(36, "Password can't be more than 36 characters"),
    conf_password: Yup.string()
      .required("Confirm your password.")
      .oneOf([Yup.ref("password")], "Passwords must match."),
  });
  const resetHandler = async () => {
    try {
      setLoading(true);
      const { data } = await axios.put("/api/auth/reset", {
        user_id,
        password,
      });
      let options = {
        redirect: false,
        email: data.email,
        password: password,
      };
      await signIn("credentials", options);
      window.location.reload(true);
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
              Reset your password <Link href="/">Login instead</Link>
            </span>
          </div>
          <Formik
            enableReinitialize
            initialValues={{ password, conf_password }}
            validationSchema={passwordValidation}
            onSubmit={() => {
              resetHandler();
            }}
          >
            {(form) => (
              <Form>
                <LoginInput
                  type="password"
                  name="password"
                  icon="password"
                  placeholder="Password"
                  onChange={(e) => setPassword(e.target.value)}
                />
                <LoginInput
                  type="password"
                  name="conf_password"
                  icon="password"
                  placeholder="Confirm Password"
                  onChange={(e) => setConf_Password(e.target.value)}
                />
                <CircleIconBtn type="submit" text="Submit" />
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

export async function getServerSideProps(context) {
  const { query, req } = context;
  const session = await getSession({ req });
  if (session) {
    return {
      redirect: {
        destination: "/",
      },
    };
  }
  const token = query.token;
  const user_id = jwt.verify(token, process.env.RESET_TOKEN_SECRET);
  return {
    props: {
      user_id: user_id.id,
    },
  };
}
