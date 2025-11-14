# CLAUDE.md - AI Assistant Guide for HTML-CSS-JavaScript-study

This document provides comprehensive guidance for AI assistants working with this repository.

## 📋 Repository Overview

### Purpose
This is an **educational resource repository** focused on modern frontend development (HTML, CSS, and JavaScript). It serves as a comprehensive learning guide for beginners to intermediate developers.

### Target Audience
- Beginners starting with frontend development
- Developers who understand basic HTML/CSS/JavaScript but want to learn modern practices
- Learners seeking practical, production-ready frontend skills

### Key Characteristics
- **Language**: All content is in Japanese (日本語)
- **Browser Target**: iOS Safari 15+ (2024+ modern web standards)
- **Focus Areas**: Accessibility, Performance, Modern APIs, Semantic HTML
- **Based On**: The Zenn article "令和のHTML / CSS / JavaScriptの書き方50選"
- **No Build System**: Pure HTML/CSS/JS examples, no package.json or build tools

---

## 📁 Repository Structure

```
HTML-CSS-JavaScript-study/
├── README.md                    # Main entry point with overview and learning paths
├── CLAUDE.md                    # This file - AI assistant guide
├── HTML/                        # HTML learning materials (5 chapters)
│   ├── README.md               # HTML guide overview
│   ├── 01_基礎/                # Basics
│   ├── 02_セマンティックHTML/   # Semantic HTML (details, dialog, hgroup, search)
│   ├── 03_画像最適化/          # Image optimization
│   ├── 04_アクセシビリティ/     # Accessibility
│   └── 05_パフォーマンス/       # Performance
├── CSS/                         # CSS learning materials (6 chapters)
│   ├── README.md               # CSS guide overview
│   ├── 01_セレクタ/            # Modern selectors (:has, :is, :where)
│   ├── 02_レイアウト/          # Layout (Grid, Subgrid)
│   ├── 03_視覚効果/            # Visual effects (filter, blend-mode)
│   ├── 04_モダンプロパティ/     # Modern properties (clamp, viewport units)
│   ├── 05_アクセシビリティ/     # CSS accessibility
│   └── 06_実装パターン/        # Implementation patterns
├── JavaScript/                  # JavaScript learning materials (4 chapters)
│   ├── README.md               # JavaScript guide overview
│   ├── 01_基礎/                # Fundamentals (defer/async, modules, ES6)
│   ├── 02_非同期処理/          # Async processing
│   ├── 03_パフォーマンス最適化/ # Performance optimization
│   └── 04_ブラウザAPI/         # Browser APIs
└── examples/                    # Practical implementation samples
    └── HTML/                    # HTML examples
        ├── accordion/           # Accordion using <details>
        └── modal/              # Modal using <dialog>
```

### File Statistics
- **Total Files**: ~50
- **Markdown Files**: ~39 (documentation)
- **HTML Files**: ~7 (examples)
- **CSS Files**: ~2 (example styles)
- **JavaScript Files**: ~1 (example scripts)

---

## 🎯 Content Organization Patterns

### Naming Conventions

1. **Directory Naming**: `[Number]_[Japanese Topic Name]/`
   - Examples: `01_基礎/`, `02_セマンティックHTML/`, `03_画像最適化/`
   - Always use Japanese for topic names
   - Number prefix indicates suggested learning order

2. **File Naming**:
   - README files in each directory provide overview
   - Individual topic files: `01-topic-name.md`, `02-another-topic.md`
   - Use kebab-case for file names
   - Use Japanese or English depending on context

3. **Example Files**:
   - Located in `examples/[Technology]/[Component]/`
   - Standard files: `index.html`, `style.css`, `script.js`

### Documentation Structure Pattern

Each learning section follows this consistent pattern:

```markdown
# [Section Title in Japanese]

## 概要 (Overview)
Brief explanation of what this is and why it matters

## なぜ[Topic]が重要なのか (Why this matters)
Benefits and use cases

## 基本構文 (Basic syntax)
```language
code example
```

## 実践的な活用例 (Practical examples)
Real-world usage patterns

## ブラウザサポート (Browser support)
Compatibility information

## 参考リンク (Reference links)
MDN and other resources
```

### Progressive Learning Structure

Content is organized in three difficulty levels:

