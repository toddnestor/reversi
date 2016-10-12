Array.prototype.uniq = function() {
  let new_arr = [];

  this.forEach(function(el){
    if(!new_arr.includes(el)) {
      new_arr.push(el);
    }
  });

  return new_arr;
}

Array.prototype.two_sum = function() {
  pairs = [];

  for(let i = 0; i < this.length; i++){
    for(let j = i+1; j < this.length; j++) {
      if(this[i] + this[j] === 0) {
        pairs.push([i,j]);
      }
    }
  }

  return pairs;
}

Array.prototype.transpose = function() {
  let transposed = [];

  for(let i = 0; i < this[0].length; i++) {
    transposed.push([]);
  }

  for(let i = 0; i < this.length; i++) {
    for(let j = 0; j < this[i].length; j++) {
      transposed[j].push(this[i][j]);
    }
  }

  return transposed;
}



Array.prototype.each = function(cb) {
  for(let i = 0; i < this.length; i++) {
    cb(this[i]);
  }
}

Array.prototype.myMap = function(cb) {
  let newArr = [];
  this.each( function(el) {
    newArr.push(cb(el));
  });

  return newArr;
}


Array.prototype.myInject = function(cb) {
  let accumulator = this[0];
  this.slice(1).each( el => accumulator = cb(accumulator, el) );
  return accumulator;
}


Array.prototype.bubblesort = function(ending) {
  let changed = false;
  ending = ending ? ending : this.length

  for(let i = 1; i < ending; i++) {
    if(this[i-1] > this[i]) {
      first = this[i-1];
      second = this[i];

      this[i-1] = second;
      this[i] = first;
      changed = true;
    }
  }

  if(changed) {
    return this.bubblesort(ending - 1);
  } else {
    return this;
  }
}


String.prototype.substrings = function() {
  let substrings = [];

  for(let i = 0; i < this.length; i++) {
    let newSubstring = this[i];
    substrings.push(newSubstring);
    for(let j = i + 1; j < this.length; j++) {
      newSubstring += this[j];
      substrings.push(newSubstring);
    }
  }
  return substrings;
}

function range(start, end) {
  if(end < start)
    return [];

  return [start].concat(range(start + 1, end));

}

function exp(base, power) {
  if(power === 0)
    return 1;

  return base * exp(base, power - 1);
}

function exp2(base, power) {
  if(power === 0)
    return 1;

  if(power % 2 === 0 ) {
    let test = exp2(base, power / 2);
    return test * test;
  } else {
    let test = exp2(base, (power - 1) / 2);
    return base * test * test;
  }
}

function fibonacci(n) {
  if(n === 0)
    return [];
  else if(n === 1)
    return [1];
  else if(n === 2)
    return [1,1];

  let nums = fibonacci(n - 1);

  next_num = nums[nums.length - 1] + nums[nums.length - 2];

  nums.push(next_num);

  return nums;
}

Array.prototype.bsearch = function(target) {
  if(this.length === 1) {
    if(this[0] == target) {
      return 0;
    } else {
      return false;
    }
  }

  let mid = Math.floor(this.length / 2);
  if( this[mid] == target) {
    return mid;
  } else if(this[mid] < target) {
    let right = this.slice(mid + 1);
    let found = right.bsearch(target)
    if(found === false) {
      return false;
    } else {
      return mid + 1 + found;
    }
  } else {
    let left = this.slice(0,mid);
    return left.bsearch(target);
  }
}


function makeChange(amount, coins) {
  let bestSolution = false;

  coins.forEach ( function(coin) {
    let new_amount = amount - coin;
    if(new_amount >= 0) {
      otherSolution = makeChange(new_amount, coins);
      let solution = [coin];

      if(otherSolution)
        solution = solution.concat(otherSolution);

      if(!bestSolution || bestSolution.length > solution.length)
        bestSolution = solution;
    }

  } )
  return bestSolution
}

Array.prototype.merge_sort = function() {
  if(this.length <= 1)
    return this;

  let left = this.slice(0, this.length / 2);
  let right = this.slice(this.length / 2);

  return mergeArrays(left.merge_sort(), right.merge_sort());
}

function mergeArrays(arr1, arr2) {
  if(arr2.length === 0 || arr1.length === 0)
    return arr1.concat(arr2);

  let first = false;

  if(arr1[0] < arr2[0]) {
    first = arr1[0];
    arr1 = arr1.slice(1);
  } else {
    first = arr2[0];
    arr2 = arr2.slice(1);
  }

  return [first].concat(mergeArrays(arr1,arr2));
}

Array.prototype.subsets = function() {
  if( this.length === 0 ) {
    return [[]];
  }
  let smaller_array = this.slice(0, this.length -1);
  let subsets = smaller_array.subsets();
  let last_el = this[this.length - 1];
  let new_subsets = subsets.map( function(subset) {
    subset = subset.slice(0);
    subset.push(last_el);
    return subset;
  });

  return subsets.concat(new_subsets);
}
