import { createSignal, onCleanup, onMount, Show } from "solid-js";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { About } from "./components/About";
import { Projects } from "./components/Projects";
import { Footer } from "./components/Footer";
import { ProjectOverlay } from "./components/ProjectOverlay";
import { ProjectCard } from "./components/ProjectCard";
import {
  siteMetadata,
  heroContent,
  aboutContent,
  navigationLinks,
} from "./data/site";
import { projects } from "./data/projects";
import type { Project } from "./types";
import { lockScroll, unlockScroll } from "./utils/dom";
import "./styles/globals.css";

/**
 * Main App component
 * Orchestrates the portfolio layout and manages project overlay state
 */
function App() {
  const [expandedProject, setExpandedProject] = createSignal<Project | null>(
    null,
  );
  const [isOverlayOpen, setIsOverlayOpen] = createSignal(false);

  /**
   * Open the overlay for a specific project
   */
  const openProjectOverlay = (project: Project) => {
    if (!project.details) return;

    setExpandedProject(project);
    setIsOverlayOpen(true);
    lockScroll();
  };

  /**
   * Close the project overlay
   */
  const closeProjectOverlay = () => {
    setExpandedProject(null);
    setIsOverlayOpen(false);
    unlockScroll();
  };

  /**
   * Handle keyboard events for closing overlay
   */
  onMount(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOverlayOpen()) {
        e.preventDefault();
        closeProjectOverlay();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    onCleanup(() => {
      window.removeEventListener("keydown", handleKeyDown);
      unlockScroll();
    });
  });

  return (
    <>
      <Header siteName={siteMetadata.name} links={navigationLinks} />

      <main
        style={{
          flex: "1",
          width: "100%",
          position: "relative",
          "z-index": "1",
        }}
      >
        <div
          style={{
            "max-width": "1400px",
            margin: "0 auto",
            padding: "clamp(2rem, 5vw, 4rem) clamp(1rem, 3vw, 2rem)",
          }}
        >
          <Hero content={heroContent} />
          <About content={aboutContent} />
          <Projects
            projects={projects}
            onProjectClick={openProjectOverlay}
            expandedProjectId={undefined}
          />
        </div>
      </main>

      <Footer metadata={siteMetadata} />

      <ProjectOverlay isOpen={isOverlayOpen()} onClose={closeProjectOverlay}>
        <Show when={expandedProject()}>
          {(project) => <ProjectCard project={project()} expanded={true} />}
        </Show>
      </ProjectOverlay>
    </>
  );
}

export default App;
