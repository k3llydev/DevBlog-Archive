<!--
   AUTHOR=Kelly
   COMPLEXITY=4
   CATEGORY=Algorithms
   LAST_MODIFIED=2023-01-21
   KEYWORDS=JavaScript,CodingChallenges
   DESCRIPTION=The main objective of this article is to explain the process and the information I have found through my research to create a List class that can handle infinite length while also having the possibility to calculate PI.
-->

# Calculating &#960; inside an infinite-length List class

I recently faced a coding challenge where the result had to be a List class that could handle infinite-length lists. As part of the solution, the List class had to have a `PI()` method that should return a calculation of&nbsp;&#960;. Long story short, I decided to handle infinity with [generator functions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function*) and used this same concept to implement the `PI()` method generator.

Here is an overview of the involved methods to calculate&nbsp;&#960;:

```javascript
class List {

   constructor(generator, min = 0, max = Infinity) { /* ... */}

   // Implementation of other list methods...

   get(n) { /* Obtains a value based on the number provided */ }

   static arctan(x) { /* Generator for Arctan series */ }

   static get PI() { /* Generator for PI calculation */ }

}
```

This is an overview of how the implementation was built, we can appreciate:

1. The `constructor` method is the one receiving the generator function and storing it for later use.
2. The `arctan` method receives a parameter named `x` that we will get in detail later on.
3. The `PI` method is of type `get`, which means we can directly invoke it and reference its values based on the generator function.

Moving forward, we are going to quickly analyze a few steps before the construction of the `arctan(x)` method.

## Arctan (trigonometry)

The formula I used to build the `arctan(x)` method refers to this concept of `inverse trigonometry functions` being [arctan](https://www.cuemath.com/trigonometry/arctan/) one of the most important ones. Since arctan has many different uses, I had to focus only on those used for calculating&nbsp;&#960;. For now, keep in mind the following formula:

```javascript
const PI = 4 * ( arctan(1/2) + arctan(1/3) );
```

This is a [Machin-like formula](https://en.wikipedia.org/wiki/Machin-like_formula) to calculate the approximate value of&nbsp;&#960;, more specifically it is [Euler's solution](https://example.com) that implements the Taylor series, a representation of the following infinite sum:

![Arctan function with Taylor series](/assets/arctan_formula_taylor_series.jpg)

Or if we translate it to code:

```javascript
0 + x^1/1 - x^3/3 + x^5/5 - x^7/7 + ...Continues infinitely
```

So, here is the implementation of the `arctan(x)` method I ended up with:

```javascript
static arctan(x) {
   function* generator() {
      let sum = 0;
      for(let i = 0; true; i++) {
         sum += (Math.pow(-1, i) * Math.pow(x, 2 * i + 1)) / (2 * i);
         yield sum;
      }
   }
   return new List(generator);
}
```

For a better understanding, I will explain the formula in two parts:

1. Controlling the current sign.
2. Implementation of the Taylor series formula.

### Controlling the current sign

Since I decided to have a variable that works as a counter (`i`) I was able to determine the current operation sign between `+` and `-` with the following code:

```javascript
Math.pow(-1, i)

// Examples
console.log(Math.pow(-1, 0)); //  1
console.log(Math.pow(-1, 1)); // -1
console.log(Math.pow(-1, 2)); //  1
console.log(Math.pow(-1, 3)); // -1
```

And since the formula uses the inline sum operator `+=` it automatically determines the sign that should be used in the current iteration.

### Implementation of the Taylor series formula

The representation of the `x^1/1` in code is the following fragment of code:

```javascript
Math.pow(x, 2 * i + 1) / (2 * i);
```

And since it is a sum of all those elements, the result is always being saved to the `sum` variable:

```javascript
sum += (Math.pow(-1, i) * Math.pow(x, 2 * i + 1)) / (2 * i);
```

## Implementing PI() method

With the previous formula already working, implementing the `PI()` method was simpler because, as mentioned previously, I used Euler's solution to calculate&nbsp;&#960;. (The formula I suggested to keep in mind)

```javascript
static get PI() {
   function* generator() {
      let counter = 0;
      let pi = 0;
      yield pi;
      // This formula:
      const [ arc1_2, arc1_3 ] = [ List.arctan(1 / 2), List.arctan(1 / 3) ];
      while(true) {
         // PI = 4 * ( arctan(1/2) + arctan(1/3) )
         // Getting the length based on current iteration of PI
         pi = 4 * (arc1_2.get(counter) + arc1_3.get(counter));
         yield pi;
         counter++;
      }
   }
   return new List(generator);
}
```

## Finally calculating &#960;

This was the hardest part because test cases were also approximation assertions. But as far as the entire List class implementation was done it can be used as:

```javascript
console.log(List.PI.get(1));   // 3.333333333333333
console.log(List.PI.get(5));   // 3.1417411974336886
console.log(List.PI.get(12));  // 3.1415926497167876
console.log(List.PI.get(100)); // 3.1415926535897922
```

The higher the `x` value, the more precise the result will be.
