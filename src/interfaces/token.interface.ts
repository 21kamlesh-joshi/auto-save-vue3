export interface TokenInterface {
  type: "Bearer";
  access_token: string;
  refresh_token: string;
  expires_at: string | Date | number;
}
