export type Category = {
  _id: string;
  name: string;
  slug: string;
  createdAt?: string;
  updatedAt?: string;
};

export type Book = {
  _id?: string | number;                
  id?: string | number;
  title: string;                         
  author?: string;                        
  price?: number | string;               
  rating?: number;                      
  badge?: string;
  image?: string;
  coverImage?: string;
  slug?: string;                          
  subtitle?: string;                       
  description?: string;                 
  reviewsCount?: number;                
  tag?: string;                         
  category?: {                          
    _id?: string;
    name?: string;
    slug?: string;
  } | string;
  quantity?: number;                      
  originalPrice?: number | string;        
  highlights?: string[];                 
  specs?: Array<{ label?: string; value?: string }>;
  aboutAuthor?: { bio?: string; achievements?: string[] };
};

export type ApiMeta = {
  page?: number;
  limit?: number;
  total?: number;
  totalPage?: number;
};

export type ApiResponse<T> = {
  success: boolean;
  message: string;
  data: T;
  meta?: ApiMeta;
};
