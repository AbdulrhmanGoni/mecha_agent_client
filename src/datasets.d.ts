type Dataset = {
    id: string;
    title: string;
    description: string;
    createdAt: string;
    updatedAt: string;
};

type DatasetFullData = Dataset & { instructionsCount: number }

type Instruction = {
    id: string;
    prompt: string;
    response: string;
    createdAt: number;
    updatedAt: number;
};

type FormProps<FormDataT> = {
    formTitle: string;
    formTitleIcon: string,
    formDescription?: string;
    path: `/${string}`;
    method: HTTPRequestMethod;
    successStatusCode?: number;
    defaultValues?: FormDataT;
    resetFormAfterSubmit?: boolean;
    onSuccess?(res: unknown, formData: FormData);
    onError?(error: string);
    onFinally?();
    submitButtonText: string;
    submitButtonIcon: string;
}

type DatasetFormProps = FormProps<Pick<Dataset, 'title' | 'description'>>

type DatasetInstructionsFormProps = FormProps<Pick<Instruction, 'prompt' | 'response'>> & {
    mutateForm?(form: FormData): FormData;
}