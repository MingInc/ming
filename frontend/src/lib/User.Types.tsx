// src/types.ts

// Define the interface for User Metadata
export interface UserMetadata {
    createdAt: string;
    lastLoginAt: string;
    lastSignInTime: string;
    creationTime: string;
}

// Define the interface for Proactive Refresh
export interface ProactiveRefresh {
    user: any; // Define a more specific type if possible
    isRunning: boolean;
    timerId: number | null;
    errorBackoff: number;
}

// Define the interface for Provider Data
export interface ProviderData {
    // Define properties here based on the provider data structure
    // Example properties:
    providerId: string;
    uid: string;
    displayName?: string;
    email?: string;
    photoURL?: string;
}

// Define the interface for Reload User Info
export interface ReloadUserInfo {
    localId: string;
    email: string;
    displayName: string;
    photoUrl: string;
    emailVerified: boolean;
    // Add other properties if necessary
}

// Define the interface for STS Token Manager
export interface StsTokenManager {
    refreshToken: string;
    accessToken: string;
    expirationTime: number;
}

// Define the interface for Auth Implementation
export interface AuthImpl {
    app: any; // Define a more specific type if possible
    heartbeatServiceProvider: any; // Define a more specific type if possible
    appCheckServiceProvider: any; // Define a more specific type if possible
    config: any; // Define a more specific type if possible
    currentUser: User | null;
    // Define other properties if necessary
}

// Define the interface for User
export interface User {
    accessToken: string;
    auth: AuthImpl;
    displayName: string;
    email: string;
    emailVerified: boolean;
    isAnonymous: boolean;
    metadata: UserMetadata;
    phoneNumber: string | null;
    photoURL: string;
    proactiveRefresh: ProactiveRefresh;
    providerData: ProviderData[];
    providerId: string;
    reloadListener: any; // Define a more specific type if possible
    reloadUserInfo: ReloadUserInfo;
    stsTokenManager: StsTokenManager;
    tenantId: string | null;
    uid: string;
}
