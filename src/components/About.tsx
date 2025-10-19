import type { AboutContent } from '../types';
import styles from './About.module.css';

interface AboutProps {
  content: AboutContent;
}

/**
 * About section component displaying personal or professional information
 */
export function About(props: AboutProps) {
  return (
    <section id="about" class={styles.section} aria-labelledby="about-title">
      <h2 id="about-title" class={styles.sectionTitle}>
        About Me
      </h2>
      <div class={styles.aboutContent}>
        <p class={styles.description}>{props.content.description}</p>
      </div>
    </section>
  );
}
