import Component from '../../../utils/component/Component'
import Form from '../../Form'
import Button from '../../button/Button'
import './SigninPage.less'

interface SigninPageProps {
    form: Form,
    registrationBtn: Button
}

class SigninPage extends Component<SigninPageProps> {
    template() {
        return `
            <div class='signin-wrapper'>
              <div class='signin'>
                <p class='signin-header'>Вход</p>
                <div>{{form}}</div>
                <div>{{registrationBtn}}</div>
              </div>
            </div>`
    }
}

export default SigninPage
