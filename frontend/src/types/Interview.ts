export interface Interview {
    id: number;
    applicationId: number;
    interviewDate: Date;
    interviewMode: 'online' | 'in-person';
    interviewStatus: 'scheduled' | 'completed' | 'cancelled';
  }