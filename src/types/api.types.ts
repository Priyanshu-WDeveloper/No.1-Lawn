export type GetAdminsParams = {
  page?: number;
  limit?: number;
  search?: string;
  status?: string;
  sort?: 'a_z' | 'z_a' | 'newest' | 'oldest';
};
