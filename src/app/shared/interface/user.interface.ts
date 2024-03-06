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

export interface Profile {
  firstName: string;
  lastName: string;
  email?: string;
  mobileNumber?: string;
  gender: string;
  billingAddress: Address;
  shippingAddress: Address;
}

interface Address {
  address: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
}
