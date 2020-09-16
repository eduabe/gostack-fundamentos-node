import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface TransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const callBack = (
      accumulator: number,
      currentValue: Transaction,
    ): number => {
      return accumulator + currentValue.value;
    };

    const income = this.transactions.reduce((accumulator, current) => {
      return current.type === 'income'
        ? accumulator + current.value
        : accumulator;
    }, 0);

    const outcome = this.transactions.reduce((accumulator, current) => {
      return current.type === 'outcome'
        ? accumulator + current.value
        : accumulator;
    }, 0);

    const total = income - outcome;

    const balance: Balance = {
      income,
      outcome,
      total,
    };

    return balance;
  }

  public create({ title, type, value }: TransactionDTO): Transaction {
    const newTransaction = new Transaction({ title, value, type });

    this.transactions.push(newTransaction);
    return newTransaction;
  }
}

export default TransactionsRepository;
