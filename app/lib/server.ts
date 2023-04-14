import { GPT4All } from "gpt4all";
 // Instantiate GPT4All with default or custom settings
const gpt4all = new GPT4All('gpt4all-lora-quantized', true); // Default is 'gpt4all-lora-quantized' model

type getAnswerFromGptAllProps = {
    gptPrompt: string;
}

export const getAnswerFromGptAll = async ({gptPrompt}:getAnswerFromGptAllProps) => {


    // Initialize and download missing files
    await gpt4all.init();

    // Open the connection with the model
    await gpt4all.open();
    // Generate a response using a prompt
    try{
        const response = await gpt4all.prompt(gptPrompt);
                        await gpt4all.close();
        return response;
    }catch(err){
        return err;
    }

}

export const closeGptAll = async () => {
    // Close the connection with the model
    await gpt4all.close();

}