**Level 1 (初学者 - Beginner)**:
- HTML basics
- Semantic HTML
- CSS selectors
- JavaScript fundamentals

**Level 2 (中級者 - Intermediate)**:
- CSS layouts
- JavaScript async processing
- Image optimization
- Applying to real projects

**Level 3 (上級者 - Advanced)**:
- JavaScript performance optimization
- Browser APIs
- Combining all best practices
- Performance tuning

---

## 💻 Code Conventions

### HTML Code Style

**Key Principles:**
1. **Semantic HTML First**: Always use semantic elements over divs
2. **Accessibility by Default**: Include ARIA attributes where needed
3. **Japanese Language Attributes**: `lang="ja"` on html elements
4. **UTF-8 Encoding**: Always use `<meta charset="UTF-8">`

**Example Pattern:**
```html
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>[Descriptive Japanese Title]</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <!-- Semantic structure -->
  <main>
    <section>
      <h2>[Japanese Heading]</h2>
      <!-- Content with accessibility attributes -->
    </section>
  </main>

  <script src="script.js"></script>
</body>
</html>
```

**Accessibility Requirements:**
- Use `aria-label`, `aria-labelledby`, `aria-describedby` for modals/dialogs
- Include `aria-hidden="true"` for decorative elements
- Proper heading hierarchy (h1 → h2 → h3)
- Associate labels with form inputs

### CSS Code Style

**Key Principles:**
1. **Modern Selectors**: Use `:has()`, `:is()`, `:where()` where appropriate
2. **Grid Over Float**: Prefer CSS Grid and Flexbox
3. **Custom Properties**: Use CSS variables for theming
4. **Responsive by Default**: Use `clamp()`, modern viewport units (svh, dvh, lvh)
5. **Accessibility-First**: Include `prefers-reduced-motion` queries

**Example Pattern:**
```css
/* Modern selectors for cleaner code */
:is(h1, h2, h3, h4) {
  color: var(--heading-color);
}

/* Grid layouts */
.container {
  display: grid;
  gap: 20px;
}

/* Responsive without media queries */
.element {
  font-size: clamp(1rem, 2vw, 1.5rem);
}

/* Accessibility considerations */
@media (prefers-reduced-motion: reduce) {
  * {
    animation: none !important;
  }
}
```

### JavaScript Code Style

**Key Principles:**
1. **ES6+ Syntax**: Use modern JavaScript (const/let, arrow functions, classes)
2. **Class-Based Organization**: For components, use ES6 classes
3. **Descriptive Names**: Use clear, intention-revealing names
4. **Comments in Japanese**: Code comments should be in Japanese
5. **Event Delegation**: Where appropriate

**Example Pattern:**
```javascript
class ComponentManager {
  constructor(element) {
    this.element = element;
    this.init();
  }

  init() {
    // イベントリスナーの設定
    this.element.addEventListener('click', (e) => {
      this.handleClick(e);
    });
  }

  handleClick(event) {
    // 処理の実装
  }
}

// 初期化
const elements = document.querySelectorAll('.component');
elements.forEach(element => {
  new ComponentManager(element);
});
```

---

## 📝 Documentation Writing Guidelines

### Language and Tone

1. **Primary Language**: Japanese (日本語)
2. **Tone**: Educational, friendly, encouraging
3. **Technical Terms**: Use Japanese with English in parentheses on first use
   - Example: "セマンティック（意味的な）HTML"
4. **Code Comments**: Japanese for explanations, English for technical terms

### Content Structure Requirements

Every major section should include:

1. **概要 (Overview)**: What is this and why does it matter?
2. **実践例 (Practical Examples)**: Real-world code samples
3. **ブラウザサポート (Browser Support)**: Compatibility information
4. **チェックリスト (Checklist)**: Learning checkboxes
5. **参考リンク (Reference Links)**: MDN and other resources

### Markdown Formatting Standards

```markdown
# Main Heading (H1 - Section Title)

## Sub Heading (H2 - Major Topics)

### Detail Heading (H3 - Subtopics)

**Bold** for emphasis
*Italic* for technical terms
`code` for inline code
```language for code blocks

- Bullet lists for features
1. Numbered lists for steps
> Blockquotes for important notes

