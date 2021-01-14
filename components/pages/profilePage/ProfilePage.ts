import Component from '../../../utils/component/Component'
import Button from '../../button/Button'
import Form from '../../Form'
import Avatar from '../../Avatar'
import Modal from '../../modal/Modal'
import './ProfilePage.less'

interface ProfilePageProps {
    avatar: Avatar,
    backButton: Button,
    userName: string,
    form: Form,
    buttonList: Button[],
    uploadAvatarModal: Modal
}

class ProfilePage extends Component<ProfilePageProps> {
    template(): string {
        return `
        <div class="profile">
            <div class="profile-left-block">{{backButton}}</div>
            <div class="profile-center-block">
              <div class="profile-header">
                <div class="profile-avatar">
                   {{avatar}}
                </div>
                <span class="profile-user-name">{{userName}}</span>
              </div>
              <div class="profile-form-block">
                <div class="profile-form-wrapper">
                  {{form}}
                </div>
              </div>
              <div class="profile-button-block">
                {{buttonList}}
              </div>
            </div>
            <div class="profile-right-empty-block"></div>
          </div>
          <div>{{uploadAvatarModal}}</div>
        `
    }
}

export default ProfilePage
