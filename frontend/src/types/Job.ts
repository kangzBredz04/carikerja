

export interface Job {
    id: number;
    employer: {
      id: number
    };
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
    createdAt:Date;
    applicants: number;
  }