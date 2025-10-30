type User = {
    name: string;
    email: string;
    avatar?: string;
    lastSignIn: string;
    agentsCount: number;
    publishedAgents: number;
    apiKeysCount: number;
    datasetsCount: number;
    signingMethod: string;
    todayInference: {
        current: number | string,
        max: number | string,
    };
    subscription?: {
        status: string;
        subscriptionId: string;
        planName: Plan["planName"];
        priceId: string;
        currentPeriodEnd: number;
        currentPeriodStart: number;
        cancelAtPeriodEnd: boolean;
        paymentMethod: {
            brand: string;
            last4: string;
        };
    }
    lastWeekInferences: (number | string)[];
}

type HTTPRequestMethod = "GET" | "POST" | "DELETE" | "PATCH";

type SubmitFormEvent = SubmitEvent & { currentTarget: EventTarget & HTMLFormElement };

type ButtonEvent = MouseEvent & { currentTarget: EventTarget & HTMLButtonElement };

type CustomButtonProps = import("svelte/elements").HTMLButtonAttributes & {
    size?: 'sm' | 'md' | 'lg';
};

type Plan = {
    planName: "Free" | "Pro"
    maxPublishedAgentsCount: number,
    maxInferencesPerDay: number,
    subscriptionCostPerMonth: number,
}

type EmailVerificationPurpose = "sign-up" | "reset-password"

type UserPasswordFormValues = {
    currentPassword: string;
    newPassword: string;
    confirmedPassword: string;
};