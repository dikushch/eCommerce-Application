import BaseComponent from '../components/BaseComponent';
import { Customer } from '../types/Types';

export default class ProfilePage extends BaseComponent {
  userInfo: Customer;

  constructor(userInfo: Customer) {
    super({});
    this.userInfo = userInfo;
  }
}
