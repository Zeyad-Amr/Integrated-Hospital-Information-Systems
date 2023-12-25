import VitalsInterface from "./vitals-interface"

export default interface TriageAXInterface {
    mainComplaint: string
    LOCId?: number
    triageTypeId?: number
    comorbidityIds: number[]
    transferTo: string
    vitals?: VitalsInterface
}

