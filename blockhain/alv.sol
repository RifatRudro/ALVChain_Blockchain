pragma solidity ^0.8.0;

contract ThreeBankSystem {
    address public bank;
    address public NGO;
    address public centralBank;

    struct User {
        string name;
        string nationalId;
        string phoneNumber;
        bool exists;
    }

    struct Transaction {
        address from;
        address to;
        uint256 amount;
        uint256 date;
        address fromBank;
        address toBank;
        bool documentInUse;
        string documentReference;
    }

    mapping(string => User) public users; // Mapping to store user information by National ID
    mapping(string => Transaction[]) public userTransactions; // Mapping to store transactions for each user by National ID

    struct Account {
        uint256 balance;
        bool exists;
    }

    mapping(address => mapping(address => Account)) public accounts;
    mapping(address => address[]) public bankAccounts;

    event AccountCreated(address bank, address accountAddress);
    event Transfer(address from, address to, uint256 amount);
    event Deposit(address account, uint256 amount);
    event LoanCreated(string nationalID, uint256 amount, string documentReference);
    event LoanCleared(string nationalID, uint256 transactionIndex);
    uint256 public totalTransactions; // Total number of transactions
    uint256 public successfulTransactions; // Number of successful transactions

    constructor(address _NGO, address _centralBank) {
        bank = msg.sender;
        NGO = _NGO;
        centralBank = _centralBank;
    }

    modifier onlyBank() {
        require(msg.sender == bank, "Only the bank can call this function.");
        _;
    }

    modifier onlyNGO() {
        require(msg.sender == NGO, "Only the NGO can call this function.");
        _;
    }

    modifier onlyCentralBank() {
        require(msg.sender == centralBank, "Only the central bank can call this function.");
        _;
    }

    function createUser(string memory nationalID, string memory name, string memory userAddress, string memory phoneNumber) public {
        require(!users[nationalID].exists, "User already exists.");

        users[nationalID] = User(name, nationalID, phoneNumber, true);
    }

    function createAccount(address bank, address accountAddress) public {
        require(bank == bank || bank == NGO, "Invalid bank address.");

        require(!accounts[bank][accountAddress].exists, "Account already exists.");

        accounts[bank][accountAddress] = Account(0, true);
        bankAccounts[bank].push(accountAddress);

        emit AccountCreated(bank, accountAddress);
    }

    function deposit(address bank, uint256 amount) public {
        require(accounts[bank][msg.sender].exists, "Account does not exist.");

        accounts[bank][msg.sender].balance += amount;

        emit Deposit(msg.sender, amount);
    }

    function createLoan(string memory nationalID, uint256 amount, string memory documentReference) public onlyBank {
        require(users[nationalID].exists, "User does not exist.");

        // Check if the document is already in use
        for (uint256 i = 0; i < userTransactions[nationalID].length; i++) {
            require(
                keccak256(abi.encodePacked(userTransactions[nationalID][i].documentReference)) != keccak256(abi.encodePacked(documentReference)) || 
                !userTransactions[nationalID][i].documentInUse,
                "Document is already in use for another loan."
            );
        }

        // Record loan transaction details for user's account
        userTransactions[nationalID].push(Transaction(bank, address(0), amount, block.timestamp, bank, address(0), true, documentReference));
        totalTransactions++;
        successfulTransactions++;

        emit LoanCreated(nationalID, amount, documentReference);
    }

    function transfer(address fromBank, address toBank, address to, uint256 amount, string memory nationalID) public {
        require(accounts[fromBank][msg.sender].balance >= amount, "Insufficient balance.");
        require(users[nationalID].exists, "User does not exist.");

        // Check if total amount of transactions exceeds 3000
        (, , uint256 totalAmount, ) = getTransactionsForUser(nationalID);
        require(totalAmount + amount <= 3000, "Total amount of transactions exceeds limit.");

        accounts[fromBank][msg.sender].balance -= amount;
        accounts[toBank][to].balance += amount;

        emit Transfer(msg.sender, to, amount);
        
        // Record transaction details for user's account
        userTransactions[nationalID].push(Transaction(msg.sender, to, amount, block.timestamp, fromBank, toBank, true, ""));
        totalTransactions++;
        successfulTransactions++;
    }

    function clearLoan(string memory nationalID, uint256 transactionIndex) public onlyBank {
        require(users[nationalID].exists, "User does not exist.");
        require(transactionIndex < userTransactions[nationalID].length, "Invalid transaction index.");

        userTransactions[nationalID][transactionIndex].documentInUse = false;

        emit LoanCleared(nationalID, transactionIndex);
    }

    function getBalance(address bank, address accountAddress) public view returns (uint256) {
        require(accounts[bank][accountAddress].exists, "Account does not exist.");

        return accounts[bank][accountAddress].balance;
    }

    function getAccountsUnderBank(address bank) public view returns (address[] memory) {
        return bankAccounts[bank];
    }

    function getTransactionsForUser(string memory nationalID) public view returns (
        uint256 count,
        Transaction[] memory transactions,
        uint256 totalAmount,
        uint256 numLargeTransactions
    ) {
        require(users[nationalID].exists, "User does not exist.");

        Transaction[] memory allTransactions = userTransactions[nationalID];
        uint256 transactionCount = allTransactions.length;
        uint256 largeTransactionCount = 0;
        uint256 totalAmountTransactions = 0;

        // Loop through all transactions
        for (uint256 i = 0; i < transactionCount; i++) {
            Transaction memory transaction = allTransactions[i];

            // Add transaction amount to total amount
            totalAmountTransactions += transaction.amount;

            // Check if transaction amount exceeds 500
            if (transaction.amount > 500) {
                largeTransactionCount++;
            }
        }

        return (transactionCount, allTransactions, totalAmountTransactions, largeTransactionCount);
    }
}