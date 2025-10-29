# LabelContainer
![test_workflow](https://github.com/nordic96/LabelContainer/actions/workflows/npm_install_test.yml/badge.svg)
![npm_github_publish_workflow](https://github.com/nordic96/LabelContainer/actions/workflows/publish.yml/badge.svg)
![npm_publish_workflow](https://github.com/nordic96/LabelContainer/actions/workflows/publish_npm.yml/badge.svg)
[![npm version](https://badge.fury.io/js/labelcontainer.svg)](https://badge.fury.io/js/labelcontainer)

A lightweight **centralized label management utility** for TypeScript/JavaScript applications.  
LabelContainer provides a structured way to **store, retrieve, and localize UI labels** across your app using a simple API and a built-in fallback mechanism.

---

## ✨ Features

- 🧩 **Centralized label storage** — manage all text labels in one place  
- 🌐 **Multi-language support** — organize translations by language  
- 📄 **Page-level scoping** — manage labels per page or component  
- 🧠 **Built-in fallbacks** — automatic fallback to `GLOBAL` page or English (`en`) labels  
- ♻️ **Singleton pattern** — maintain one consistent label state throughout your app  
- 🧪 **Full TypeScript support** with included types (`Labels`, `LangLabels`, `LabelBlock`)

---

## 📦 Installation

```bash
npm install labelcontainer
# or
yarn add labelcontainer
```

## 🧠 Core Concepts

### 1. Labels Structure

`Labels` follow a two-level nested map:

1. First layer → groups labels by page (e.g. `HOME`, `DETAILS`, `SEARCH`)
1. Second layer → groups labels by language code (e.g. `en`, `fr`, `sp`)

Each language block (`LabelBlock`) is a simple object mapping label keys to string values.

```typescript
import { Labels } from 'labelcontainer/build/types';

export const LABELS: Labels = {
  GLOBAL: {
    en: {
      title: "Test Title",
      card_msg: "Lorem ipsum dolor sit amet.",
    },
    sp: {
      title: "Título de la Prueba",
      card_msg: "Mensaje de ejemplo.",
    },
  },
  PAGE_A: {
    en: {
      title: "Page A Title",
      button_text: "Submit",
    },
  },
};

```

> Tip: Always include English (en) as a fallback language to ensure coverage.


## ⚙️ Initialization

Since LabelContainer is a singleton, you only initialize it once:

```typescript
import LabelContainer from 'labelcontainer';
import { LABELS } from './labels';

const labelInstance = LabelContainer.getInstance({
  labels: LABELS,
  page: 'PAGE_A',
  language: 'en',
});
```
Subsequent calls to getInstance() will return the same instance.

## 🗺️ Page and Language Management
You can update the current page or language anytime:

```typescript
labelInstance.setPage('PAGE_A');
labelInstance.setLanguage('sp');

console.log(labelInstance.getPage());      // "PAGE_A"
console.log(labelInstance.getLanguage());  // "sp"

```

## 💬 Retrieving Labels
To fetch a label string, use:

```typescript
labelInstance.getLabel('title'); // → "Título de la Prueba"
```

### Fallback Behavior

When retrieving a label, LabelContainer automatically:

1. Falls back to the `GLOBAL` page if the current page is not found.
1. Falls back to `en` (English) if the requested language doesn’t exist.
1. Returns the `key` itself if the label cannot be found anywhere.

```typescript
labelInstance.setPage('UNKNOWN_PAGE');
labelInstance.setLanguage('de');
labelInstance.getLabel('title'); // → "Test Title" (from GLOBAL → en)
```
## 🔍 Checking Label Availability

You can check whether a label exists:

```typescript
labelInstance.hasLabel('button_text'); // → true
labelInstance.hasLabel('missing_key'); // → false
```

## 🌐 Listing All Available Languages
Retrieve a list of all languages defined across your label set:

```typescript
labelInstance.getAllLanguages(); 
// → ['en', 'sp']
```

## 🧪 Testing
Unit tests are written in Jest.
To run them locally:

```typescript
npm install
npm test
```

The test suite covers:

* Singleton behavior
* Page/language management
* Label retrieval and fallbacks
* Label existence and language listing

## 🧱 Type Definitions

| Type         | Description                                                          |
| ------------ | -------------------------------------------------------------------- |
| `LabelBlock` | `Record<string, string>` – map of label keys to text                 |
| `LangLabels` | `Record<string, LabelBlock>` – map of language codes to label blocks |
| `Labels`     | `Record<string, LangLabels>` – map of pages to language blocks       |


## 🧭 Example Usage

```typescript
import LabelContainer from 'labelcontainer';
import { LABELS } from './labels';

const labelInstance = LabelContainer.getInstance({ labels: LABELS });

labelInstance.setPage('PAGE_A');
labelInstance.setLanguage('en');

console.log(labelInstance.getLabel('title')); // "Page A Title"

labelInstance.setLanguage('sp');
console.log(labelInstance.getLabel('title')); // "Título de la Prueba"
```

## 🧩 Future Improvements

Planned enhancements for future versions:

* mergeLabels() — merge new label sets dynamically
* reset() — clear singleton instance for reinitialization (useful in testing or multi-app contexts)

## 📄 License
> MIT © nordic96