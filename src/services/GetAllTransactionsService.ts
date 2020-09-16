import TransactionsRepository from '../repositories/TransactionsRepository';

class GetAllTransactionsService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute() {
    const transactions = this.transactionsRepository.all();

    const balance = this.transactionsRepository.getBalance();

    return {
      transactions,
      balance,
    };
  }
}

export default GetAllTransactionsService;
