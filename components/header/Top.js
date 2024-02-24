import Image from "next/image";
import Link from "next/link";
import styles from "./styles.module.scss";
import Profile from "../../public/profile.jpg";
import { MdSecurity } from "react-icons/md";
import { BsSuitHeart } from "react-icons/bs";
import { RiAccountPinCircleLine, RiArrowDropDownFill } from "react-icons/ri";
import { useState } from "react";
import UserMenu from "./UserMenu";

export default function Top({ country }) {
    console.log(country);
    const [loggedIn, setLoggedIn] = useState(true);
    const [visible, setVisible] = useState(false);
    return (
        <div className={styles.top}>
            <div className={styles.top__container}>
                <div></div>
                <ul className={styles.top__list}>
                    <li className={styles.li}>
                        <img src={country.flag} alt="Not Found" />
                        <span>{country.name} / rupees</span>
                    </li>
                    <li className={styles.li}>
                        <MdSecurity />
                        <span>Buyer Protection</span>
                    </li>
                    <li className={styles.li}>
                        <span>Custom Service</span>
                    </li>
                    <li className={styles.li}>
                        <span>Help</span>
                    </li>
                    <li className={styles.li}>
                        <BsSuitHeart />
                        <Link href="/profile/whishlist">
                            <span>Whishlist</span>
                        </Link>
                    </li>
                    <li className={styles.li} onMouseOver={() => setVisible(true)} onMouseLeave={() => setVisible(false)}>
                        {loggedIn ? (
                            <div className={styles.flex}>
                                <Image src={Profile} alt="Not Found" />
                                <span>iCoderAkash</span>
                                <RiArrowDropDownFill />
                            </div>
                        ) : (
                            <div className={styles.flex}>
                                <RiAccountPinCircleLine />
                                <span>Account</span>
                                <RiArrowDropDownFill />
                            </div>
                        )}
                        {visible && <UserMenu loggedIn={loggedIn} img={Profile} />}
                    </li>
                </ul>
            </div>
        </div>
    );
}
