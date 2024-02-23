import Image from "next/image";
import styles from "./styles.module.scss";
import Visa from "../../public/images/payment/visa.webp";
import MasterCard from "../../public/images/payment/mastercard.webp";
import Paypal from "../../public/images/payment/paypal.webp";

export default function Payment() {
    return (
        <div className={styles.footer__payment}>
            <h3>WE ACCPET</h3>
            <div className={styles.footer__flexwrap}>
                <Image src={Visa} alt="Not Found" />
                <Image src={MasterCard} alt="Not Found" />
                <Image src={Paypal} alt="Not Found" />
            </div>
        </div>
    );
}
