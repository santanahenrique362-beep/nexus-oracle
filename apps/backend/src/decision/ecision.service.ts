import { Injectable } from '@nestjs/common';
import { DecisionInput, DecisionOutput, evaluateDecision } from './decision.engine';

@Injectable()
export class DecisionService {
  consolidateDecision(input: DecisionInput): DecisionOutput {
    return evaluateDecision(input);
  }
}
