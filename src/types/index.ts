/**
 * Type definitions for the portfolio application
 */

export type ProjectStatus = 'planning' | 'in-progress' | 'completed';

export interface ProjectFeature {
  title: string;
  items: string[];
}

export interface ProjectLink {
  label: string;
  url: string;
}

export interface ProjectDetails {
  description: string;
  features?: ProjectFeature[];
  links?: ProjectLink[];
}

export interface Project {
  id: string;
  title: string;
  status: ProjectStatus;
  description: string;
  tags: string[];
  details?: ProjectDetails;
}

export interface NavigationLink {
  label: string;
  href: string;
}

export interface SiteMetadata {
  name: string;
  title: string;
  description: string;
  author: string;
  url: string;
  image?: string;
}

export interface HeroContent {
  name: string;
  title: string;
  subtitle: string;
}

export interface AboutContent {
  description: string;
}
