import { For } from 'solid-js';
import type { NavigationLink } from '../types';
import styles from './Header.module.css';

interface HeaderProps {
  siteName: string;
  links: NavigationLink[];
}

/**
 * Header component with site branding and navigation
 */
export function Header(props: HeaderProps) {
  return (
    <header class={styles.header}>
      <nav class={styles.nav} aria-label="Main navigation">
        <h1 class={styles.logo}>{props.siteName}</h1>
        <div class={styles.navLinks} role="list">
          <For each={props.links}>
            {(link) => (
              <a
                href={link.href}
                class={styles.navLink}
                role="listitem"
              >
                {link.label}
              </a>
            )}
          </For>
        </div>
      </nav>
    </header>
  );
}
