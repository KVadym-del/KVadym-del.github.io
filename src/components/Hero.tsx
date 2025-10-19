import type { HeroContent } from '../types';
import styles from './Hero.module.css';

interface HeroProps {
  content: HeroContent;
}

/**
 * Hero section component with main title and call-to-action buttons
 */
export function Hero(props: HeroProps) {
  return (
    <section class={styles.hero} aria-labelledby="hero-title">
      <div class={styles.heroContent}>
        <h1 id="hero-title" class={styles.heroTitle}>
          Hi, I'm <span class={styles.highlight}>{props.content.name}</span>
        </h1>
        <p class={styles.heroSubtitle}>{props.content.title}</p>
        <p class={styles.heroDescription}>{props.content.subtitle}</p>
        <div class={styles.heroButtons}>
          <a href="#projects" class={`${styles.btn} ${styles.btnPrimary}`}>
            View My Work
          </a>
          <a href="#about" class={`${styles.btn} ${styles.btnSecondary}`}>
            Learn More
          </a>
        </div>
      </div>
    </section>
  );
}
