import { useSession, signIn, signOut } from "next-auth/react";
import styles from "@/styles/Home.module.scss";
import Header from "@/components/header";
import Footer from "@/components/footer";
import axios from "axios";

export default function Home({ country }) {
    const { data: session } = useSession();
    return (
        <div className={styles.red}>
            <Header country={country} />
            <Footer country={country} />
        </div>
    );
}

export async function getServerSideProps() {
    // let data = await axios
    //     .get("https://api.ipregistry.co/?key=26o4mizny0syt088")
    //     .then((res) => {
    //         return res.data.location.country;
    //     })
    //     .catch((err) => {
    //         console.log(err.message);
    //     });
    return {
        props: {
            // country: { name: data.name, flag: data.flag.emojitwo },
            country: { name: "India", flag: "https://cdn.ipregistry.co/flags/emojitwo/in.svg" },
        },
    };
}
