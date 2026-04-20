import { useQuery } from "@tanstack/react-query";
import resumeData from "../data/resume.json";

export interface ResumeData {
  name: string;
  title: string;
  tagline: string;
  email: string;
  website: string;
  social: {
    linkedin: string;
    github: string;
  };
  profile: string;
  education: Array<{
    degree: string;
    institution: string;
    location: string;
    year: string;
    details: string;
  }>;
  publications: Array<{
    id: string;
    authors: string;
    title: string;
    venue: string;
    year: number;
    status: string;
    type: string;
    link: string;
  }>;
  teaching: Array<{
    id: string;
    course: string;
    role: string;
    institution: string;
    term: string;
    description: string;
  }>;
  experience: Array<{
    id: string;
    role: string;
    organization: string;
    location: string;
    startDate: string;
    endDate: string;
    details: string[];
  }>;
  skills: {
    programming: string[];
    ml_ai: string[];
    systems: string[];
    cloud: string[];
    tools: string[];
    languages: string[];
  };
  blog?: Array<{
    id: string;
    title: string;
    date: string;
    summary: string;
    link: string;
  }>;
  courses: Array<{
    id: string;
    name: string;
    institution: string;
    year: string;
  }>;
  awards: Array<{
    id: string;
    name: string;
    organization: string;
    year: string;
    amount?: string;
    description?: string;
  }>;
  references: Array<{
    name: string;
    title: string;
    organization: string;
    email: string;
  }>;
}

export function useResume() {
  return useQuery<ResumeData>({
    queryKey: ["resume"],
    queryFn: async () => resumeData as ResumeData,
  });
}
