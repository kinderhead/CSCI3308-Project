# GrocerWees Lab 10 Testing

## Registration Contract

Our application uses SvelteKit and PostgreSQL for user registration. Unlike the lab's Express example, our registration route accepts HTML form data rather than JSON. The registration contract below describes the expected behavior of our application.

| Item                    | GrocerWees Contract                                                 |
| ----------------------- | ------------------------------------------------------------------- |
| Endpoint                | `POST /register`                                                    |
| Request Format          | HTML form data                                                      |
| Required Fields         | `name`, `email`, `password`, `confirm_password`                     |
| Valid Name              | A nonempty string                                                   |
| Valid Email             | A nonempty string following a valid email format                    |
| Valid Password          | A string containing at least 8 characters and no more than 72 bytes |
| Confirm Password        | Must match the password                                             |
| Successful Registration | HTTP `303` redirect to `/login`                                     |
| Invalid Input           | HTTP `400` with an error message                                    |
| Duplicate Email         | HTTP `409` with an error message                                    |
| Persistence             | One new record in the `users` table with a bcrypt-hashed password   |

### Database Columns

Our registration route stores user information in the PostgreSQL `users` table.

| Column     | Type         | Description                                              |
| ---------- | ------------ | -------------------------------------------------------- |
| `email`    | VARCHAR(255) | Primary key identifying each user                        |
| `password` | VARCHAR(255) | Stores the bcrypt-hashed password                        |
| `name`     | VARCHAR(255) | Stores the user's name                                   |
| `salt`     | VARCHAR(255) | Required column currently populated with an empty string |

The password is hashed using `bcryptjs` before insertion. Bcrypt includes the salt information within the stored password hash.

### Expected Registration Behavior

**Successful Registration**

When a user submits valid information, the application creates a new record in the `users` table and returns HTTP `303`, redirecting to `/login`.

**Invalid Registration**

If required information is missing, the application returns HTTP `400` and displays an error message. For example, omitting the password field returns `Invalid form submission.` No new user should be created.

Other invalid inputs, including short passwords, invalid emails, and mismatched passwords, also return HTTP `400` with the corresponding error message.

If an email is already registered, the application returns HTTP `409` and prevents duplicate registration.

## Automated Tests

We use Mocha, Chai, and Chai HTTP to test our application's behavior.

### Unit Tests

File: `test/validation.spec.cjs`

These tests verify our registration password validation function without requiring a database or HTTP request.

1. Accepts a valid password containing at least 8 characters.
2. Rejects a missing password.
3. Rejects a password shorter than 8 characters.

### Integration Tests

File: `test/server.spec.cjs`

**Welcome Route**

Sends a GET request to `/welcome` and verifies that the server returns HTTP `200` with the expected welcome message.

**Positive Registration**

Submits valid registration information using an HTML form request.

The test verifies that:

- The response has HTTP status `303`.
- The `Location` header points to `/login`.
- Exactly one matching user exists in the database.
- The stored email and name match the submitted information.
- The stored password is different from the plaintext password.
- The stored bcrypt hash matches the original password when verified using `bcrypt.compare()`.

**Negative Registration**

Submits registration information without a password field.

The test verifies that:

- The response has HTTP status `400`.
- The response includes `Invalid form submission.`
- No matching user was inserted into the database.

Since SvelteKit uses form actions, our integration tests use `.type('form')` to send form-encoded data. We also set `Accept: text/html` and disable automatic redirects with `.redirects(0)` so we can verify the actual HTTP status and redirect location.

## Test Environment

Our automated tests run through Docker Compose using three services.

- `db-test` runs a separate PostgreSQL database.
- `web` runs the SvelteKit application on port 3000.
- `tests` runs the Mocha test suite.

The test database is separate from our development database. Environment variables are configured through `.env.test`, and the test database name ends in `_test`.

## Running the Tests

All commands are executed from the `ProjectSourceCode` directory.

**1. Install dependencies**

```bash
docker compose -p lab10-tests -f docker-compose.test.yaml run --rm --no-deps tests npm install
```

**2. Run the test suite**

```bash
docker compose -p lab10-tests -f docker-compose.test.yaml up --abort-on-container-exit --exit-code-from tests
```

**3. Verify repeatability**

Run the same command a second time without manually modifying or resetting the database.

**4. Stop the containers**

```bash
docker compose -p lab10-tests -f docker-compose.test.yaml down
```

## Test Data and Cleanup

The registration integration tests generate a unique email address to prevent conflicts with existing accounts.

We use `beforeEach` and `afterEach` hooks to remove the matching test user before and after each registration test.

This keeps the tests independent and prevents test records from accumulating. Cleanup only targets the generated test account and does not remove unrelated users.

## Test Results

All 6 automated tests passed on two consecutive runs without manually resetting the test database.

These tests confirm that our registration validation, successful account creation, invalid-input handling, and password hashing behave according to our documented registration contract.
