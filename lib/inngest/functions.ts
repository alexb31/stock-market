import { model } from "mongoose";
import { inngest } from "./client";
import { PERSONALIZED_WELCOME_EMAIL_PROMPT } from "./prompts"
import { sendWelcomeEmail } from "../nodemailer";

export const sendSignUpEmail = inngest.createFunction(
    { id: 'sign-up-email' },
    { event: 'app/user.created' },
    async ({ event, step }: { event: any; step: any }) => {
        const userProfile = `
        - Country: ${event.data.country || 'N/A'}
        - Investment goals: ${event.data.investmentGoals || 'N/A'}
        - Risk tolerance: ${event.data.riskTolerance || 'N/A'}
        - Preferred industry: ${event.data.preferredIndustry || 'N/A'}
        `

        const prompt = PERSONALIZED_WELCOME_EMAIL_PROMPT.replace('{{userProfile}}', userProfile)

        const response = await step.ai.infer('generate-welcome-intro', {
            model: step.ai.models.gemini({ model: 'gemini-2.5-flash-lite' }),
            body: {
                contents: [{ role: 'user', parts: [{ text: prompt }] }],
            }
        });

        await step.run('send-welcome-email', async () => {
            const part = response.candidates?.[0]?.content?.parts?.[0];
            const introText = (part && 'text' in part ? part.text : null) || "Welcome to Stock-market! We're excited to have you on board.";

            const { data: { email, name } } = event;
            return await sendWelcomeEmail({ email, name, intro: introText });
        });

        return {
            success: true,
            message: 'Welcome email process initiated'
        };
    }
)