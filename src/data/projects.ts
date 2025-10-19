import type { Project } from '../types';

/**
 * Portfolio projects data
 * This file contains all project information displayed on the portfolio
 */
export const projects: Project[] = [
  {
    id: 'project-1',
    title: 'Project Title One',
    status: 'in-progress',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.',
    tags: ['React', 'TypeScript', 'Node.js'],
    details: {
      description:
        'This is a comprehensive project that showcases advanced web development techniques. Built with modern frameworks and best practices, it demonstrates full-stack capabilities including responsive design, state management, API integration, and deployment optimization.',
      features: [
        {
          title: 'Key Features',
          items: [
            'Responsive and mobile-first design',
            'Real-time data synchronization',
            'Advanced user authentication',
            'RESTful API integration',
            'Optimized performance and SEO',
          ],
        },
      ],
      links: [
        {
          label: 'View Live Demo',
          url: '#',
        },
        {
          label: 'GitHub Repository',
          url: '#',
        },
      ],
    },
  },
  {
    id: 'project-2',
    title: 'Project Title Two',
    status: 'completed',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.',
    tags: ['Vue.js', 'Tailwind', 'Firebase'],
    details: {
      description:
        'Modern single-page application utilizing Vue.js 3 with Composition API and Tailwind CSS for rapid UI development. Integrated with Firebase for real-time data and authentication, this project showcases contemporary frontend development practices.',
      features: [
        {
          title: 'Features & Technologies',
          items: [
            'Vue 3 Composition API with TypeScript',
            'Tailwind CSS for utility-first styling',
            'Firebase Authentication and Firestore',
            'Progressive Web App (PWA) capabilities',
            'Automated deployment with CI/CD',
          ],
        },
        {
          title: 'Technical Highlights',
          items: [
            'PostgreSQL database with complex queries',
            'JWT-based authentication system',
            'RESTful API with Django REST Framework',
            'Automated testing with pytest',
            'Docker containerization for deployment',
          ],
        },
      ],
      links: [
        {
          label: 'Live Application',
          url: '#',
        },
        {
          label: 'Source Code',
          url: '#',
        },
      ],
    },
  },
  {
    id: 'project-3',
    title: 'Project Title Three',
    status: 'planning',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.',
    tags: ['Python', 'Django', 'PostgreSQL'],
  },
];
