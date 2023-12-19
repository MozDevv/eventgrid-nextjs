import React from "react";
import styles from "./footer.module.css";
import Image from "next/image";
import Link from "next/link";

function Footer() {
  return (
    <div className={styles.container}>
      <hr />
      <div className={styles.footer}>
        <div className={styles.left}>
          <div className={styles.imgContainer}>
            <Image
              className={styles.image}
              alt=""
              src="/6.jpg"
              height={35}
              width={35}
            />
            <span>Mozz.</span>
          </div>
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Iste
            consectetur, eligendi repellendus ipsam neque veritatis perspiciatis
            quibusdam rem molestiae consequuntur beatae maiores nemo esse
            accusamus! Eius atque error a labore?
          </p>
          <div className={styles.socials}>
            <Image src="/facebook.png" alt="Facebook" height={24} width={24} />
            <Image
              src="/instagram.png"
              alt="instagram"
              height={24}
              width={24}
            />
            <Image src="/tiktok.png" alt="tiktok" height={24} width={24} />
            <Image src="/youtube.png" alt="youtube" height={24} width={24} />
          </div>
        </div>

        <div className={styles.right}>
          <div className={styles.links}>
            <h4>Links</h4>
            <Link href="#">Homepage</Link>
            <Link href="#">Blog</Link>
            <Link href="#">About</Link>
            <Link href="#">Contact</Link>
          </div>
          <div className={styles.tags}>
            <h4>Tags</h4>
            <Link href="#">Style</Link>
            <Link href="#">Fashion</Link>
            <Link href="#">Tech</Link>
            <Link href="#">AI</Link>
          </div>
          <div className={styles.social}>
            <h4>Socials</h4>
            <Link href="#">Facebook</Link>
            <Link href="#">Instagram</Link>
            <Link href="#">TikTok</Link>
            <Link href="#">YouTube</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
