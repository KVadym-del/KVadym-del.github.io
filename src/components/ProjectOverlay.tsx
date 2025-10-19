import { Show, type JSX } from 'solid-js';
import styles from './ProjectOverlay.module.css';

interface ProjectOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  children?: JSX.Element;
}

/**
 * ProjectOverlay component for displaying expanded project details
 * Provides a full-screen modal overlay with close functionality
 */
export function ProjectOverlay(props: ProjectOverlayProps) {
  const handleOverlayClick = (e: MouseEvent) => {
    if (e.target === e.currentTarget) {
      props.onClose();
    }
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      e.preventDefault();
      props.onClose();
    }
  };

  return (
    <Show when={props.isOpen}>
      <div
        class={`${styles.overlay} ${props.isOpen ? styles.overlayOpen : ''}`}
        onClick={handleOverlayClick}
        onKeyDown={handleKeyDown}
        role="dialog"
        aria-modal="true"
        aria-label="Project details"
      >
        <button
          class={styles.closeButton}
          type="button"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            props.onClose();
          }}
          onMouseDown={(e) => e.stopPropagation()}
          aria-label="Close project details"
        >
          <span aria-hidden="true">✕</span>
        </button>
        <div class={styles.overlayInner}>
          <div class={styles.overlayContent}>
            {props.children}
          </div>
        </div>
      </div>
    </Show>
  );
}
