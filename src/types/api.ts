export interface ApiResponse<T> {
  data: T
  message: string
  success: boolean
}

export interface ApiError {
  message: string
  code: string
  statusCode: number
}

export interface UploadImageResponse {
  analysisId: string
  status: 'processing' | 'completed'
  message: string
}

export interface PaginatedResponse<T> {
  success: boolean
  data: T[]
  total: number
  page: number
  limit: number
  hasNext: boolean
}
