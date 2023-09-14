
export class ApiCallService {
  /**
   * Returns base api url
   */
  public baseUrl(): string {
    return import.meta.env.VITE_API_BASE_URL;
  }

  /**
   * Returns url build from base url
   * @param url
   */
  public url(url: string): string {
    return `${this.baseUrl()}/${url}`;
  }

  /**
   * Returns the api version
   */
  public apiVersion(): string {
    return import.meta.env.VITE_API_VERSION;
  }

  /**
   * Returns url build for api
   * @param url
   */
  public apiUrl(url: string): string {
    return this.url(`${this.apiVersion()}/${url}`);
  }

}
