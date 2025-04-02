import { Admin } from '../users/admin.model';
import { User } from '../users/user.model';

export interface AdminUser {
  admin: Admin;
  user: User;
}
