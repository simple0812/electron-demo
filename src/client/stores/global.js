import { observable, action, runInAction } from 'mobx';

class GlobalStore {
  @observable collapse = false;
  @observable count = 1;

  @action toggle = () => {
    console.log('xxxxx')
    this.count += 1
  };
}

export default new GlobalStore();
