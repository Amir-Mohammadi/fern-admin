import api from '../../api';
import {ICreateUser} from '../../api/models';

export default class UserManagementService {
  async createUser(user: ICreateUser) {
    try {
      return await api.v1.user.create(user);
    } catch (error) {
      throw error;
    }
  }
}