| Tables | For | Comparisons |
```

### Code Block Guidelines

1. **Always Specify Language**: Use language tags for syntax highlighting
2. **Include Comments**: Explain complex parts in Japanese
3. **Show Complete Examples**: Not just snippets, but working code
4. **Good/Bad Examples**: Use ✅/❌ to show correct vs incorrect patterns

```markdown
### ✅ 正しい例 (Correct)
```html
<nav aria-label="メインナビゲーション">
  <ul>
    <li><a href="/">ホーム</a></li>
  </ul>
</nav>
```

### ❌ 間違った例 (Incorrect)
```html
<div class="nav">
  <div class="nav-item">ホーム</div>
</div>
```
```

---

## 🔧 Development Workflows

### When Adding New Content

1. **Maintain Consistency**: Follow existing patterns
2. **Update Parent READMEs**: Add links to new content in section READMEs
3. **Include Browser Support**: Always mention compatibility
4. **Add to Main README**: Update main README.md if adding major sections
5. **Create Examples**: Practical code examples in `/examples/` if applicable

### File Creation Checklist

When creating new learning materials:

- [ ] File follows naming convention (`[number]-topic-name.md`)
- [ ] Placed in correct directory (`HTML/`, `CSS/`, or `JavaScript/`)
- [ ] Includes all required sections (概要, 実践例, ブラウザサポート, etc.)
- [ ] Code examples are complete and tested
- [ ] Accessibility considerations included
- [ ] Browser support information provided
- [ ] Reference links to MDN or official docs
- [ ] Parent README.md updated with link to new content
- [ ] Japanese language throughout (unless code)

### Example Creation Checklist

When creating practical examples:

- [ ] Located in `/examples/[Technology]/[component-name]/`
- [ ] Includes `index.html`, `style.css`, and `script.js` (if needed)
- [ ] HTML includes proper `lang="ja"` and meta tags
- [ ] Code follows repository conventions
- [ ] Includes accessibility features (ARIA, semantic HTML)
- [ ] Comments in Japanese explaining key parts
- [ ] Demonstrates modern best practices
- [ ] Works without external dependencies

---

## 🎨 Key Principles and Best Practices

### Core Values of This Repository

1. **Accessibility First**
   - Every example should be accessible
   - Include ARIA attributes where appropriate
   - Consider screen readers and keyboard navigation
   - Use semantic HTML

2. **Modern Standards**
   - Target iOS Safari 15+ (2024+ standards)
   - Use modern APIs and features
   - Avoid deprecated practices
   - Progressive enhancement approach

3. **Performance Conscious**
   - Optimize images (lazy loading, picture element)
   - Defer/async script loading
   - CSS performance (avoid expensive selectors)
   - Debounce and throttle where needed

4. **Educational Focus**
   - Explain WHY, not just WHAT
   - Show both good and bad examples
   - Include learning checklists
   - Progressive difficulty levels

5. **Practical Application**
   - Real-world examples
   - Production-ready patterns
   - Not just theory, but practice
   - Examples can be copied and used

### Common Patterns to Follow

**When Explaining New Concepts:**
1. Start with "なぜ...が重要なのか" (Why this matters)
2. Show basic syntax first
3. Provide practical examples
4. Compare with old/wrong approaches
5. Include browser support info
6. Link to official documentation

**When Writing Code Examples:**
1. Complete, working code (not fragments)
2. Include all necessary HTML structure
3. Add Japanese comments for clarity
4. Show both HTML, CSS, and JS when needed
5. Demonstrate accessibility features
6. Use modern best practices

---

## 🚫 What NOT to Do

### Content Guidelines - Don'ts

1. **Don't Add Build Tools**
   - No package.json or npm dependencies
   - No webpack, vite, or bundlers
   - Keep examples pure HTML/CSS/JS

2. **Don't Use English for Documentation**
   - Main content should be in Japanese
   - Code can use English variable names
   - Comments should be in Japanese

3. **Don't Skip Accessibility**
   - Never create examples without accessibility
   - Always include proper ARIA attributes
   - Consider screen readers

4. **Don't Use Outdated Practices**
   - Avoid jQuery or old libraries
   - Don't use `var`, use `const`/`let`
   - No inline styles in examples
   - Avoid float-based layouts

5. **Don't Create Incomplete Examples**
   - Examples should be self-contained
   - Include all necessary files
   - Test that code actually works

6. **Don't Ignore Browser Support**
   - Always mention compatibility
   - Link to Can I Use for new features
   - Note when features require polyfills

### Code Anti-Patterns to Avoid

```javascript
// ❌ Don't use var
var x = 10;

