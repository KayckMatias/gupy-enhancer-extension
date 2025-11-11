import { GupyStepResponse } from '../types/intercept/responses/GupyStepResponse'
import { MESSAGE_TYPES } from '../types/messages/types'
import { injectScript } from '../utils/inject'
import './styles.css'
import { GupyIntercept } from '../types/intercept/GupyIntercept'
import { onIntercept } from './dispatcher'
import { handleApplication } from './handlers/application'
import { getSetting } from '../utils/storage'

async function initGupyEnhancer() {
    const shouldInject = await getSetting('shouldInject', true)

    if (!shouldInject) {
        console.warn('[Gupy Enhancer] Melhorias desativadas')
    } else {
        injectScript('src/contentScript/inject/application/interceptor.js')
    }

    const improveApplicationPage = await getSetting('improveApplicationPage', true)
    if (improveApplicationPage) {
        onIntercept<GupyIntercept<GupyStepResponse>>(
            MESSAGE_TYPES.GUPY_INTERCEPT_STEPS,
            handleApplication,
        )
    }
}

try {
    initGupyEnhancer()
} catch (error) {
    console.error('[Gupy Enhancer] Erro ao inicializar:', error)
}
