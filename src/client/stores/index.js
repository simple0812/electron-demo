import caseManageStore from './caseManage';
import loginStore from './login';
import { configure } from 'mobx';
import globalStore from './global';

configure({
  enforceActions: 'always' // 严格模式
});

const stores = {
  caseManageStore,
  loginStore,
  globalStore
};

export default stores;
