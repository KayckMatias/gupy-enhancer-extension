export interface GupyJobStep {
    id: number
    name: string
    order: number
    type: string
    onlineTestType: string | null
    objectivesDescription: string | null
    applicationStep: {
        id: number
        linkToTest: string | null
        status: string
        applicantsCount: number
    }
    endDate: string | null
}

export interface GupyJob {
    id: number
    name: string
    jobSteps: GupyJobStep[]
    applicantCount: number
    expiresAt: string
    publishedAt: string
    numVacancies: number
    lastMovementAt: string | null
    isConfidential: boolean
}
