'use server';
/**
 * @fileOverview An AI agent that detects stock anomalies in daily reports.
 *
 * - detectStockAnomalies - A function that handles the stock anomaly detection process.
 * - DetectStockAnomaliesInput - The input type for the detectStockAnomalies function.
 * - DetectStockAnomaliesOutput - The return type for the detectStockAnomalies function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const DetectStockAnomaliesInputSchema = z.object({
  reportData: z.string().describe('The daily stock report data as a JSON string.'),
});
export type DetectStockAnomaliesInput = z.infer<typeof DetectStockAnomaliesInputSchema>;

const DetectStockAnomaliesOutputSchema = z.object({
  anomalies: z
    .array(z.string())
    .describe('A list of anomalies found in the stock report.'),
  summary: z.string().describe('A summary of the detected anomalies.'),
});
export type DetectStockAnomaliesOutput = z.infer<typeof DetectStockAnomaliesOutputSchema>;

export async function detectStockAnomalies(input: DetectStockAnomaliesInput): Promise<DetectStockAnomaliesOutput> {
  return detectStockAnomaliesFlow(input);
}

const prompt = ai.definePrompt({
  name: 'detectStockAnomaliesPrompt',
  input: {schema: DetectStockAnomaliesInputSchema},
  output: {schema: DetectStockAnomaliesOutputSchema},
  prompt: `You are an expert inventory analyst.

You are provided with a daily stock report in JSON format. Your task is to identify any unusual stock levels that could indicate overstocking or shortages.

Report Data: {{{reportData}}}

Based on the report data, identify any anomalies in stock levels and provide a summary of these anomalies.

Output a list of the identified anomalies and a summary of the anomalies. For each anomaly, you must mention which products has unusual stock levels.
`,
});

const detectStockAnomaliesFlow = ai.defineFlow(
  {
    name: 'detectStockAnomaliesFlow',
    inputSchema: DetectStockAnomaliesInputSchema,
    outputSchema: DetectStockAnomaliesOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
