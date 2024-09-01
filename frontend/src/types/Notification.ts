export interface Notification {
    id: number;
    jobSeekerId: number;
    employerId: number;
    message: string;
    status: 'unread' | 'read';
  }