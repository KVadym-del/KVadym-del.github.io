/**
 * DOM utility functions for element manipulation
 */

/**
 * Lock body scroll (useful for modals/overlays)
 */
export function lockScroll(): void {
  document.documentElement.style.overflow = "hidden";
}

/**
 * Unlock body scroll
 */
export function unlockScroll(): void {
  document.documentElement.style.overflow = "";
}
