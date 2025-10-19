import { Show, For } from 'solid-js';
import type { Project } from '../types';
import styles from './ProjectCard.module.css';

interface ProjectCardProps {
  project: Project;
  onClick?: () => void;
  expanded?: boolean;
}

/**
 * ProjectCard component displaying project information
 * Can be expanded to show detailed information
 */
export function ProjectCard(props: ProjectCardProps) {
  const getStatusClass = () => {
    switch (props.project.status) {
      case 'completed':
        return styles.statusCompleted;
      case 'in-progress':
        return styles.statusInProgress;
      case 'planning':
        return styles.statusPlanning;
      default:
        return '';
    }
  };

  const getStatusLabel = () => {
    switch (props.project.status) {
      case 'completed':
        return 'Completed';
      case 'in-progress':
        return 'In Progress';
      case 'planning':
        return 'Planning';
      default:
        return props.project.status;
    }
  };

  const handleClick = () => {
    if (!props.expanded && props.onClick) {
      props.onClick();
    }
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if ((e.key === 'Enter' || e.key === ' ') && !props.expanded && props.onClick) {
      e.preventDefault();
      props.onClick();
    }
  };

  return (
    <div
      class={`${styles.projectCard} ${props.expanded ? styles.projectCardExpanded : ''}`}
      onClick={handleClick}
      role="button"
      tabIndex={props.expanded ? -1 : 0}
      onKeyDown={handleKeyDown}
      aria-expanded={props.expanded}
      aria-label={`${props.project.title} - Click to view details`}
    >
      <div class={styles.projectHeader}>
        <h3 class={styles.projectTitle}>{props.project.title}</h3>
        <span class={`${styles.projectStatus} ${getStatusClass()}`}>
          {getStatusLabel()}
        </span>
      </div>

      <p class={styles.projectDescription}>{props.project.description}</p>

      <Show when={props.expanded && props.project.details}>
        <div class={styles.projectDetails}>
          <Show when={props.project.details?.description}>
            <div class={styles.detailsSection}>
              <h4 class={styles.detailsHeading}>Full Description</h4>
              <p class={styles.detailsText}>{props.project.details?.description}</p>
            </div>
          </Show>

          <Show when={props.project.details?.features && props.project.details.features.length > 0}>
            <For each={props.project.details?.features}>
              {(feature) => (
                <div class={styles.detailsSection}>
                  <h4 class={styles.detailsHeading}>{feature.title}</h4>
                  <ul class={styles.featureList}>
                    <For each={feature.items}>
                      {(item) => <li class={styles.featureItem}>{item}</li>}
                    </For>
                  </ul>
                </div>
              )}
            </For>
          </Show>

          <Show when={props.project.details?.links && props.project.details.links.length > 0}>
            <div class={styles.projectLinks}>
              <For each={props.project.details?.links}>
                {(link) => (
                  <a
                    href={link.url}
                    class={styles.projectLink}
                    onClick={(e) => e.stopPropagation()}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {link.label} →
                  </a>
                )}
              </For>
            </div>
          </Show>
        </div>
      </Show>

      <div class={styles.projectTags}>
        <For each={props.project.tags}>
          {(tag) => <span class={styles.tag}>{tag}</span>}
        </For>
      </div>
    </div>
  );
}
