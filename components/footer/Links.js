import Link from "next/link";
import Logo from "../../public/logo.png";
import styles from "./styles.module.scss";
import Image from "next/image";

export default function Links() {
    return (
        <div className={styles.footer__links}>
            {links.map((link, i) => (
                <ul key={i}>
                    {i === 0 ? <Image src={Logo} alt="Not Found" /> : <b>{link.heading}</b>}
                    {link.links.map((link, i) => (
                        <li key={i}>
                            <Link href={link.link}>{link.name}</Link>
                        </li>
                    ))}
                </ul>
            ))}
        </div>
    );
}

const links = [
    {
        heading: "SHOPPAY",
        links: [
            {
                name: "About us",
                link: "",
            },
            {
                name: "Contact us",
                link: "",
            },
            {
                name: "Social Responsibility",
                link: "",
            },
            {
                name: "",
                link: "",
            },
        ],
    },
    {
        heading: "HELP & SUPPORT",
        links: [
            {
                name: "Shipping Info",
                link: "",
            },
            {
                name: "Returns",
                link: "",
            },
            {
                name: "How To Order",
                link: "",
            },
            {
                name: "How To Track",
                link: "",
            },
            {
                name: "Size Guide",
                link: "",
            },
        ],
    },
    {
        heading: "Customer service",
        links: [
            {
                name: "Customer service",
                link: "",
            },
            {
                name: "Terms and Conditions",
                link: "",
            },
            {
                name: "Consumers (Transactions)",
                link: "",
            },
            {
                name: "Take our feedback survey",
                link: "",
            },
        ],
    },
];
