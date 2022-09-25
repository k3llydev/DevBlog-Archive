<!--
   AUTHOR=Kelly
   COMPLEXITY=3
   CATEGORY=SoftwareArchitecture
   LAST_MODIFIED=2022-08-22
   KEYWORDS=JavaScript,MobileBanking,FrontEnd
-->

# The banking trust thief, floating-point numbers

***Disclaimer:** Everything mentioned in this article is for educational purposes. None of the information relates to any confidential or sensitive information about my actual or previous job positions. Everything should be interpreted as a personal-professional experience.*

With the technological era, banking services became pillars of today's humanity just by providing a new and reliable method of handling money. But unlike other services, financial services have a crucial element that determines how many customers it has, **reputation**. In other words, to build a reputation, trust should be protected at all costs.

This is what makes this article relevant from **an engineering perspective**. Most topics covered are related to front-end development with computer science and architecture fragments.

## Deciding how an application will be built1

Choosing a tech stack isn't something that can be done in one day, not to mention that defining an architecture pattern for an application is a long-term decision that if not taken seriously could severely harm the budget later on.

Since this article focuses on mobile applications, it's worth mentioning that there are three possible paths to take but not an easy way to determine which one is the best since it will always depend on the enterprise and architecture teams to decide based on the priorities.

## Native vs Cross-platform vs Hybrid

During the search for the most suitable tech stack, you'll probably end up evaluating market prices for software development and it's noticeable that JavaScript is one of the most popular programming languages. This language has evolved a lot through the years making it extremely cost-efficient which also creates a huge demand for developers.

To simplify things a little bit let's place [React Native](https://reactnative.dev/) on the table, a framework that became popular for easing mobile application creation. You code once and deploy on two different operative systems. (Android and iOS) This also reduces costs a lot, but this article is focused on a different topic, coding skills.

Even if it's extremely cheap to develop software products with all the examples I've mentioned, it's still potentially dangerous to not consider a budget for highly skilled developers. Even if the programming language is friendly and intuitive for newcomers, as the learning path reduces; complexity increments. This makes it harder to stay in a reliable, safe and clean-code environment.

Let's punctuate this issue onto something, **Dynamic Typing**. JavaScript might seem "flexible" when referring to data types and variable declarations, but if a developer isn't familiar with it any generated code could behave *"strangely"* with no clue of the origin and not only in previous environments; but also in a productive environment if there's no proper DevOps testing phase. This is where we get into the main topic of this article, floating-point numbers.

---

## What is a "floating-point" number?

In computer science, floating-point refers to a method of "*storing*" real numbers in computer-based arithmetic to support trade-offs between range and precision. Most typical computer systems use the Double Precision [IEEE 754](https://wikipedia.org/wiki/IEEE_754) standard, but there are some variants:

| Name      | Common name         | Base | Significand bits | Exponent bits |
| --------- | ------------------- | ---- | ---------------- | ------------- |
| binary16  | Half precision      | 2    | 11               | 5             |
| binary32  | Single precision    | 2    | 24               | 8             |
| binary64  | Double precision    | 2    | 53               | 11            |
| binary128 | Quadruple precision | 2    | 113              | 15            |
| binary256 | Octuple precision   | 2    | 237              | 19            |

Since our main topic involves JavaScript it's important to mention that as stated by the [ECMAScript](https://www.ecma-international.org/technical-committees/tc39/) standard, JavaScript also follows the IEEE 754 standard. This means JavaScript uses a double-precision floating-point decimals storing method and this will help us understand later on the *"limits"* of it. For now, we can simplify the data provided in the previous table with the following formula of how the numbers are treated from a computing perspective:

![Floating-point formula example](/assets/floating-point-formula-example-white.png)

As a general overview of all the previous information, we state that:

1. Every interpreted number is an **integer**.
   | Variable    | Type    |
   | ----------- | ------- |
   | significand | integer |
   | base        | integer |
   | exponent    | integer |
2. Floating-point numbers are **an approximation** only.
3. When talking about approximations, **precision** is involved. This creates a finite amount of numbers to work with.

---

## Floating-point precision in JavaScript

Every involved concept was already mentioned and analyzing the floating-point numbers behavior we should not only understand that there is a limitation, but also that floating-point numbers can generate logic errors on any software product.

Going back to our main suspect, dynamic typing, any software engineer who wants to become a web technologies expert should know about this behavior since JavaScript is still the dominant programming language in web applications as I type this paragraph. Lets exemplify this behavior in code:

```javascript
const a = 0.1;
console.log(a); // Prints "0.1"
console.log(typeof a); // Prints "number"

const b = 0.2;
console.log(b); // Prints "0.2"
console.log(typeof b); // Prints "number"

// Two normal variables. Nothing suspicious, yet.
```

As mentioned before, limits are involved. But it doesn't mean that it's impossible to use values outside the range, it just means that we will not have precision on arithmetic operations.
