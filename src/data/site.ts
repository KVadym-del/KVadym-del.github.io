import type { SiteMetadata, HeroContent, AboutContent, NavigationLink } from '../types';

/**
 * Site-wide configuration and metadata
 */
export const siteMetadata: SiteMetadata = {
  name: 'BobTheDestroyer',
  title: 'BobTheDestroyer - Portfolio',
  description: 'Personal portfolio showcasing my projects and skills',
  author: 'Your Name',
  url: 'https://kvadym-del.github.io',
  image: '/og-image.png',
};

/**
 * Hero section content
 */
export const heroContent: HeroContent = {
  name: 'Your Name',
  title: 'Your Professional Title Here',
  subtitle: 'Building amazing things with modern web technologies',
};

/**
 * About section content
 */
export const aboutContent: AboutContent = {
  description:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
};

/**
 * Navigation links
 */
export const navigationLinks: NavigationLink[] = [
  {
    label: 'About',
    href: '#about',
  },
  {
    label: 'Projects',
    href: '#projects',
  },
];
