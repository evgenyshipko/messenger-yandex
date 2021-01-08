import Component from '../../../utils/component/Component'
import Store from '../../../utils/Store'
import { MessengerStore } from '../../../types/Types'

interface MessageItemProps {
    id: number,
    userId: number,
    chatId: number,
    content: string,
    time: string,
}

class Message extends Component<MessageItemProps> {
    isIncoming() {
        return new Store<MessengerStore>().content.userProps.id !== this.props.userId
    }

    private _getTime() {
        const timestamp = Date.parse(this.props.time)
        const date = new Date(timestamp)
        return `${date.getHours()}:${date.getMinutes()}`
    }

    template(): string {
        const direction = this.isIncoming() ? 'incoming' : 'outcoming'
        // return `<li class="message-list-item">
        //       <div class="message-${direction}">
        //         <span class="message-text">
        //           {{content}}
        //         </span>
        //         <div class="message-transaction-info">
        //           <i class="message-icon"></i>
        //           <span class="message-time">${this._getTime()}</span>
        //         </div>
        //       </div>
        //     </li>`
        return `<li class="message-list-item">
              <div class="message-${direction}">
                <span class="message-text">
                  {{content}}
                </span>
                <div class="message-transaction-info">
                  <span class="message-time">${this._getTime()}</span>
                </div>
              </div>
            </li>`
    }
}

export default Message
