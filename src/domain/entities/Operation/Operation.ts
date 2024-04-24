export enum OperationType {
  addition = 'addition',
  subtraction = 'subtraction',
  multiplication = 'multiplication',
  division = 'division',
  square_root = 'square_root',
  random_string = 'random_string',
}

export class Operation {
  private cost: number;
  private type: OperationType;

  constructor(cost: number, type: OperationType) {
    this.cost = cost;
    this.type = type;
  }

  getCost(): number {
    return this.cost;
  }

  getType(): OperationType {
    return this.type;
  }
}
