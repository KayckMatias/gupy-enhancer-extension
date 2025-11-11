import { GupyIntercept } from '../../types/intercept/GupyIntercept'
import { GupyJob, GupyJobStep } from '../../types/intercept/GupyJob'
import { GupyStepResponse } from '../../types/intercept/responses/GupyStepResponse'
import { getDateTime } from '../../utils/date'
import { observeElement, watermark } from '../../utils/dom'

let isInjecting = false

export function handleApplication(payload: GupyIntercept<GupyStepResponse>) {
    if (isInjecting || document.getElementById('gupy-enhancer-job-details')) return
    isInjecting = true

    observeElement('#application-hints', () => {
        const { job } = payload.response
        renameFixedSteps(job.jobSteps)
        injectJobDetails(job)
        injectSteps(job.jobSteps)
        isInjecting = false
    })
}

function renameFixedSteps(steps: GupyJobStep[]): void {
    if (!steps.length) return

    const firstStep = steps[0]
    const lastStep = steps[steps.length - 1]

    if (firstStep.type === 'register') firstStep.name = 'Currículo'
    if (lastStep.type === 'final') lastStep.name = 'Final'
}

function injectJobDetails(job: GupyJob) {
    const elementToInjectBefore = document.getElementById('application-hints')

    if (elementToInjectBefore) {
        const wrapper = document.createElement('div')
        wrapper.id = 'gupy-enhancer-job-details'
        wrapper.className = 'gupy-enhancer'

        const lastMovementAt = job.lastMovementAt
            ? getDateTime(new Date(job.lastMovementAt))
            : 'Não identficado'

        wrapper.innerHTML = `
            <div class="ge-job-details" role="alert">
            ${watermark}
            <div>
                <span class="ge-title">Detalhes da Vaga</span>
                <ul>
                    <li><span class="ge-label">Publicada em:</span> ${getDateTime(new Date(job.publishedAt))}</li>
                    <li><span class="ge-label">Expira em:</span> ${getDateTime(new Date(job.publishedAt))}</li>
                    <li><span class="ge-label">Vagas disponíveis:</span> ${job.numVacancies}</li>
                    <li><span class="ge-label">Candidatos inscritos:</span> ${job.applicantCount}</li>
                    <li><span class="ge-label">Última movimentação:</span> ${lastMovementAt}</li>
                </ul>
            </div>
            </div>
        `

        elementToInjectBefore.insertAdjacentElement('afterend', wrapper)
    }
}

function createTimelineItem(step: GupyJobStep) {
    const wrapper = document.createElement('div')
    wrapper.className = 'gupy-enhancer'

    const applicantsCount = step.applicationStep.applicantsCount ?? 'N/A'

    wrapper.innerHTML = `
        <div class="ge-timeline">
            <div class="ge-timeline-item">
                <span class="ge-marker">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" stroke="none">
                    <path d="M12 2c-4.963 0-9 4.038-9 9v8h.051c.245 1.691 1.69 3 3.449 3 1.174 0 2.074-.417 2.672-1.174a3.99 3.99 0 0 0 5.668-.014c.601.762 1.504 1.188 2.66 1.188 1.93 0 3.5-1.57 3.5-3.5V11c0-4.962-4.037-9-9-9zm7 16.5c0 .827-.673 1.5-1.5 1.5-.449 0-1.5 0-1.5-2v-1h-2v1c0 1.103-.897 2-2 2s-2-.897-2-2v-1H8v1c0 1.845-.774 2-1.5 2-.827 0-1.5-.673-1.5-1.5V11c0-3.86 3.141-7 7-7s7 3.14 7 7v7.5z"></path>
                    <circle cx="9" cy="10" r="2"></circle>
                    <circle cx="15" cy="10" r="2"></circle>
                </svg>
                </span>
                <div class="ge-timeline-card">
                    ${watermark}
                    <div class="ge-title">
                    <div class="ge-title-name">${step.name}</div>
                    <div class="ge-title-desc">Etapa oculta</div>
                    </div>
                    <p class="ge-desc">
                    ${step.objectivesDescription ? step.objectivesDescription : ''}
                    </p>
                    <p class="ge-desc">
                    <strong class="ge-candidates-count">${applicantsCount} pessoas candidatas</strong> nesta etapa.
                    </p>
                </div>
            </div>
        </div>
    `

    return wrapper
}

function injectSteps(steps: GupyJobStep[]) {
    const timeline = document.querySelector('.timeline')
    if (!timeline) return

    const timelineItems = Array.from(timeline.children)

    const stepNameMap = new Map(steps.map((step) => [step.name.trim(), step]))
    const stepTimelineMap = new Map<number, Element>()

    mapExistentTimelineItems(timelineItems, stepNameMap, stepTimelineMap)
    addHiddenSteps(steps, stepTimelineMap, timeline, timelineItems)
    enhanceExistentsSteps(stepTimelineMap, steps)
}

function mapExistentTimelineItems(
    timelineItems: Element[],
    stepNameMap: Map<string, GupyJobStep>,
    stepTimelineMap: Map<Number, Element>,
) {
    timelineItems.forEach((item) => {
        const titleEl = item.querySelector('.expandable-card__header-text')
        if (!titleEl) return

        const title = titleEl.textContent?.trim()
        if (!title) return

        const step = stepNameMap.get(title)
        if (step && !stepTimelineMap.has(step.id)) {
            stepTimelineMap.set(step.id, item)
        }
    })
}

function addHiddenSteps(
    steps: GupyJobStep[],
    stepTimelineMap: Map<Number, Element>,
    timeline: Element,
    timelineItems: Element[],
) {
    steps.forEach((step, index) => {
        if (stepTimelineMap.has(step.id)) return

        let inserted = false
        for (let i = 0; i < timelineItems.length; i++) {
            const timelineItem = timelineItems[i]
            const itemTitleEl = timelineItem.querySelector('.expandable-card__header-text')
            const itemTitle = itemTitleEl?.textContent?.trim()
            if (!itemTitle) continue

            const otherStepIndex = steps.findIndex((s) => s.name.trim() === itemTitle)
            if (otherStepIndex > index) {
                const newItem = createTimelineItem(step)
                timeline.insertBefore(newItem, timelineItem)
                inserted = true
                break
            }
        }

        if (!inserted) {
            timeline.appendChild(createTimelineItem(step))
        }
    })
}

function enhanceExistentsSteps(stepTimelineMap: Map<Number, Element>, steps: GupyJobStep[]) {
    stepTimelineMap.forEach((timelineItem, stepId) => {
        const stepItem = steps.find((step) => step.id === stepId)

        if (!stepItem) return

        const cardBodyText = timelineItem.querySelector('.card-body__text')

        if (!cardBodyText) return

        const wrapper = document.createElement('div')

        const applicantsCount = stepItem.applicationStep.applicantsCount ?? 'N/A'
        wrapper.innerHTML = `Mais precisamente <strong class="ge-candidates-count">${applicantsCount} pessoas candidatas</strong> nesta etapa.`

        cardBodyText.insertAdjacentElement('beforeend', wrapper)
    })
}
