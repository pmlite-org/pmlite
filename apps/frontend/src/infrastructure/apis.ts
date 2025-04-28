import { createApiClient } from '@pmlite/shared/dist/api-types/apis';

const apiClient = createApiClient(process.env.NEXT_PUBLIC_API_URL || '');

export default apiClient;
