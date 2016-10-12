function Student(fname, lname) {
  this.fname = fname;
  this.lname = lname;
  this.courses = [];
}

Student.prototype.name = function() {
  return `${this.fname} ${this.lname}`;
}

Student.prototype.enroll = function(course) {
  let conflicting_course = false;

  this.courses.forEach(other_course => {
    if(course.conflictsWith(other_course))
      conflicting_course = true;
  });

  if(conflicting_course) {
    throw 'Conflicting course!';
  } else {
    this.courses.push(course);
    course.students.push(this);
  }
}

Student.prototype.courseLoad = function() {
  let courseLoad = {};
  this.courses.forEach( function(course) {
    if(!courseLoad[course.department])
      courseLoad[course.department] = 0;

    courseLoad[course.department] += course.credits;
  });
  return courseLoad;
}

function Course(name, department, credits, days, timeBlock) {
  this.name = name;
  this.department = department;
  this.credits = credits;
  this.students = [];
  this.days = days;
  this.timeBlock = timeBlock;
}

Course.prototype.addStudent = function(student) {
  student.enroll(this);
}

Course.prototype.conflictsWith = function(otherCourse)
{
  let conflicts = false;

  if(otherCourse.timeBlock === this.timeBlock)
  {
    this.days.forEach(day => {
      if(otherCourse.days.includes(day))
        conflicts = true;
    });
  }
  return conflicts;
}


let billy = new Student("billy", "bob");
let physics = new Course("Physics", "Sci", 3, ['mon', 'wed'], 1);
let ruby101 = new Course("Ruby", "Sci", 3, ['tue', 'thur'], 1);
let gym = new Course("Exercise", "Sci", 3, ['mon', 'fri'], 1);


billy.enroll(physics);

// console.log(billy.courses);
// console.log(physics.students);
console.log(billy.courseLoad());
billy.enroll(ruby101);
console.log(billy.courseLoad());
billy.enroll(gym);
