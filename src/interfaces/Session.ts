export default interface Session {
  accountID: string;
  sessionID: string;
  accessToken: string;
  accessExpiry: number;
  refreshToken: string;
  refreshExpiry: number;
}
