export interface JobAd {
  id: number;
  title: string;
  description: string;
  skills: string[];
  status: JobAdStatus;
}

export type JobAdStatus = 'draft' | 'published' | 'archived';
