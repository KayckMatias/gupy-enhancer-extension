export function injectScript(filePath: string): void {
    const script = document.createElement('script')
    script.src = chrome.runtime.getURL(filePath)
    script.type = 'text/javascript'
    script.onload = () => script.remove()
    ;(document.head || document.documentElement).appendChild(script)
}
