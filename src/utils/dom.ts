/**
 * DOM utility functions for element manipulation
 */

/**
 * Check if the browser supports the experimental Element.moveBefore API
 */
export function supportsMoveBefore(): boolean {
  return typeof Element !== 'undefined' && 'moveBefore' in (Element.prototype as any);
}

/**
 * Move an element before a reference element
 * Uses Element.moveBefore when available, falls back to insertBefore
 *
 * @param element - The element to move
 * @param reference - The reference element to insert before (null to append)
 * @param fallbackParent - Parent element for fallback when reference is null
 */
export function moveBefore(
  element: Element,
  reference: Element | null,
  fallbackParent?: Element | null
): void {
  if (supportsMoveBefore()) {
    // @ts-ignore - experimental API not yet in TypeScript DOM lib
    (element as any).moveBefore(reference ?? null);
  } else if (reference && reference.parentNode) {
    reference.parentNode.insertBefore(element, reference);
  } else if (fallbackParent) {
    fallbackParent.appendChild(element);
  }
}

/**
 * Lock body scroll (useful for modals/overlays)
 */
export function lockScroll(): void {
  document.documentElement.style.overflow = 'hidden';
}

/**
 * Unlock body scroll
 */
export function unlockScroll(): void {
  document.documentElement.style.overflow = '';
}

/**
 * Get the next sibling element (skipping text nodes)
 */
export function getNextSiblingElement(element: Element): Element | null {
  let sibling = element.nextSibling;
  while (sibling && sibling.nodeType !== 1) {
    sibling = sibling.nextSibling;
  }
  return sibling as Element | null;
}

/**
 * Check if an element is visible in the viewport
 */
export function isInViewport(element: Element): boolean {
  const rect = element.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}
