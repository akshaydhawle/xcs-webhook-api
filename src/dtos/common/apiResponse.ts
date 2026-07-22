export interface ApiResponseDTO<T = unknown> {
  message?: string;
  data?: T;
  status?: 'success' | 'error';
  metadata?: object;
}
