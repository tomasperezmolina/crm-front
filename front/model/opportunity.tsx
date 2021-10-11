export const steps = ['Prospect', 'First meeting', 'Development', 'POC development', 'POC implementation', 'Negotiation', 'Completed'] as const;

export type StepType = typeof steps[number];