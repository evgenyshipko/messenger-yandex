import Modal from '../../components/modal/Modal'
import Header from '../../components/Header'
import Button from '../../components/Button'

export const deleteChatModal = new Modal({
    content: [
        new Header({
            text: 'Вы действительно хотите удалить чат?',
            class: 'add-user-modal-header'
        }),
        new Button({
            class: 'messenger-button delete-chat-modal-delete-btn',
            text: 'Удалить'
        }),
        new Button({
            class: 'messenger-button_no-background delete-chat-modal-reject-btn',
            text: 'Отмена',
            eventData: {
                name: 'click',
                callback: () => {
                    deleteChatModal.hide()
                }
            }
        })
    ]
})
deleteChatModal.hide()

