export const API_CONFIG = {
  baseURL: process.env.API_BASE_URL || 'https://api.example.com',
  endpoints: {
    templates: '/templates/v1/templates',
    documents: '/documents/v1/documents',
    schedules: '/schedules/v1/schedules',
  },
  timeouts: {
    request: 30000,
    navigation: 15000,
  },
};
