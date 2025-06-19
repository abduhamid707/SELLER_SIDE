export const MYID_CONFIG = {
    clientId: process.env.NEXT_PUBLIC_MYID_CLIENT_ID!,
    clientSecretHash: process.env.NEXT_PUBLIC_MYID_CLIENT_SECRET_HASH!,
    environment: process.env.NEXT_PUBLIC_MYID_ENVIRONMENT || "SANDBOX",
};
