export default interface Response<T> {
  success: boolean;
  statusCode: number;
  messages: string[];
  data: T;
}