export interface User {
  _id: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
  isdCode?: string; // Optional property
  mobileNumber?: string; // Optional property
  mobileVerificationToken?: string | 1;
  emailVerificationToken?: string | 1;
  gender?: 'male' | 'female' | 'other'; // Enum type
  address?: string | null; // Optional property that can be null
  profile_image?: string | null; // Optional property that can be null
  active?: boolean;
  isDeleted?: boolean;
  resetPasswordToken?: string | null; // Optional property that can be null
  resetPasswordExpires?: Date | null; // Optional property that can be null
}

export interface Registration {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface Login {
  email: string;
  password: string;
}
