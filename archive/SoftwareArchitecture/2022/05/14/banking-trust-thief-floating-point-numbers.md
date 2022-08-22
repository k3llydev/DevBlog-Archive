<!--
   AUTHOR=Kelly
   COMPLEXITY=3
   CATEGORY=SoftwareArchitecture
   LAST_MODIFIED=2022-08-22
   KEYWORDS=JavaScript,MobileBanking,FrontEnd
-->

# The banking trust thief, floating-point numbers

With the technological era, banking services became pillars of today's humanity not only by providing a new and reliable method of handling money; but also by additional services like loans, insurance, investment services and many others. But unlike other services where customers might evaluate prices, effectiveness times, etc., banking services add **reputation** to the list which is englobed in **trust**.

We could prioritize objectives based on this and determine that looking after every customer's trust is crucial for building a reputation. In other words, losing one customer's trust generates a direct loss of reputation not only because they might consider leaving the institution; but because they have a social circle composed of family, friends and many other potential customers that will most likely receive a negative reference from the customer whose trust was stolen.

This is what makes this article relevant from **an engineering perspective**. Most topics covered are related to front-end development with computer science and architecture fragments. Diving into technical terms we'll start with one of the first steps before building any kind of software:

## Choosing a tech stack, The Budget Challenge

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

---

<!-- 
    REWORK

    El titulo de esta sección me abrió la mente para refactorizar el titulo y la introducción.
    Por este motivo, habrá que retrabajar en la redacción inferior para ajustarlo a una continuación técnica del previo
 -->
## The banking trust stealer, floating-point numbers

There are many
Simple, trust. Imagine the scenario where a passive customer finally felt like obtaining a credit card. There are many reasons why customers choose where to store their money, this might not be the most common but they are defenitely part of such a huge decision: trust, reputation and safety.
