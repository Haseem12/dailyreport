// use server'

/**
 * @fileOverview This file defines a Genkit flow for generating a summary of key insights from a filtered stock report.
 *
 * The flow takes a report as input and returns a summarized analysis of trends and issues.
 * - generateReportSummary - A function that generates a summary of key insights from a filtered report.
 * - GenerateReportSummaryInput - The input type for the generateReportSummary function.
 * - GenerateReportSummaryOutput - The return type for the generateReportSummary function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateReportSummaryInputSchema = z.string().describe('The filtered report data as a string.');
export type GenerateReportSummaryInput = z.infer<typeof GenerateReportSummaryInputSchema>;

const GenerateReportSummaryOutputSchema = z.string().describe('A summarized analysis of the key insights from the report.');
export type GenerateReportSummaryOutput = z.infer<typeof GenerateReportSummaryOutputSchema>;

export async function generateReportSummary(input: GenerateReportSummaryInput): Promise<GenerateReportSummaryOutput> {
  return generateReportSummaryFlow(input);
}

const generateReportSummaryPrompt = ai.definePrompt({
  name: 'generateReportSummaryPrompt',
  input: {schema: GenerateReportSummaryInputSchema},
  output: {schema: GenerateReportSummaryOutputSchema},
  prompt: `You are an expert marketing analyst.

  Analyze the following stock report and summarize the key insights, trends, and potential issues for the marketing department.

  Report:
  {{reportData}}
  `,
});

const generateReportSummaryFlow = ai.defineFlow(
  {
    name: 'generateReportSummaryFlow',
    inputSchema: GenerateReportSummaryInputSchema,
    outputSchema: GenerateReportSummaryOutputSchema,
  },
  async input => {
    const {output} = await generateReportSummaryPrompt({reportData: input});
    return output!;
  }
);
