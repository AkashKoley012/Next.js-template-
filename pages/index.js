import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.scss";
import Header from "@/components/header";
import Footer from "@/components/footer";
import axios from "axios";

const inter = Inter({ subsets: ["latin"] });

export default function Home({ country }) {
    return (
        <div className={styles.red}>
            <Header country={country} />
            <Footer country={country} />
        </div>
    );
}

export async function getServerSideProps() {
    let data = await axios
        .get("https://api.ipregistry.co/?key=26o4mizny0syt088")
        .then((res) => {
            return res.data.location.country;
        })
        .catch((err) => {
            console.log(err.message);
        });
    return {
        props: {
            country: { name: data.name, flag: data.flag.emojitwo },
        },
    };
}
