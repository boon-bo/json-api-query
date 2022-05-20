
export interface INotifications {
  notifications: {
    email: boolean;
    phone: boolean;
  };
  billingUpdates: {
    email: boolean;
    phone: boolean;
  };
  newTeamMembers: {
    email: boolean;
    phone: boolean;
  };
  completeProjects: {
    email: boolean;
    phone: boolean;
  };
  newsletters: {
    email: boolean;
    phone: boolean;
  };
}
