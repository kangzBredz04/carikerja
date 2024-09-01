export interface JobSeeker {
    id: number;
    userId: number;
    name: string;
    birthDate: Date;
    phoneNumber: string;
    email: string;
    location: string;
    age: number;
    gender: 'male' | 'female';
    aboutMe: string;
    hasWorkExperience: boolean;
    resume: string;
    portfolioLink: string;
    githubLink: string;
    willingToWorkRemotely: boolean;
  }