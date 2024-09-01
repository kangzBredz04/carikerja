export interface User {
    id: number;
    email: string;
    password: string;
    role: 'JOB_SEEKER' | 'EMPLOYER' | 'ADMIN';
  }
  