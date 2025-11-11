import { MessageType } from "../types/messages/types"

export type Handler<T> = (payload: T) => void

const interceptHandlers: Record<string, Handler<any>[]> = {}

export function onIntercept<T>(event: MessageType, handler: Handler<T>) {
    if (!interceptHandlers[event]) interceptHandlers[event] = []
    interceptHandlers[event].push(handler)

    window.addEventListener(event, (ev: any) => {
        const payload: T = ev.detail
        interceptHandlers[event].forEach((h) => h(payload))
    })
}
