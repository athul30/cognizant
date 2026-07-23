/*
  Scenario 3: Loan Due Reminders
  ------------------------------
  The bank wants to send reminders to customers whose loans are due
  within the next 30 days.

  Assumed schema:
    CUSTOMERS(customer_id, name, ...)
    LOANS(loan_id, customer_id, due_date, ...)

  This block fetches all loans due in the next 30 days and prints a
  reminder message for each customer.
*/

DECLARE
    CURSOR due_loans_cur IS
        SELECT l.loan_id,
               l.due_date,
               c.customer_id,
               c.name
          FROM loans l
          JOIN customers c ON c.customer_id = l.customer_id
         WHERE l.due_date BETWEEN TRUNC(SYSDATE) AND TRUNC(SYSDATE) + 30;
BEGIN
    -- Loop through all loans due within the next 30 days
    FOR loan_rec IN due_loans_cur LOOP

        DBMS_OUTPUT.PUT_LINE(
            'Reminder: Dear ' || loan_rec.name ||
            ', your loan (ID: ' || loan_rec.loan_id ||
            ') is due on ' || TO_CHAR(loan_rec.due_date, 'DD-MON-YYYY') ||
            '. Please ensure timely payment.'
        );

        -- In a real system, this is where you might insert into a
        -- NOTIFICATIONS table or call an email/SMS service instead of
        -- (or in addition to) printing the message.

    END LOOP;

    DBMS_OUTPUT.PUT_LINE('Loan due reminder process completed.');
EXCEPTION
    WHEN OTHERS THEN
        DBMS_OUTPUT.PUT_LINE('Error occurred: ' || SQLERRM);
END;
/
