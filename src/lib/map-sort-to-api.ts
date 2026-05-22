import type { ListQueryParams } from '@/types/common.types';

export function mapSortToApi(sortValue: string): ListQueryParams['sort'] {
  if (sortValue.endsWith('_desc')) {
    return sortValue.startsWith('createdAt') || sortValue.startsWith('updatedAt')
      ? 'oldest'
      : 'z_a';
  }
  if (sortValue === 'createdAt' || sortValue === 'updatedAt') return 'newest';
  return 'a_z';
}
