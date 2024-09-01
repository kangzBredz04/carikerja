import { Employer } from "./Employer";

export interface Job {
    id: number;
    employer: Employer;
    jobField: string;
    jobTitle: string;
    jobType: 'full-time' | 'part-time' | 'internship' | 'contract' | 'freelance';
    workSystem: 'in-office' | 'remote' | 'hybrid';
    location: string;
    jobDescription: string;
    minSalary: number;
    maxSalary: number;
    minAge: number;
    maxAge: number;
    genderPreference: 'male' | 'female' | 'no preference';
    requiredSkills: string;
    requiredEducation: string;
    requiredExperience: string;
  }