export const watermark = `<div class="ge-watermark">Enhanced by <a href="https://github.com/KayckMatias/gupy-enhancer-extension" target="_blank" rel="noreferrer" class="ge-watermark-name">Gupy Enhancer</a></div>`

export function observeElement(selector: string, callback: () => void) {
    const observer = new MutationObserver((_, obs) => {
        if (document.querySelector(selector)) {
            callback()
            obs.disconnect()
        }
    })
    observer.observe(document.body, { childList: true, subtree: true })
}
