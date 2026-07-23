/*
  Scenario 1: Senior Citizen Loan Interest Discount
  -----------------------------------------------
  The bank wants to apply a discount to loan interest rates for
  customers above 60 years old.

  Assumed schema:
    CUSTOMERS(customer_id, name, date_of_birth, age)
    LOANS(loan_id, customer_id, interest_rate, ...)

  This block loops through all customers, checks their age, and if
  they are above 60, applies a 1% discount to their current loan
  interest rate(s).
*/

DECLARE
    v_age NUMBER;
BEGIN
    -- Loop through every customer
    FOR cust_rec IN (SELECT customer_id, age FROM customers) LOOP

        v_age := cust_rec.age;

        -- Check if the customer is above 60 years old
        IF v_age > 60 THEN

            -- Apply a 1% discount to all loans belonging to this customer
            UPDATE loans
               SET interest_rate = interest_rate - 1
             WHERE customer_id = cust_rec.customer_id
               AND interest_rate > 1; -- avoid negative/zero rates

            DBMS_OUTPUT.PUT_LINE(
                'Applied 1% interest discount for customer_id: ' || cust_rec.customer_id
            );
        END IF;

    END LOOP;

    COMMIT;
    DBMS_OUTPUT.PUT_LINE('Senior citizen loan discount process completed.');
EXCEPTION
    WHEN OTHERS THEN
        ROLLBACK;
        DBMS_OUTPUT.PUT_LINE('Error occurred: ' || SQLERRM);
END;
/
