import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface RequestDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute(transaction: RequestDTO): Transaction {
    const balance = this.transactionsRepository.getBalance();

    if (
      transaction.type === 'outcome' &&
      balance.total - transaction.value < 0
    ) {
      throw Error('Invalid Withdraw');
    }

    const newTransaction = this.transactionsRepository.create(transaction);

    return newTransaction;
  }
}

export default CreateTransactionService;
