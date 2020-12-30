import Button from '../../components/Button'
import Input from '../../components/Input'
import Chat from '../../components/chats/chat/Chat'
import ChatHeader from '../../components/chats/chatHeader/ChatHeader'
import MessageList from '../../components/chats/messageList/MessageList'
import ChatsPage from '../../components/pages/chatsPage/ChatsPage'
import ChatList from '../../components/chats/chatList/ChatList'
import Block from '../../components/Block'
import Router from '../../utils/router/Router'
import Path from '../../constants/Path'
import Store from '../../utils/Store'
import { MessengerStore } from '../../types/Types'
import { attachPopup } from './attachPopup'
import { actionsPopup } from './actionsPopup'
import { addChatModal } from './addChatModal'
import {deleteChatModal} from "./deleteChatModal";
import {addUserModal} from "./addUserModal";
import {deleteUserModal} from "./deleteUserModal";

// создаем внутренние компоненты для компоненты-страницы CreatePage
const functionsBlockComponents = [
    new Block({
        class: 'chats-buttons-block',
        content: [
            new Button({
                class: 'messenger-button_no-background chats-add-chat-btn',
                text: 'Добавить чат',
                eventData: {
                    name: 'click',
                    callback: () => {
                        addChatModal.show('flex')
                    }
                }
            }),
            new Button({
                text: 'Профиль',
                class: 'chats-profile-btn',
                eventData: {
                    name: 'click',
                    callback: () => {
                        new Router('.app').go(Path.PROFILE)
                    }
                }
            })
        ]
    }),
    new Input({
        inputName: 'search',
        placeholder: 'Поиск',
        type: 'text',
        class: 'chats-search-input'
    })
]

const chatHeader = new ChatHeader({
    chatName: 'chat',
    actionsBtn: new Button({
        class: 'chats-head-btn',
        iconClass: 'chats-head-btn__icon',
        eventData: {
            name: 'click',
            callback: () => {
                const content = actionsPopup.getContent()
                if (content && content[0]) {
                    if (content[0].style.display === 'none') {
                        actionsPopup.show('flex')
                    } else {
                        actionsPopup.hide()
                    }
                }
            }
        }
    })
})

const messageList = new MessageList({
    messageItemList: []
})

const footerComponents = [
    new Button({
        class: 'chats-footer-attach-btn',
        eventData: {
            name: 'click',
            callback: () => {
                const content = attachPopup.getContent()
                if (content && content[0]) {
                    if (content[0].style.display === 'none') {
                        attachPopup.show('flex')
                    } else {
                        attachPopup.hide()
                    }
                }
            }
        }
    }),
    new Input({
        type: 'text',
        inputName: 'send-message',
        class: 'chats-footer-input',
        placeholder: 'Сообщение'
    }),
    new Button({
        class: 'chats-footer-send-btn'
    })
]

// сама страница чатов
export const chats = new ChatsPage({
    functionsBlockComponents: functionsBlockComponents,
    footerComponents: footerComponents,
    chatList: new ChatList({
        chatItemList: []
    }),
    messageBlockComponents: [attachPopup, actionsPopup, messageList],
    chatHeader: new Block({ class: '', content: '' }),
    addChatModal: addChatModal,
    deleteChatModal: deleteChatModal,
    addUserModal: addUserModal,
    deleteUserModal: deleteUserModal
})

const store = new Store<MessengerStore>()

const generateChatItemList = () => {
    return store.content.chatList.map((chatData) => {
        return new Chat({
            id: chatData.id,
            chatName: chatData.title,
            messageList: [],
            eventData: {
                name: 'click',
                callback: () => {
                    store.setState({ currentChatId: chatData.id })
                    messageList.setProps({
                        messageItemList: []
                    })
                    chatHeader.setProps({
                        chatName: chatData.title
                    })
                    chats.setProps({
                        chatHeader: chatHeader
                    })
                }
            }
        })
    })
}

const updateChatItemList = (_state: MessengerStore) => {
    chats.props.chatList.setProps({ chatItemList: generateChatItemList() })
}

// подписываем обновление списка чатов на изменение глобального стора
store.subscribe('chatList', updateChatItemList)
