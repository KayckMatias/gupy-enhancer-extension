import type { GupyRequest } from './GupyRequest'
import type { GupyResponse } from './GupyResponse'

export interface GupyIntercept<TResponse extends GupyResponse> {
    type: 'xhr' | 'fetch'
    request: GupyRequest
    response: TResponse
    status: number
    timestamp: string
}
