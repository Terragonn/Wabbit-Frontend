import { useEffect, useState } from "react";

export function useVaultInput(onChangeInput: (num: number) => void, onChangeDefaultValue?: (num: number) => void, defaultValue?: number) {
    const [feedbackInput, setFeedbackInput] = useState<number | undefined>(defaultValue);
    const [feedbackOutput, setFeedbackOutput] = useState<number | undefined>(defaultValue);

    useEffect(() => {
        onChangeInput(feedbackInput ? feedbackInput : 0);
        setFeedbackOutput(feedbackInput);
    }, [feedbackInput]);

    useEffect(() => {
        onChangeDefaultValue && onChangeDefaultValue(defaultValue ? defaultValue : 0);
        setFeedbackOutput(feedbackInput);
    }, [defaultValue]);

    return { setFeedbackInput, feedbackOutput };
}
