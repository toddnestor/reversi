function Cat(name, owner) {
  this.name = name;
  this.owner = owner;
}

Cat.prototype.cuteStatement = function() {
  return `${this.owner} loves ${this.name}`;
}

garfield = new Cat('Garfield', 'that one guy');

Cat.prototype.cuteStatement = function() {
  return `Everyone loves ${this.name}`;
}

console.log(garfield.cuteStatement());

Cat.prototype.meow = function() {
  return 'Meow!!!!';
}

console.log(garfield.meow());

garfield.meow = function() {
  return "Grrrrrr!";
}

console.log(garfield.meow());