// ✅ Use const/let
const x = 10;

// ❌ Don't use old-style functions unnecessarily
function() { return x; }

// ✅ Use arrow functions
() => x

// ❌ Don't use non-semantic divs
<div class="button">Click</div>

// ✅ Use proper elements
<button type="button">Click</button>
```

---

## 🤖 AI Assistant Specific Guidelines

### When Analyzing This Repository

1. **Understand the Educational Context**
   - This is a learning resource, not a production application
   - Focus on teaching concepts clearly
   - Examples should be didactic, not necessarily production-scale

2. **Respect the Japanese Language**
   - Don't translate documentation to English
   - Maintain Japanese for all user-facing content
   - Code comments should remain in Japanese

3. **Preserve the Structure**
   - Don't reorganize the directory structure
   - Maintain the numbered ordering system
   - Keep the progressive learning path intact

### When Asked to Add Content

1. **Match Existing Patterns**
   - Study similar sections before creating new ones
   - Follow the established documentation structure
   - Use the same heading patterns (概要, 実践例, etc.)

2. **Update Navigation**
   - Add links in parent README files
   - Update the main README.md learning paths
   - Maintain the table of contents

3. **Include All Sections**
   - Don't skip browser support information
   - Always include practical examples
   - Add reference links to MDN
   - Create learning checklists

4. **Test Your Code**
   - Ensure examples are complete and working
   - Verify HTML validates
   - Check accessibility with screen readers
   - Test in modern browsers

### When Asked to Modify Content

1. **Understand the Learning Path**
   - Changes should enhance educational value
   - Don't make content more complex than necessary
   - Maintain the beginner-to-advanced progression

2. **Preserve Japanese Content**
   - Don't translate unless explicitly asked
   - Keep technical explanations in Japanese
   - Maintain the friendly, educational tone

3. **Update Related Files**
   - If you change a section, update its README
   - Update parent navigation if needed
   - Keep cross-references accurate

### When Providing Answers About This Repository

1. **Reference Specific Files**
   - Use the pattern `file_path:line_number` for references
   - Point to relevant examples in `/examples/`
   - Link to specific README sections

2. **Explain the Structure**
   - Help users understand the learning path
   - Explain the progressive difficulty system
   - Show how sections relate to each other

3. **Suggest Learning Paths**
   - Guide based on user's skill level
   - Recommend starting with Level 1 content
   - Suggest practical projects to apply knowledge

---

## 📚 Common Tasks and How to Handle Them

### Task: Add a New HTML Technique

1. Determine which category: 基礎, セマンティックHTML, 画像最適化, アクセシビリティ, or パフォーマンス
2. Create a new `.md` file in appropriate directory
3. Follow the documentation pattern:
   - 概要 (Overview)
   - なぜ重要なのか (Why it matters)
   - 基本構文 (Basic syntax)
   - 実践例 (Practical examples)
   - ブラウザサポート (Browser support)
   - 参考リンク (References)
4. Update the section's README.md with link to new content
5. Consider if main README.md needs updating

### Task: Add a New CSS Example

1. Choose appropriate category (セレクタ, レイアウト, 視覚効果, etc.)
2. Create example in `/examples/CSS/[component-name]/`
3. Include `index.html`, `style.css`
4. Add Japanese comments explaining the technique
5. Document the example in the relevant section's markdown
6. Show browser support for any modern CSS features

### Task: Add a New JavaScript Example

1. Choose category (基礎, 非同期処理, パフォーマンス最適化, ブラウザAPI)
2. Create example in `/examples/JavaScript/[feature-name]/`
3. Use ES6+ class-based structure
4. Include proper error handling
5. Add Japanese comments
6. Document async/await patterns if applicable
7. Note browser compatibility

### Task: Update Browser Support Information

1. Check Can I Use (caniuse.com) for latest data
2. Update the ブラウザサポート section
3. Use this format:
   ```markdown
   - ✅ Chrome XX+
   - ✅ Edge XX+
   - ✅ Safari XX+
   - ✅ Firefox XX+
   - ❌ IE (not supported)
   ```
4. Include note about iOS Safari 15+ baseline

### Task: Fix Accessibility Issues

1. Check for proper ARIA attributes
2. Verify semantic HTML usage
3. Ensure keyboard navigation works
4. Add screen reader considerations
5. Include `prefers-reduced-motion` for animations
6. Document accessibility features in comments

---

## 🔗 Important External Resources

When adding content, reference these authoritative sources:

1. **MDN Web Docs (Japanese)**: https://developer.mozilla.org/ja/
   - Primary reference for HTML/CSS/JavaScript
   - Always link to Japanese version when available

2. **Can I Use**: https://caniuse.com/
   - Browser support information
   - Check before recommending new features

3. **WCAG Guidelines**: https://www.w3.org/WAI/WCAG21/quickref/
   - Accessibility standards
   - Reference for a11y best practices

4. **Web.dev**: https://web.dev/
   - Performance best practices
   - Modern web development patterns

5. **Original Article**: https://zenn.dev/necscat/articles/bc9bba54babaf5
   - Source inspiration for this repository
   - Reference for the "50 modern practices" approach

---

## 🎓 Understanding the Teaching Philosophy

This repository follows specific pedagogical principles:

### 1. Progressive Disclosure
- Start simple, add complexity gradually
- Level 1 → Level 2 → Level 3 progression
- Don't overwhelm beginners

### 2. Show, Don't Just Tell
- Always include practical examples
- Complete, working code
- Real-world use cases

### 3. Explain the "Why"
- Not just "how to do it"
- But "why we do it this way"
- Context and reasoning matter

### 4. Contrast Learning
- Show both ✅ correct and ❌ incorrect approaches
- Explain what makes something better
- Compare old vs. new methods

### 5. Accessibility is Not Optional
- Build it in from the start
- Every example is accessible
- Teach good habits from day one

### 6. Modern, Not Bleeding Edge
- Focus on widely supported features (iOS Safari 15+)
- Avoid experimental APIs
- Production-ready techniques

---

## 🔄 Git Workflow for This Repository

### Branch Strategy
- Main branch contains stable content
- Feature branches for new content (pattern: `claude/topic-name-[session-id]`)
- All development on designated feature branches

### Commit Message Pattern

```
[Category] Brief description in Japanese

