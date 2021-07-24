/****** create file by codeGen ******/
import BaseService, { postFn } from '../magicPackages/BaseService';

class BookManageService extends BaseService {
  constructor() {
    super('', {
      login: '/api/auth/login.do',
      logout: '/api/auth/logout.do'
    });
  }
}

export default new BookManageService();
