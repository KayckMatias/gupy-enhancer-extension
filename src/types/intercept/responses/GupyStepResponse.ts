import { GupyJob } from '../GupyJob'
import { GupyResponse } from '../GupyResponse'

export interface GupyStepResponse extends GupyResponse {
    id: number
    currentStepId: number
    registrationComplete: boolean
    status: string
    candidateHasViewedCurriculum: boolean
    job: GupyJob
    candidate: {
        id: number
        currentProfileId: number
        externalProfileTestDone: boolean
    }
    useExternalProfileTest: boolean
    isFirstCVCompletedInCompany: boolean
}
