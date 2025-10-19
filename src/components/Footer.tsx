import type { SiteMetadata } from '../types';
import styles from './Footer.module.css';

interface FooterProps {
  metadata: SiteMetadata;
}

/**
 * Footer component with copyright information
 */
export function Footer(props: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer class={styles.footer}>
      <p class={styles.copyright}>
        &copy; {currentYear} {props.metadata.author}. All rights reserved.
      </p>
    </footer>
  );
}
