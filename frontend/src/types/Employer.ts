export interface Employer {
    id: number;
    userId: number;
    bannerImage: string;
    logoImage: string;
    companyName: string;
    slogan: string;
    address: string;
    companySize: 'small' | 'medium' | 'large';
    industry: string;
    websiteLink: string;
    instagramLink: string;
    facebookLink: string;
    linkedinLink: string;
    companyDescription: string;
  }