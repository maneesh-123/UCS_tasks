'use strict';

const { Contract } = require('fabric-contract-api');

class IdentityManagementContract extends Contract {

    async instantiate(ctx) {
        console.info('Chaincode Instantiated');
    }

    async createUser(ctx, userId, name) {
        const existingUser = await ctx.stub.getState(userId);
        if (existingUser && existingUser.length > 0) {
            throw new Error('User already exists with ID: ' + userId);
        }

        const user = {
            userId: userId,
            name: name,
            access: false,
        };

        await ctx.stub.putState(userId, Buffer.from(JSON.stringify(user)));
        console.info('User created with ID: ' + userId);
    }

    async grantAccess(ctx, userId) {
        const user = await this.getUser(ctx, userId);
        user.access = true;

        await ctx.stub.putState(userId, Buffer.from(JSON.stringify(user)));
        console.info('Access granted to user with ID: ' + userId);
    }

    async retrieveUserData(ctx, userId) {
        const user = await this.getUser(ctx, userId);
        return JSON.stringify(user);
    }

    async revokeAccess(ctx, userId) {
        const user = await this.getUser(ctx, userId);
        user.access = false;

        await ctx.stub.putState(userId, Buffer.from(JSON.stringify(user)));
        console.info('Access revoked for user with ID: ' + userId);
    }

    async getUser(ctx, userId) {
        const userBytes = await ctx.stub.getState(userId);
        if (!userBytes || userBytes.length === 0) {
            throw new Error('User not found with ID: ' + userId);
        }

        return JSON.parse(userBytes.toString());
    }
}

module.exports = IdentityManagementContract;
