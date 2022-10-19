# LabelContainer
![test_workflow](https://github.com/nordic96/LabelContainer/actions/workflows/npm_install_test.yml/badge.svg)
![npm_github_publish_workflow](https://github.com/nordic96/LabelContainer/actions/workflows/publish.yml/badge.svg)
![npm_publish_workflow](https://github.com/nordic96/LabelContainer/actions/workflows/publish_npm.yml/badge.svg)
[![npm version](https://badge.fury.io/js/labelcontainer.svg)](https://badge.fury.io/js/labelcontainer)

Centralised Label Storage Class to maintain, retrieve and store labels from your application in an effective and organised manner.

The class requires mainly 3 properties to be initialized to function;

1. `Labels` object which stores all labels
1. `page` to indicate which page the application is showing
1. `language` to indicate the configured language for enabling the application to support in multi-languages

## 1. Labels
### 1.1 Structure
A `Labels` type follows a two-layered Map structure, where the first layer is to categorize labels by a page (i.e. Home, details, search page) of your application.

The second layer is then categorized by the language setting of the label (i.e. `en` refers to labels in English, `sp` in Spanish, .etc)

### 1.2 LabelBlock
`LabelBlock` is a type which is equivalent to `Record<string, string>`, where each key (label key) simply maps to string labels.

i.e. `success_msg_a => "Successfully Entered!"`

### 1.3 LangLabels (Language Label Blocks)
`LangLabels` is a type which is equivalent to `Record<string, LabelBlock>`, where each key is a langauge, and it maps to each `LabelBlock` (refer to 1.2)

> [IMPT] It is highly recommended to have a default entry with English labels ('en') as a fallback.

### 1.4 Example & Usage
A pre-defined `Labels` object is required prior to use LabelContainer class. Refer to the example code below.
```typescript
import { Labels } from 'labelcontainer/build/types';
export const LABELS: Labels = {
    GLOBAL: {
        en: {
            title: "Test Title",
            card_msg: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque quis tempus lectus.",
        },
        sp: {
            title: "Título de la Prueba",
            card_msg: "De lo que le pasó a Don Quijote con su sobrina y con
su ama",
        },
    },
    PAGE_A: {
        en: {
            title: "Page A Title",
        },
    },
};
```

## 2. Page & Language
You can simply define the page and language using the pre-defined setter methods, `setLanguage(lang)` and `setPage(page)`

```typescript
LabelContainer.setLanguage('en'); /** Language setting set to English (en)*/
LabelContainer.setPage('page_a'); /** User is currently at Page A*/
```

## 3. Label Retrieval & Usage
LabelContainer follows a Singleton pattern, hence we would need to get the instance by calling `getInstance()`, followed by setting the predefined `Labels` object from 1.2.

```typescript
const labelInstance: LabelContainer = LabelContainer.getInstance();
labelInstance.setLabels(LABELS);
```

Now, we can simply call `getLabel(key)` to retrieve the labels we want to load from the `Labels` object. Refer to the example code below;

```typescript
/**
 * Currently Page is now at A, and language is set to 'en' 
 */
labelInstance.getLabel('title'); /** returns "Page A Title" */
```

There are few important behaviours of `getLabel(key)` function to take note of. Fallback cases will activate if provided page, language or label key is invalid or not found from the configured `Labels` object, and it will return `key`.

1. If page entry does not exist, function will look out for entry named `GLOBAL`
1. If provided language is undefined or not found in labels, function will look out for entry named `en` (English label blocks)
1. If both cases above returns undefined labels, function will return the function parameter `key` itself as fallback.