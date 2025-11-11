export type StorageKey = 'shouldInject' | 'improveApplicationPage'

export async function getSetting<T = boolean>(key: StorageKey, defaultValue: T): Promise<T> {
    return new Promise((resolve) => {
        chrome.storage.local.get([key], (result) => {
            if (result[key] === undefined) {
                chrome.storage.local.set({ [key]: defaultValue })
                resolve(defaultValue)
            } else {
                resolve(result[key])
            }
        })
    })
}

export async function setSetting<T = boolean>(key: StorageKey, value: T): Promise<void> {
    return new Promise((resolve) => {
        chrome.storage.local.set({ [key]: value }, () => resolve())
    })
}
