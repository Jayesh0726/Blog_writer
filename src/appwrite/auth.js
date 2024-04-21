import conf from '../conf/conf.js';
import { Client, Account, ID } from "appwrite";

const DEFAULT_PROFILE_IMAGE_URL = '../accountLogo.jpeg'; // Replace with your default image URL

export class AuthService {
    client = new Client();
    account;

    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);
        this.account = new Account(this.client);
            
    }

    async createAccount({email, password, name}) {
        try {
            const userAccount = await this.account.create(ID.unique(), email, password, name);
            if (userAccount) {
                // Set default profile image
                await this.updateProfileImage(DEFAULT_PROFILE_IMAGE_URL);
                // call another method
                return this.login({email, password});
            } else {
               return  userAccount;
            }
        } catch (error) {
            throw error;
        }
    }
    async updateProfileImage(imageUrl) {
        try {
            // Use the update method to set the user's profile image
            await this.account.update({
                name: this.account.getName(),
                // Add other profile information as needed
                // ...
                // Set the profile image
                photoURL: imageUrl,
            });
        } catch (error) {
            console.log("Appwrite service :: updateProfileImage :: error", error);
        }
    }
    
    async login({email, password}) {
        try {
            return await this.account.createEmailSession(email, password);
        } catch (error) {
            throw error;
        }
    }

    async getCurrentUser() {
        try {
            return await this.account.get();
        } catch (error) {
            console.log("Appwrite serive :: getCurrentUser :: error", error);
        }

        return null;
    }

    async logout() {

        try {
            await this.account.deleteSessions();
        } catch (error) {
            console.log("Appwrite serive :: logout :: error", error);
        }
    }
}

const authService = new AuthService();

export default authService


