import BaseComponent from '../components/BaseComponent';
import ProfileInfo from '../components/ProfileInfo';
import ProfileAddressBlock from '../components/ProfileAddressBlock';
import { Customer } from '../types/Types';

export default class ProfilePage extends BaseComponent {
  profileInfo: ProfileInfo;

  profileAddressBlock: ProfileAddressBlock;

  userInfo: Customer;

  constructor(userInfo: Customer) {
    super({
      tag: 'section',
      classes: ['profile', 'container'],
    });
    this.userInfo = userInfo;

    // personal information
    this.profileInfo = new ProfileInfo(userInfo);
    this.profileAddressBlock = new ProfileAddressBlock(userInfo);

    // console.log(userInfo);

    this.append(this.profileInfo);
    this.append(this.profileAddressBlock);
  }
}
