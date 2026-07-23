/*
  Scenario 3: Transfer Funds Between Accounts
  --------------------------------------------
  Customers should be able to transfer funds between their accounts.

  Assumed schema:
    ACCOUNTS(account_id, customer_id, balance, ...)

  Stored procedure TransferFunds transfers a specified amount from one
  account to another, checking that the source account has sufficient
  balance before making the transfer.

  Parameters:
    p_from_account : source account_id
    p_to_account   : destination account_id
    p_amount       : amount to transfer
*/

CREATE OR REPLACE PROCEDURE TransferFunds (
    p_from_account IN accounts.account_id%TYPE,
    p_to_account   IN accounts.account_id%TYPE,
    p_amount       IN NUMBER
)
IS
    v_from_balance accounts.balance%TYPE;
    e_insufficient_funds EXCEPTION;
    e_invalid_amount     EXCEPTION;
BEGIN
    -- Validate transfer amount
    IF p_amount IS NULL OR p_amount <= 0 THEN
        RAISE e_invalid_amount;
    END IF;

    -- Lock the source account row and get its current balance
    SELECT balance
      INTO v_from_balance
      FROM accounts
     WHERE account_id = p_from_account
    FOR UPDATE;

    -- Check sufficient balance before transferring
    IF v_from_balance < p_amount THEN
        RAISE e_insufficient_funds;
    END IF;

    -- Deduct amount from source account
    UPDATE accounts
       SET balance = balance - p_amount
     WHERE account_id = p_from_account;

    -- Add amount to destination account
    UPDATE accounts
       SET balance = balance + p_amount
     WHERE account_id = p_to_account;

    -- Confirm destination account existed and was updated
    IF SQL%ROWCOUNT = 0 THEN
        RAISE_APPLICATION_ERROR(-20002, 'Destination account_id ' || p_to_account || ' not found.');
    END IF;

    COMMIT;
    DBMS_OUTPUT.PUT_LINE(
        'Transferred ' || p_amount || ' from account ' || p_from_account ||
        ' to account ' || p_to_account || ' successfully.'
    );

EXCEPTION
    WHEN e_invalid_amount THEN
        ROLLBACK;
        DBMS_OUTPUT.PUT_LINE('Transfer failed: amount must be greater than zero.');
        RAISE_APPLICATION_ERROR(-20003, 'Invalid transfer amount.');

    WHEN e_insufficient_funds THEN
        ROLLBACK;
        DBMS_OUTPUT.PUT_LINE(
            'Transfer failed: account ' || p_from_account || ' has insufficient balance.'
        );
        RAISE_APPLICATION_ERROR(-20004, 'Insufficient funds in source account.');

    WHEN NO_DATA_FOUND THEN
        ROLLBACK;
        DBMS_OUTPUT.PUT_LINE('Transfer failed: source account ' || p_from_account || ' not found.');
        RAISE_APPLICATION_ERROR(-20005, 'Source account not found.');

    WHEN OTHERS THEN
        ROLLBACK;
        DBMS_OUTPUT.PUT_LINE('Unexpected error during transfer: ' || SQLERRM);
        RAISE;
END TransferFunds;
/

-- Example call: transfer 500 from account 1001 to account 1002
-- EXEC TransferFunds(1001, 1002, 500);
