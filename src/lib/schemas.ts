import { z } from "zod";

const iconLink = z.object({
  name: z.string(),
  href: z.string().url(),
  icon: z.string(),
});
export type IconLink = z.infer<typeof iconLink>;

const project = z.object({
  name: z.string(),
  description: z.string(),
  href: z.string().url().optional(),
  image: z.string().optional(),
  tags: z.array(z.string()),
  links: z.array(iconLink),
});
export const projectSchema = z.object({ projects: z.array(project) });
export type Project = z.infer<typeof project>;

const experiencePosition = z.object({
  title: z.string(),
  start: z.string(),
  end: z.string().optional(),
  description: z.array(z.string()).optional(),
  links: z.array(iconLink).optional(),
});
export type ExperiencePosition = z.infer<typeof experiencePosition>;

const experience = z.object({
  name: z.string(),
  href: z.string(),
  logo: z.string(),
  positions: z.array(experiencePosition).min(1),
});
export type Experience = z.infer<typeof experience>;

export const careerSchema = z.object({ career: z.array(experience) });
export const educationSchema = z.object({ education: z.array(experience) });
export const socialSchema = z.object({ socials: z.array(iconLink) });

const skillCategory = z.object({
  name: z.string(),
  skills: z.array(z.string()),
});
export const skillsSchema = z.object({ categories: z.array(skillCategory) });
export type SkillCategory = z.infer<typeof skillCategory>;

const certification = z.object({
  title: z.string(),
  issuer: z.string(),
  href: z.string().optional(),
});
export const certificationsSchema = z.object({
  certifications: z.array(certification),
});
export type Certification = z.infer<typeof certification>;
