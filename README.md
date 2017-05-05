# homework 06

please edit files in solutions folder to provider following functionality

  - *Array.filter(a, callback[, context])*
    should work as `Array`'s `filter` method but should be static and should work also for arrayLike objects.
  - *Array.forEach(a, callback[, context])*
    should work as `Array`'s `forEach` method but should be static and should work also for arrayLike objects.
  - *Array.from(a[, callback, context])*
    if only one argument is passed and it's an array then it should clone it, but if it's an arrayLike it should convert it to array. if second and/or third arguments are passed then should also do mapping.
  - *Array.map(a, callback[, context])*
    should work as `Array`'s `map` method but should be static and should work also for arrayLike objects.
  - *Array.slice(a[, start, end])*
    should work as `Array`'s `slice` method but should be static and should work also for arrayLike objects.

use native methods for `filter`, `forEach`, `map`, `slice`
