export default interface AxiosError<T> {
  config: {
    url: string;
    method: string;
    data?: string;
  };
  isAxiosError: boolean;
  request: XMLHttpRequest;
  response: {
    config: {
      url: string;
      method: string;
      data?: string;
      status: number;
    };
    data: {
      data?: T;
      messages: string[];
      statusCode: number;
      success: boolean;
    };
    request: XMLHttpRequest;
    status: number;
    statusText: string;
  };
}
