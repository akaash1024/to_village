type Action = 'fetch' | 'create' | 'update' | 'delete' | 'notFound' | 'invalid';

export const AppointmentMessages = {
  success(entity: string, action: Action) {
    const actions: Record<string, string> = {
      fetch: `${entity} fetched successfully`,
      create: `${entity} created successfully`,
      update: `${entity} updated successfully`,
      delete: `${entity} deleted successfully`,
      notFound: `${entity} not found`,
      invalid: `Invalid ${entity} request`,
    };

    return actions[action];
  },

  failure(entity: string, action: Action) {
    const actions: Record<string, string> = {
      fetch: `Failed to fetch ${entity}`,
      create: `Failed to create ${entity}`,
      update: `Failed to update ${entity}`,
      delete: `Failed to delete ${entity}`,
      notFound: `${entity} not found`,
      invalid: `Invalid ${entity} request`,
    };

    return actions[action];
  },

  custom(message: string) {
    return message;
  },
};
