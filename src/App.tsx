import "./App.css";

function App() {
  return (
    <div class="app">
      <header class="header">
        <nav class="nav">
          <h1 class="logo">BobTheDestroyer</h1>
          <div class="nav-links">
            <a href="#about">About</a>
            <a href="#projects">Projects</a>
          </div>
        </nav>
      </header>

      <main class="main">
        <section class="hero">
          <div class="hero-content">
            <h1 class="hero-title">
              Hi, I'm <span class="highlight">Your Name</span>
            </h1>
            <p class="hero-subtitle">Your Professional Title Here</p>
            <p class="hero-description">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
            <div class="hero-buttons">
              <a href="#projects" class="btn btn-primary">
                View My Work
              </a>
              <a href="#about" class="btn btn-secondary">
                Learn More
              </a>
            </div>
          </div>
        </section>

        <section id="about" class="section">
          <h2 class="section-title">About Me</h2>
          <div class="about-content">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut enim
              ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
              aliquip ex ea commodo consequat.
            </p>
          </div>
        </section>

        <section id="projects" class="section">
          <h2 class="section-title">Featured Projects</h2>
          <div class="projects-grid">
            <div class="project-card">
              <div class="project-header">
                <h3>Project Title One</h3>
                <span class="project-status">In Progress</span>
              </div>
              <p class="project-description">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
              <div class="project-tags">
                <span class="tag">Tag 1</span>
                <span class="tag">Tag 2</span>
                <span class="tag">Tag 3</span>
              </div>
            </div>

            <div class="project-card">
              <div class="project-header">
                <h3>Project Title Two</h3>
                <span class="project-status completed">Completed</span>
              </div>
              <p class="project-description">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
              <div class="project-tags">
                <span class="tag">Tag 1</span>
                <span class="tag">Tag 2</span>
                <span class="tag">Tag 3</span>
              </div>
            </div>

            <div class="project-card">
              <div class="project-header">
                <h3>Project Title Three</h3>
                <span class="project-status">Planning</span>
              </div>
              <p class="project-description">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
              <div class="project-tags">
                <span class="tag">Tag 1</span>
                <span class="tag">Tag 2</span>
                <span class="tag">Tag 3</span>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer class="footer">
        <p>&copy; 2025 Your Name. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;
