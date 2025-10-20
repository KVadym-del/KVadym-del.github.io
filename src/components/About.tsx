import type { AboutContent } from "../types";
import styles from "./About.module.css";
import sectionStyles from "../styles/section.module.css";

interface AboutProps {
  content: AboutContent;
}

/**
 * About section component displaying personal or professional information
 */
export function About(props: AboutProps) {
  return (
    <section
      id="about"
      class={sectionStyles.section}
      aria-labelledby="about-title"
    >
      <h2 id="about-title" class={sectionStyles.sectionTitle}>
        About Me
      </h2>
      <div class={styles.aboutContent}>
        <p class={styles.description}>{props.content.description}</p>
      </div>
    </section>
  );
}
