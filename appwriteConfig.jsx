import { Client, Account, Databases, ID } from 'appwrite';

// Initialize Appwrite client with API key
const client = new Client()
    .setEndpoint('https://cloud.appwrite.io/v1') // Your Appwrite endpoint
    .setProject('raktax0') // Your Appwrite project ID

export const account = new Account(client);
export const databases = new Databases(client);
