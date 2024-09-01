export interface JobInterest {
    id: number;
    jobSeekerId: number;
    jobField: string;
    jobType: 'full-time' | 'part-time' | 'contract' | 'freelance';
    workSystem: 'remote' | 'in-office' | 'hybrid';
    locationPreference: string;
  }