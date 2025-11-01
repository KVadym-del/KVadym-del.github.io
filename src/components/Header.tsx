import { For } from "solid-js";
import { A } from "@solidjs/router";
import type { NavigationLink } from "../types";
import styles from "./Header.module.css";

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
        <A href="/" class={styles.logo}>
          {props.siteName}
        </A>
        <div class={styles.navLinks} role="list">
          <For each={props.links}>
            {(link) => (
              <>
                {link.href.startsWith("#") ? (
                  <a href={link.href} class={styles.navLink} role="listitem">
                    {link.label}
                  </a>
                ) : (
                  <A href={link.href} class={styles.navLink} role="listitem">
                    {link.label}
                  </A>
                )}
              </>
            )}
          </For>
        </div>
      </nav>
    </header>
  );
}
