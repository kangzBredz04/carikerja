export interface Application {
    id: number;
    jobId: number;
    jobSeekerId: number;
    status: 'applied' | 'viewed' | 'accepted' | 'rejected';
    appliedAt: Date;
  }