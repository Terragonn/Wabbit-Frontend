import { useEffect, useState } from "react";

export function useVaultInputFeedback(onChange: (num: number) => void, defaultValue?: number) {
    const [feedbackInput, setFeedbackInput] = useState<number | undefined>(defaultValue);
    const [feedbackOutput, setFeedbackOutput] = useState<number | undefined>(defaultValue);

    // **** Now how do I integrate this with the hooks from the previous section ?

    useEffect(() => {
        onChange(feedbackInput ? feedbackInput : 0);
        setFeedbackOutput(feedbackInput);
    }, [feedbackInput]);

    useEffect(() => {
        onChange(defaultValue ? defaultValue : 0);
        setFeedbackOutput(feedbackInput);
    }, [defaultValue]);

    return { setFeedbackInput, feedbackOutput };
}
