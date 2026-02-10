export interface Advice {
  title: string;
  symbol: string;
  decision: 'BUY' | 'WAIT' | string;
  reasoning: string;
  entry_price: number;
}

export interface TalebSignal {
  id: string;
  createdAt: string;
  marketStatus: string;
  aiReasoning: string;
  callAdvice?: Advice;
  putAdvice?: Advice;
}

export interface UserType {
  subscriptionExpiresAt?: string;
}
