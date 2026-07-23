/*
  Scenario 2: Employee Bonus Update
  ---------------------------------
  The bank wants to implement a bonus scheme for employees based on
  their performance.

  Assumed schema:
    EMPLOYEES(employee_id, name, department_id, salary, ...)

  Stored procedure UpdateEmployeeBonus updates the salary of employees
  in a given department by adding a bonus percentage passed as a
  parameter.

  Parameters:
    p_department_id : the department whose employees receive the bonus
    p_bonus_percent  : bonus percentage to add to salary, e.g. 10 for 10%
*/

CREATE OR REPLACE PROCEDURE UpdateEmployeeBonus (
    p_department_id IN employees.department_id%TYPE,
    p_bonus_percent IN NUMBER
)
IS
BEGIN
    -- Validate bonus percentage input
    IF p_bonus_percent IS NULL OR p_bonus_percent < 0 THEN
        RAISE_APPLICATION_ERROR(-20001, 'Bonus percentage must be a non-negative number.');
    END IF;

    -- Add the bonus percentage to the salary of every employee
    -- in the specified department
    UPDATE employees
       SET salary = salary + (salary * p_bonus_percent / 100)
     WHERE department_id = p_department_id;

    IF SQL%ROWCOUNT = 0 THEN
        DBMS_OUTPUT.PUT_LINE('No employees found in department_id: ' || p_department_id);
    ELSE
        DBMS_OUTPUT.PUT_LINE(
            'Bonus of ' || p_bonus_percent || '% applied to ' ||
            SQL%ROWCOUNT || ' employee(s) in department_id: ' || p_department_id
        );
    END IF;

    COMMIT;
EXCEPTION
    WHEN OTHERS THEN
        ROLLBACK;
        DBMS_OUTPUT.PUT_LINE('Error updating employee bonus: ' || SQLERRM);
        RAISE;
END UpdateEmployeeBonus;
/

-- Example call: give department 10 a 5% bonus
-- EXEC UpdateEmployeeBonus(10, 5);
