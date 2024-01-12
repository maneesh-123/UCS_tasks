'use strict';

const { Contract } = require('fabric-contract-api');

class MessageContract extends Contract {

    async initLedger(ctx) {

        const initialData = [
            {roll_No: "ee22b058", message: "Has to write a make up exam for EE2025 course"},
            {roll_No: "ab22d067", message: "Has to do two months work at library"}
        ];

        // add the initial data to the ledger
        for (const data of initialData) {
            await this.publishMessage(ctx, data.roll_No, data.message);
        }

        

        
    }

    async publishMessage(ctx, rollNo, message) {

        // Lines 16 to 20 are neccessary only if we don't need to overwrite if a rollnumber already has some message
        // // Check if the message already exists
        // const existingMessage = await ctx.stub.getState(rollNo);
        // if (existingMessage && existingMessage.length > 0) {
        //     throw new Error('Message for this roll number already exists');
        // }

        // Publish the message
        await ctx.stub.putState(rollNo, Buffer.from(message));
        return 'Message published successfully';
    }

    async fetchMessage(ctx, rollNo) {
        // Fetch and return the message associated with the given roll number
        const message = await ctx.stub.getState(rollNo);

        if (!message || message.length === 0) {
            throw new Error('Message not found for this roll number');
        }

        return message.toString('utf-8');
    }

    // Additional functionality - Fetch all messages on the ledger
    async fetchAllMessages(ctx) {
        const iterator = await ctx.stub.getStateByRange('', '');
        const messages = [];

        while (true) {
            const result = await iterator.next();

            if (result.value && result.value.value.length > 0) {
                const rollNo = result.value.key;
                const message = result.value.value.toString('utf-8');
                messages.push({ rollNo, message });
            }

            if (result.done) {
                await iterator.close();
                return messages;
            }
        }
    }
}

module.exports = MessageContract;
