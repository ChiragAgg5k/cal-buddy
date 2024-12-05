# Contributing to Our Next.js Project

Thank you for your interest in contributing to our project! This document provides guidelines and instructions for contributing.

## Getting Started

1. **Fork the repository**
2. **Clone your fork**

   ```
   git clone https://github.com/'your username'/cal-buddy
   cd cal-buddy
   ```

3. **Set up envrionment variables**

   Create a `.env.local` file in the root directory and add the following content:

   ```
   GROQ_API_KEY=<GROQ_API_KEY>
   NEXT_PUBLIC_GOOGLE_CALENDAR_API_KEY=<GOOGLE_CALENDAR_API_KEY>
   NEXT_PUBLIC_APPWRITE_PROJECT_ID=<APPWRITE_PROJECT_ID>
   ```

   Replace `<GROQ_API_KEY>`, `<GOOGLE_CALENDAR_API_KEY>`, `<APPWRITE_PROJECT_ID>`, and `<SITE_URL>` with your actual values.

4. **Install dependencies**

   ```
   pnpm install
   ```

## Development Workflow

1. **Create a new branch**

   ```
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes**

   - Write clean, maintainable code
   - Follow our coding standards (see below)
   - Update documentation as needed

3. **Start the development server**
   ```
   pnpm dev
   ```

## Coding Standards

- Use TypeScript for all new code
- Follow the existing code style
- Use meaningful variable and function names
- Add comments for complex logic
- Keep components small and focused

## Commit Guidelines

- Use clear, descriptive commit messages
- Begin with a verb in the present tense (e.g., "Add feature" not "Added feature")
- Reference issue numbers when applicable

## Pull Request Process

1. Update the README.md with details of changes if applicable
2. Ensure all tests pass
3. Update documentation if needed
4. Request review from maintainers
5. Merge after approval

## Code Review

- All submissions require review
- We may suggest changes or improvements
- The review process helps maintain code quality

## Questions?

If you have questions, feel free to open an issue or reach out to the maintainers.

Thank you for contributing!
