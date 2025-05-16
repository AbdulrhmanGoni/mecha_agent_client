type User = {
    name: string;
    email: string;
    avatar?: string;
    lastSignIn: string;
    agentsCount: number;
    apiKeysCount: number;
    currentPlan: Plan["planName"];
}

type HTTPRequestMethod = "GET" | "POST" | "DELETE" | "PATCH";

type SubmitFormEvent = SubmitEvent & { currentTarget: EventTarget & HTMLFormElement };

type ButtonEvent = MouseEvent & { currentTarget: EventTarget & HTMLButtonElement };

type CustomButtonProps = import("svelte/elements").HTMLButtonAttributes & {
    size?: 'sm' | 'md' | 'lg';
};

type Plan = {
    planName: "Free" | "Pro"
    maxAgentsCount: number,
    maxApiKeysCount: number,
    maxInferencesPerDay: number,
    subscriptionCostPerMonth: number,
}
