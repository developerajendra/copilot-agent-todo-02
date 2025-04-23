# GitHub Copilot Instructions

This document provides guidelines for effectively using GitHub Copilot in this React TypeScript project.

## General Usage

- Use descriptive variable and function names to help Copilot understand your intent
- Write clear comments before implementing new functionality
- Start typing the structure of what you want, and let Copilot complete it

## React Component Tips

- Start with a comment describing the component's purpose
- Define props interface/type before the component
- Let Copilot help with common React patterns like:
  - useState and useEffect hooks
  - Event handlers
  - Component lifecycle methods
  - Prop type definitions

## TypeScript Specific

- Write type annotations for better suggestions
- Use interfaces/types at the top of files
- Let Copilot help with type assertions and generics

## Testing

- Write test descriptions first
- Let Copilot generate test cases based on your comments
- Use descriptive test names that explain the expected behavior

## CSS/Tailwind

- Write comments describing the desired styling
- Let Copilot suggest Tailwind classes based on your needs
- Group related styles with comments

## Best Practices

1. Review all suggestions before accepting them
2. Break down complex functions into smaller, focused ones
3. Add JSDoc comments for better suggestions
4. Use TODO comments to mark areas needing attention

## Example Usage

```typescript
// Interface for user data
interface User {
  id: string;
  name: string;
  email: string;
}

// Component to display user information with edit capability
const UserProfile = ({ user }: { user: User }) => {
  // Your component code here
};
```

Remember that Copilot is a tool to enhance productivity, not replace careful code review and testing.
