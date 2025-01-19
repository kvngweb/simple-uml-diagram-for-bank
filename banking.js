// Bank class
class Bank {
    constructor(name) {
      this.name = name;
      this.accounts = [];
    }
  
    addAccount(account) {
      this.accounts.push(account);
    }
  
    getAccountByNumber(accountNumber) {
      return this.accounts.find((acc) => acc.accountNumber === accountNumber);
    }
  
    // Static utility class for Bank
    static Utils = class {
      static generateBankId() {
        return Math.random().toString(36).substring(2, 9);
      }
    };
  }
  
  // Account class
  class Account {
    constructor(accountHolder, initialDeposit = 0) {
      this.accountNumber = Account.Utils.generateId();
      this.accountHolder = accountHolder;
      this.balance = initialDeposit;
    }
  
    deposit(amount) {
      if (amount <= 0) {
        throw new Error("Deposit amount must be positive.");
      }
      this.balance += amount;
    }
  
    withdraw(amount) {
      if (amount <= 0) {
        throw new Error("Withdrawal amount must be positive.");
      }
      if (amount > this.balance) {
        throw new Error("Insufficient funds.");
      }
      this.balance -= amount;
    }
  
    getBalance() {
      return this.balance;
    }
  
    // Static utility class for Account
    static Utils = class {
      static generateId() {
        return Math.random().toString(36).substring(2, 9);
      }
    };
  }
  
  // Customer class
  class Customer {
    constructor(name, email) {
      this.customerId = Customer.Utils.generateId();
      this.name = name;
      this.email = email;
    }
  
    viewAccount(account) {
      console.log(`accountNumber: ${account.accountNumber}`);
      console.log(`balance: {account.getBalance()}`);
    }
  
    transferFunds(toAccount, amount) {
      if (amount <= 0) {
        throw new Error("Transfer amount must be positive.");
      }
      const fromAccount = this.account;
      if (amount > fromAccount.getBalance()) {
        throw new Error("Insufficient funds for transfer.");
      }
      fromAccount.withdraw(amount);
      toAccount.deposit(amount);
    }
  
    // Static utility class for Customer
    static Utils = class {
      static generateId() {
        return Math.random().toString(36).substring(2, 9);
      }
    };
  }
  
  // Example Usage
  
  // Create a bank
  const bank = new Bank("National Bank");
  
  // Create customers
  const customer1 = new Customer("Alice Smith", "alice@example.com");
  const customer2 = new Customer("Bob Johnson", "bob@example.com");
  
  // Create accounts
  const account1 = new Account(customer1, 1000); // Initial deposit: 1000
  const account2 = new Account(customer2, 500); // Initial deposit: 500
  
  // Add accounts to the bank
  bank.addAccount(account1);
  bank.addAccount(account2);
  
  // Customer1 views account details
  console.log("Customer1 Account Details:");
  customer1.viewAccount(account1);
  
  // Customer1 transfers funds to Customer2
  console.log("\nTransferring 200 from Customer1 to Customer2...");
  account1.withdraw(200);
  account2.deposit(200);
  
  // View account balances after transfer
  console.log("\nUpdated Account Balances:");
  console.log("Customer1 Account:");
  customer1.viewAccount(account1);
  
  console.log("Customer2 Account:");
  customer2.viewAccount(account2);