/*
  Scenario 2: VIP Status Promotion
  --------------------------------
  A customer can be promoted to VIP status based on their balance.

  Assumed schema:
    CUSTOMERS(customer_id, name, balance, is_vip)
      -- is_vip is a CHAR(1) or VARCHAR2 column ('Y'/'N'),
      -- or a NUMBER(1) flag (1/0), or BOOLEAN if using a PL/SQL-only table.
      -- This example assumes a VARCHAR2 column storing 'Y' / 'N'.

  This block iterates through all customers and sets IsVIP to TRUE
  ('Y') for those with a balance over $10,000.
*/

DECLARE
    v_balance customers.balance%TYPE;
BEGIN
    -- Loop through every customer
    FOR cust_rec IN (SELECT customer_id, balance FROM customers) LOOP

        v_balance := cust_rec.balance;

        IF v_balance > 10000 THEN
            -- Promote customer to VIP status
            UPDATE customers
               SET is_vip = 'Y'
             WHERE customer_id = cust_rec.customer_id;

            DBMS_OUTPUT.PUT_LINE(
                'Customer_id ' || cust_rec.customer_id || ' promoted to VIP.'
            );
        ELSE
            -- Ensure non-qualifying customers are explicitly marked as not VIP
            UPDATE customers
               SET is_vip = 'N'
             WHERE customer_id = cust_rec.customer_id;
        END IF;

    END LOOP;

    COMMIT;
    DBMS_OUTPUT.PUT_LINE('VIP status update process completed.');
EXCEPTION
    WHEN OTHERS THEN
        ROLLBACK;
        DBMS_OUTPUT.PUT_LINE('Error occurred: ' || SQLERRM);
END;
/
