# LabelContainer Class
Centralised Label Storage Class to maintain, retrieve and store labels from your application in an effective and organised manner.

The class requires mainly 3 properties to be initialized to function;

1. `Labels` object which stores all labels
1. `page` to indicate which page the application is showing
1. `language` to indicate the configured language for enabling the application to support in multi-languages

## 1. Labels
### 1.1 Structure
A `Labels` type follows a two-layered Map structure, where the first layer is to categorize labels by a page (i.e. Home, details, search page) of your application.

The second layer is then categorized by the language setting of the label (i.e. `en` refers to labels in English, `sp` in Spanish, .etc)

### 1.2 Example & Usage
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
