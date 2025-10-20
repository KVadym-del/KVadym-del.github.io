import { For } from "solid-js";
import type { Project } from "../types";
import { ProjectCard } from "./ProjectCard";
import styles from "./Projects.module.css";
import sectionStyles from "../styles/section.module.css";

interface ProjectsProps {
  projects: Project[];
  onProjectClick?: (project: Project) => void;
  expandedProjectId?: string;
}

/**
 * Projects section component displaying a grid of project cards
 */
export function Projects(props: ProjectsProps) {
  return (
    <section
      id="projects"
      class={sectionStyles.section}
      aria-labelledby="projects-title"
    >
      <h2 id="projects-title" class={sectionStyles.sectionTitle}>
        Featured Projects
      </h2>
      <div class={styles.projectsGrid}>
        <For each={props.projects}>
          {(project) => (
            <ProjectCard
              project={project}
              onClick={() => props.onProjectClick?.(project)}
              expanded={props.expandedProjectId === project.id}
            />
          )}
        </For>
      </div>
    </section>
  );
}
