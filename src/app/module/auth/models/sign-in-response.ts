export interface SignInResponse {
  id: string;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  city: string;
  mobile: string;
  accessToken: string;
  companyId: string;
  companyName: string;
  tokenType: string;
  authorities: any[];
}
