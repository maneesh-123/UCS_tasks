# Universal Credit System

## Task 1:

### Question 1: Write a chain code for publishing messages on Blockchain and also to fetch the message from the blockchain.For sake of simplicity create some sort of mapping associated with a message that you give your roll no and then it fetches a message published by you. 


Functions in Code:

initLedger: Used to initialize the rollnumbers with the message to be published.
publishMessage: Used to publish the message.
fetchMessage: Used to fetch a published message. Throw an error if message is not already published.
FetchAllMessages: An additional function to fetch all messages available on the ledger.

### Question 2: The goal of our project is somewhat similar to identity management. The idea is originally derived from ChatGpt but with little addings.
Write a chaincode for basically implementing an identity management system where you create a user,grant him access,retrieve his data,revoke his access etc.

Functions in Code:

createUser: Creates a new user with a given ID and name.
grantAccess: Grants access to a user by updating the access property to true.
retrieveUserData: Retrieves user data in JSON format.
revokeAccess: Revokes access to a user by updating the access property to false.
getUser: Helper function to retrieve a user's data from the ledger.
