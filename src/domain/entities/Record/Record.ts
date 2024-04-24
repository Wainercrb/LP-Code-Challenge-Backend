export class Record {
  private operation_id: number;
  private user_id: number;
  private amount: number;
  private operation_response: string;
  private isDeleted: boolean;
  private date: Date;

  constructor(
    operation_id: number,
    user_id: number,
    amount: number,
    operation_response: string,
    date: Date,
    isDeleted: boolean,
  ) {
    this.operation_id = operation_id;
    this.user_id = user_id;
    this.amount = amount;
    this.operation_response = operation_response;
    this.date = date;
    this.isDeleted = isDeleted;
  }

  getOperationId(): number {
    return this.operation_id;
  }
  getUserId(): number {
    return this.user_id;
  }

  getAmount(): number {
    return this.amount;
  }

  getOperationResponse(): string {
    return this.operation_response;
  }

  getDate(): Date {
    return this.date;
  }

  getIsDeleted(): boolean {
    return this.isDeleted;
  }
}
