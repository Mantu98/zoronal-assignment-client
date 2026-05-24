export interface Company {
  _id: string;
  name: string;
  logo?: string;
  location: string;
  city: string;
  foundedOn?: string;
  overallRating: number;
  totalReviews: number;
  createdAt?: string;
  updatedAt?: string;
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