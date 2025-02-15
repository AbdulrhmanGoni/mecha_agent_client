type User = {
    name: string;
    email: string;
    avatar?: string;
}

type HTTPRequestMethod = "GET" | "POST" | "DELETE" | "PATCH";

type SubmitFormEvent = SubmitEvent & { currentTarget: EventTarget & HTMLFormElement };

type ButtonEvent = MouseEvent & { currentTarget: EventTarget & HTMLButtonElement };

type CustomButtonProps = import("svelte/elements").HTMLButtonAttributes & {
    size?: 'sm' | 'md' | 'lg';
};
