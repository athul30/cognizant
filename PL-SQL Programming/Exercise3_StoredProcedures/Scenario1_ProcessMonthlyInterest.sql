/*
  Scenario 1: Process Monthly Interest for Savings Accounts
  ----------------------------------------------------------
  The bank needs to process monthly interest for all savings accounts.

  Assumed schema:
    SAVINGS_ACCOUNTS(account_id, customer_id, balance, ...)

  Stored procedure ProcessMonthlyInterest calculates and updates the
  balance of all savings accounts by applying a 1% interest rate to
  the current balance.
*/

CREATE OR REPLACE PROCEDURE ProcessMonthlyInterest
IS
    c_interest_rate CONSTANT NUMBER := 0.01; -- 1% monthly interest
BEGIN
    -- Apply 1% interest to every savings account's current balance
    UPDATE savings_accounts
       SET balance = balance + (balance * c_interest_rate);

    DBMS_OUTPUT.PUT_LINE(
        'Monthly interest processed for ' || SQL%ROWCOUNT || ' savings account(s).'
    );

    COMMIT;
EXCEPTION
    WHEN OTHERS THEN
        ROLLBACK;
        DBMS_OUTPUT.PUT_LINE('Error processing monthly interest: ' || SQLERRM);
        RAISE;
END ProcessMonthlyInterest;
/

-- Example call:
-- EXEC ProcessMonthlyInterest;
