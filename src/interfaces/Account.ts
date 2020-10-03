export default interface Account {
  id: string;
  name: string;
  abn: string;
  logo: boolean;
  authContact: string;
  phone: string;
  streetAddress: string;
  suburb: string;
  state: string;
  postcode: string;
  email: string;
  selectAll: boolean;
  statements: string[];
}
