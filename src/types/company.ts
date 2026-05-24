export interface Company {
  _id: string;
  name: string;
  logo?: string;
  description: string;
  overallRating: number;
  totalReviews: number;
}

export interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface CompanyResponse {
  companies: Company[];
  pagination: Pagination;
}