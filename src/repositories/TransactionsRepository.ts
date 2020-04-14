import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

class TransactionsRepository {
  private transactions: Transaction[];

  private balance!: Balance;

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    this.balance = { income: 0, outcome: 0, total: 0 };

    this.balance.income = this.transactions.reduce(
      (accumulator: number, transaction) => {
        if (transaction.type === 'income') {
          accumulator += transaction.value;
        }

        return accumulator;
      },
      0,
    );

    this.balance.outcome = this.transactions.reduce(
      (accumulator: number, transaction) => {
        if (transaction.type === 'outcome') {
          accumulator += transaction.value;
        }

        return accumulator;
      },
      0,
    );

    this.balance.total = this.balance.income - this.balance.outcome;

    return this.balance;
  }

  public create({ title, type, value }: Omit<Transaction, 'id'>): Transaction {
    const transaction = new Transaction({ title, value, type });

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
