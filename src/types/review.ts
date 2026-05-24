export interface Review {
  _id: string;
  companyId: string;
  reviewerName: string;
  rating: number;
  title: string;
  comment: string;
  pros: string[];
  cons: string[];
  createdAt?: string;
}

export interface CreateReviewPayload {
  companyId: string;
  reviewerName: string;
  rating: number;
  title: string;
  comment: string;
  pros: string[];
  cons: string[];
}