import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface CreateRequest {
  title: string;
  value: number;
  type: string;
}

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({ title, type, value }: CreateRequest): Transaction {
    if (type !== 'income' && type !== 'outcome') {
      throw new Error('Transaction type must be income or outcome!');
    }

    const balance = this.transactionsRepository.getBalance();

    if (type === 'outcome' && balance.income - value < 0) {
      throw new Error('your wallet has no balance!');
    }

    return this.transactionsRepository.create({ title, value, type });
  }
}

export default CreateTransactionService;
