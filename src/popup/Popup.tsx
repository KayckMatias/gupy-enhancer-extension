import { useState, useEffect } from 'react'
import './Popup.css'
import { getSetting, setSetting, StorageKey } from '../utils/storage'

export function Popup() {
    const [settings, setSettings] = useState<Record<StorageKey, boolean>>({
        shouldInject: true,
        improveApplicationPage: true,
    })

    useEffect(() => {
        ;(async () => {
            setSettings({
                shouldInject: await getSetting('shouldInject', true),
                improveApplicationPage: await getSetting('improveApplicationPage', true),
            })
        })()
    }, [])

    const handleToggle = async (key: StorageKey, value: boolean) => {
        setSettings((prev) => ({ ...prev, [key]: value }))
        await setSetting(key, value)
    }

    return (
        <div className="popup">
            <div className="popup-content">
                <div className="popup-header">
                    <h1 className="popup-title">Gupy Enhancer</h1>
                    <p className="popup-subtitle">Eleve sua experiência na Gupy :)</p>
                </div>

                <div className="popup-toggle-group">
                    <label className="popup-toggle-item">
                        <div>
                            <p className="popup-toggle-title">Habilitar Extensão</p>
                            <p className="popup-toggle-desc">
                                Ative esta opção para habilitar a melhoria de páginas da Gupy.
                            </p>
                        </div>

                        <div className="switch">
                            <input
                                type="checkbox"
                                checked={settings.shouldInject}
                                onChange={(e) => handleToggle('shouldInject', e.target.checked)}
                            />
                            <span className="slider"></span>
                        </div>
                    </label>

                    <label
                        className={`popup-toggle-item ${!settings.shouldInject ? 'disabled' : ''}`}
                    >
                        <div>
                            <p className="popup-toggle-title">Melhorar página de aplicação</p>
                            <p className="popup-toggle-desc">
                                Essa opção exibe etapas ocultas, aprimora as etapas existentes e
                                mostra informações avançadas da vaga para análise detalhada.
                            </p>
                        </div>

                        <div className="switch">
                            <input
                                type="checkbox"
                                disabled={!settings.shouldInject}
                                checked={settings.improveApplicationPage}
                                onChange={(e) =>
                                    handleToggle('improveApplicationPage', e.target.checked)
                                }
                            />
                            <span className="slider"></span>
                        </div>
                    </label>
                </div>

                <div className="popup-footer">
                    <p>Gostou do projeto?</p>
                    <a
                        href="https://github.com/KayckMatias/gupy-enhancer-extension"
                        target="_blank"
                        rel="noreferrer"
                        className="cta-btn"
                    >
                        ❤️ Contribua no GitHub
                    </a>
                </div>
            </div>
        </div>
    )
}
