# Contributing to json-toolkit-cli

Contributions are welcome. Here is how to get started.


SETUP

1. Fork the repo on GitHub
2. Clone your fork

```bash
git clone https://github.com/YOUR_USERNAME/json-toolkit-cli.git
cd json-toolkit-cli
npm install
```

3. Create a feature branch

```bash
git checkout -b feature/your-feature
```

4. Make your changes, then run checks

```bash
npm run build
npm test
npm run lint
```

5. Commit, push, and open a Pull Request

```bash
git commit -m "feat: describe your change"
git push origin feature/your-feature
```


GUIDELINES

- Write TypeScript. Avoid `any` types.
- Add tests for new features.
- Follow existing code style. Run `npm run format` before committing.
- Keep commits atomic and descriptive.
- Update the README if you add or change commands.


REPORTING ISSUES

- Use the issue templates for bugs and feature requests.
- Search existing issues before creating new ones.
- Include reproduction steps and environment details for bugs.


CODE OF CONDUCT

Be respectful and constructive. We are all here to build useful tools.


Built by [theluckystrike](https://github.com/theluckystrike) | [zovo.one](https://zovo.one)
