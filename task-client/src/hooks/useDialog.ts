import { Dialog } from '@capacitor/dialog';

const showPrompt = async (title: string, message: string) => {
    const { value } = await Dialog.prompt({
        title,
        message,
    });

    return value;
};

export function useDialog() {
    return {
        showPrompt
    }
}