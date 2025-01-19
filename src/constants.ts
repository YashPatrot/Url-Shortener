export const ENV_VARS = {

    AWS: {
        AWS_REGION: 'AWS_REGION',
        AWS_ACCESS_KEY_ID: 'AWS_ACCESS_KEY_ID',
        AWS_SECRET_ACCESS_KEY: 'AWS_SECRET_ACCESS_KEY'
    },
    AWS_COGNITO: {
        AWS_COGNITO_USER_POOL_ID: 'AWS_COGNITO_USER_POOL_ID',
        AWS_COGNITO_CLIENT_ID: 'AWS_COGNITO_CLIENT_ID',
        AWS_COGNITO_CLIENT_SECRET: 'AWS_COGNITO_CLIENT_SECRET'
    },
    URL_PREFIX: 'URL_PREFIX',
    CLOUDFLARE_URL: 'CLOUDFLARE_URL'
}

export const Strings = {
    // General messages
    SUCCESS: 'Operation completed successfully.',
    ERROR: 'Something went wrong. Please try again.',
    INVALID_INPUT: 'The provided input is invalid.',

    // Authentication messages
    AUTH: {
        SIGNUP_SUCCESS: 'User signed up successfully.',
        SIGNUP_FAILURE: {
            USERNAME_EXISTS_EXCEPTION: {
                TYPE: 'UsernameExistsException',
                MESSAGE: 'A user with this email already exists.'
            },
            INVALID_PASSWORD_EXCEPTION: {
                TYPE: 'InvalidPasswordException',
                MESSAGE: 'Password must contain at least one lowercase letter, one uppercase letter, one numeric digit, and be at least 8 characters long.'
            }
        },
        LOGIN_SUCCESS: 'Login successful.',
        LOGIN_FAILURE: {
            NOT_AUTHORIZED_EXCEPTION: {
                TYPE: 'NotAuthorizedException',
                MESSAGE: 'Incorrect username or password'
            }
        },
        LOGIN_FAILED: 'Invalid username or password.',
        TOKEN_EXPIRED: 'Your session has expired. Please log in again.',
        UNAUTHORIZED: 'You are not authorized to access this resource.',
        UPDATE_PASSWORD: {
            SUCCESS_MESSAGE: 'Your password has been successfully updated.',
            FAILURE_MESSAGE: 'There was an error updating your password. Please try again later.'
        },
        SIGNOUT: {
            SUCCESS_MESSAGE: 'You have been signed out successfully.',
            FAILURE_MESSAGE: 'There was an error signing you out. Please try again later.'
        }
    },

    // User-related messages
    USER: {
        CREATED: {
            SUCCESS: 'User account created successfully.',
            FAIL: 'User account creation failed.'
        },
        UPDATED: {
            SUCCESS: 'User details updated successfully.',
            FAIL: 'Failed to update user details.'
        },
        DELETED: {
            SUCCESS: 'User account deleted successfully.',
            FAIL: 'Failed to delete user account.'
        },
        FETCH: {
            SUCCESS: 'User details fetched successfully.',
            FAIL: 'Failed to fetch user details.'
        },
        NOT_FOUND: 'User not found.',
    },

    // URL Shortener messages
    URL: {
        CREATED: {
            SUCCESS: 'Short URL generated successfully.',
            FAIL: 'Failed to generate short URL.'
        },
        FETCH: {
            SUCCESS: 'Short URL fetched successfully.',
            FAIL: 'Failed to fetch short URL.'
        },
        UPDATED: {
            SUCCESS: 'Short URL updated successfully.',
            FAIL: 'Failed to update short URL.'
        },
        DELETED: {
            SUCCESS: 'Short URL deleted successfully.',
            FAIL: 'Failed to delete short URL.'
        },
        NOT_FOUND: 'The requested URL does not exist.',
        ALIAS: {
            CONFLICT: {
                MESSAGE: 'The provided alias is already in use. Please choose a different alias.'
            }
        },
        DNS: {
            SUCCESS: 'DNS resolved successfully.',
            FAIL: 'Failed to resolve DNS.'
        }
    }
    ,

    // Validation messages
    VALIDATION: {
        REQUIRED: 'This field is required.',
        EMAIL_INVALID: 'The provided email address is invalid.',
        PASSWORD_WEAK: 'Password must contain at least 8 characters, including uppercase, lowercase, and numbers.',
    },

    // Miscellaneous
    GENERAL: {
        WELCOME: 'Welcome to the application!',
        GOODBYE: 'Thank you for using our service.',
        CONTACT_SUPPORT: 'If the issue persists, contact support.',
    },
};

