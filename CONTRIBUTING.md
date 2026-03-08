# Contributing to json-toolkit-cli

Thank you for your interest in contributing! This guide will help you get started with developing and contributing to this project.

## How to Fork and Clone

1. **Fork the repository** by clicking the "Fork" button on the GitHub page
2. **Clone your fork** to your local machine:

```bash
git clone https://github.com/YOUR_USERNAME/json-toolkit-cli.git
cd json-toolkit-cli
```

3. **Add the upstream remote** (optional but recommended):

```bash
git remote add upstream https://github.com/theluckystrike/json-toolkit-cli.git
```

## Development Setup

### Prerequisites

- Node.js (LTS version recommended)
- npm

### Install Dependencies

```bash
npm install
```

### Build the Project

```bash
npm run build
```

### Run Tests

```bash
npm test
```

### Development Mode

For live compilation:

```bash
npm run dev
```

### Linting and Formatting

```bash
# Check code style
npm run lint

# Auto-fix linting issues
npm run lint:fix

# Format code
npm run format
```

## Code Style Guidelines

- **Language**: Write TypeScript. Avoid `any` types.
- **Testing**: Add tests for new features using Jest.
- **Formatting**: Run `npm run format` before committing.
- **Commits**: Keep commits atomic and descriptive. Use conventional commit messages:
  - `feat:` for new features
  - `fix:` for bug fixes
  - `docs:` for documentation changes
  - `test:` for adding/updating tests
  - `refactor:` for code refactoring
- **README**: Update the README if you add or change commands.

## How to Submit Pull Requests

1. **Create a feature branch** from the main branch:

```bash
git checkout -b feature/your-feature
# or
git checkout -b fix/bug-description
```

2. **Make your changes** and ensure all checks pass:

```bash
npm run build
npm test
npm run lint
npm run format
```

3. **Commit your changes**:

```bash
git add .
git commit -m "feat: describe your change"
```

4. **Push to your fork**:

```bash
git push origin feature/your-feature
```

5. **Open a Pull Request** on GitHub with:
   - A clear title and description
   - Reference to any related issues
   - Screenshots or examples if applicable

## Issue Reporting Guidelines

When reporting issues, please include:

- **Search** existing issues before creating a new one
- **Use issue templates** for bugs and feature requests
- **For bugs**: Include reproduction steps, expected behavior, and environment details (Node.js version, OS, etc.)
- **For features**: Describe the use case and proposed implementation

## Code of Conduct

Be respectful and constructive. We are all here to build useful tools.

---

Built at [zovo.one](https://zovo.one) by [theluckystrike](https://github.com/theluckystrike)
