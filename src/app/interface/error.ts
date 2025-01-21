export type TGenericErrorResponse = {
  success: boolean;
  message: string;
  statusCode: number;
  error: string;
  stack: string | undefined | null;
};
