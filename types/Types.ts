
/* global EventListenerOrEventListenerObject */

import MessageDriver from "../utils/MessageDriver";

export type Nullable<T> = T | null

export type Context = Record<string, any>

export interface EventData {
    name: string,
    callback: EventListenerOrEventListenerObject
}

export interface UserProps{
    id: number,
    'first_name': string,
    'second_name': string,
    'display_name': string,
    login: string,
    email: string,
    phone: string,
    avatar: string
}

export interface ChatData {
    id: number,
    title: string,
    avatar: string
}

interface ChatDataExtended extends ChatData{
    messageDriver: MessageDriver
}

export interface MessengerStore extends Record<string, unknown>{
    currentChatId?: number,
    currentChatUsers?: UserProps[],
    userProps: UserProps,
    isLogged: boolean,
    chatList: ChatDataExtended[]
}
