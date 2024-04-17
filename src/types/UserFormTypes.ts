export type Education = {
  schoolName: string;
  degree: string;
  description?: string;
  startDate: Date;
  endDate?: Date | null;
};
export type UserDetails = {
  name: string;
  email: string;
  age?: number;
  educations: Education[];
};
