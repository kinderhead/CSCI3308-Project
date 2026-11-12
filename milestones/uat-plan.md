# GrocerWees UAT Plan

**Team:** The Grocery Gang (14-07)

## 1. Scope and Acceptance Criteria

The goal is to make sure users can successfully complete basic tasks in GrocerWees.

- **Registration:** Users can create accounts with valid information. Invalid information is rejected.
- **Login:** Users can log in with correct credentials. Incorrect credentials are rejected.
- **Shopping Lists:** Users can create and save lists. Empty list names are rejected.

## 2. Testing Environment

- **Application:** GrocerWees
- **Environment:** Localhost:3000, Docker Compose, PostgreSQL
- **Browser:** Google Chrome
- **Version/Date:** To be recorded during testing
- **Testers:** T1 and T2, two representative grocery shoppers recruited by the team, preferably outside the development group

## 3. Test Cases

| ID / Feature          | Preconditions                  | Test Data                                                                            | Steps                                            | Expected Result                         | Tester | Actual  | Status  | Issues          |
| --------------------- | ------------------------------ | ------------------------------------------------------------------------------------ | ------------------------------------------------ | --------------------------------------- | ------ | ------- | ------- | --------------- |
| UAT-01 Registration   | Signed out, unused email       | Name: Test User, Email: uat01@example.com, Password and confirmation: Password123!   | 1. Open register 2. Enter information 3. Submit  | Account created and redirected to login | T1     | Not run | Not run | None            |
| UAT-02 Registration   | Signed out                     | Same name, email: uat02@example.com, Password: Password123!, Confirmation: Wrong123! | 1. Open register 2. Enter information 3. Submit  | Error displayed, account not created    | T1     | Not run | Not run | None            |
| UAT-03 Login          | Registered test account exists | Email: uat01@example.com, Password: Password123!                                     | 1. Open login 2. Enter credentials 3. Submit     | User successfully logs in               | T2     | Not run | Not run | None            |
| UAT-04 Login          | Registered test account exists | Email: uat01@example.com, Password: Wrong123!                                        | 1. Open login 2. Enter credentials 3. Submit     | Error displayed, access denied          | T2     | Not run | Not run | None            |
| UAT-05 Shopping Lists | Logged in, feature available   | List name: Weekly Groceries                                                          | 1. Open lists 2. Create list 3. Save and refresh | List is saved and remains visible       | T1     | Not run | Not run | Feature pending |
| UAT-06 Shopping Lists | Logged in, feature available   | List name: blank                                                                     | 1. Open lists 2. Leave name blank 3. Try saving  | Error displayed, list not created       | T2     | Not run | Not run | Feature pending |

## 4. Results and Follow-Up

Testing will take place during the project testing milestone. We will record actual results, mark each case as Pass, Fail, or Blocked, and document any issues. Failed tests will be corrected and retested. Results will be included in the final project report.

Shopping list tests will be completed once that feature is implemented.
