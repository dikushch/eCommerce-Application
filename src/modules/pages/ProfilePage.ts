import BaseComponent from '../components/BaseComponent';
import ProfileInfo from '../components/ProfileInfo';
import { Customer } from '../types/Types';

export default class ProfilePage extends BaseComponent {
  profileInfo: ProfileInfo;

  userInfo: Customer;

  constructor(userInfo: Customer) {
    super({
      tag: 'section',
      classes: ['profile', 'container'],
    });
    this.userInfo = userInfo;

    // personal information
    this.profileInfo = new ProfileInfo(userInfo);

    // console.log(userInfo);

    this.append(this.profileInfo);
  }
}