Examples:
- HTML: Details要素の説明を追加
- CSS: Gridレイアウトのサンプルコードを更新
- JavaScript: async/awaitの実践例を追加
- Examples: モーダルコンポーネントを実装
- Docs: READMEの学習パスを更新
```

### When Creating Pull Requests

1. **Title**: Clear, descriptive (Japanese or English)
2. **Summary**: Bullet points of changes
3. **Test Plan**: How changes were verified
4. **Screenshots**: If visual changes

---

## ✅ Final Checklist for AI Assistants

Before completing any task in this repository, verify:

- [ ] All content is in Japanese (except code)
- [ ] Code follows ES6+ modern JavaScript
- [ ] HTML uses semantic elements
- [ ] CSS uses modern selectors and properties
- [ ] Accessibility features included (ARIA, semantic HTML)
- [ ] Browser support information provided
- [ ] Examples are complete and tested
- [ ] Comments are in Japanese
- [ ] Documentation follows established patterns
- [ ] Parent README files updated if needed
- [ ] Main README updated if major changes
- [ ] No build tools or dependencies added
- [ ] File naming conventions followed
- [ ] Progressive learning structure maintained

---

## 📞 Summary for Quick Reference

**Repository Type**: Educational resource for modern frontend development
**Language**: Japanese (日本語)
**Target**: iOS Safari 15+ / Modern browsers (2024+)
**Structure**: HTML/ CSS/ JavaScript/ examples/
**Pattern**: Numbered directories, progressive difficulty
**Focus**: Accessibility, Performance, Modern APIs, Semantic HTML
**Build**: None - pure HTML/CSS/JS
**Documentation**: Markdown with specific sections (概要, 実践例, ブラウザサポート, etc.)
**Code Style**: ES6+ classes, semantic HTML, modern CSS

**Key Principle**: Teach modern web development with accessibility first, using practical, production-ready examples.

---

*This guide should be updated as the repository evolves. Last updated: 2025-11-14*
