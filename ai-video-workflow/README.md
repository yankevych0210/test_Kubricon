# AI Video Workflow Starter

This is a small Vue.js screen built as a practical assignment. It provides a highly polished, responsive UI to configure and initiate an AI-powered video generation workflow.

## Launch Instructions

To run this project locally, ensure you have Node.js installed, then follow these steps:

1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the development server:
   ```bash
   npm run dev
   ```
3. Open your browser and navigate to the local URL provided in the terminal (usually `http://localhost:5173`).

## Architecture & Decisions

### State Management
I chose to use Vue's native Composition API (`reactive`, `computed`) extracted into a dedicated composable (`useWorkflowForm.js`). 
- **Why?** For a single screen with moderate logic, introducing a full state management library like Pinia would be overkill. The composable pattern provides excellent separation of concerns, keeping the Vue component clean and strictly focused on UI presentation while maintaining the reactive state and business logic in an isolated, testable file.

### Future Extractions
If this task grew further into a full application:
1. **Forms**: The forms might become more complex. I would extract the validation logic into a more robust solution (like VeeValidate or Vuelidate) instead of a simple computed property.
2. **Components**: The generic UI components (`OptionSelector`, `PrimaryButton`, `TextAreaInput`) would be moved to a global `src/components/ui/` directory to be reused across multiple screens. 
3. **API Client**: The mock `submitForm` logic inside the composable would be extracted into a dedicated API service layer using `axios` or `fetch`, allowing the composable to focus purely on orchestration rather than HTTP details.
4. **State**: If the workflow state needed to be preserved across page navigations (e.g., leaving the workflow screen and coming back), I would graduate the state management from the local composable to a Pinia store.

### Edge Cases Considered
1. **Empty / Whitespace Prompt**: The prompt field validation ensures that strings containing only whitespace do not pass validation (`state.prompt.trim() !== ''`).
2. **Rapid Multi-Clicking**: The submit button is explicitly disabled while `status === 'loading'`, preventing the user from triggering multiple concurrent submit actions.
3. **Graceful Status Resets**: If the form previously succeeded or failed, clicking "Start Generation" again gracefully resets the status before attempting the next submission.
4. **Mobile Responsiveness**: The layout is fully fluid. Options dynamically stack, and padding adjusts intelligently to ensure a flawless experience on smartphones.

## AI Tools Note

- **Tools Used**: Cursor (Claude 3.5 Sonnet).
- **What it was used for**: I utilized Cursor primarily to speed up the scaffolding process, generate boilerplate Vue component structures (like `defineProps` and `defineEmits`), and rapidly iterate on the CSS styling (glassmorphism effects and transitions).
- **What it sped up**: It significantly reduced the time spent typing repetitive markup and standard CSS rules, allowing me to focus entirely on the application's architecture and logic.
- **What was verified manually**: I manually designed the state management approach (the composable pattern), wrote and verified the validation logic, implemented the mock async promise behavior, and thoroughly tested the responsive breakpoints across different screen sizes to ensure a premium UX.

---
*Created as part of the Frontend Vue Test Assignment.*
