import Component from '../utils/Component.js'
import { EventData } from '../types/Types'

interface AvatarProps {
    eventData: EventData
}

class Avatar extends Component<AvatarProps> {
    constructor(props: AvatarProps) {
        super(props)
    }

    template(): string {
        return `<span class="profile-avatar__content" @event={{eventData}}>Изменить аватар</span>`
    }
}

export default Avatar