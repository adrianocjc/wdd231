const courses = [
  { course: 'WDD 130', credit: 2, completed: true },
  { course: 'CSE 131', credit: 2, completed: false },
  { course: 'WDD 231', credit: 2, completed: true },
];

function displayCourses(filter) {
  const filtered = filter === 'all' ? courses :
    courses.filter(c => c.course.startsWith(filter.toUpperCase()));
  const container = document.getElementById('course-container');
  container.innerHTML = '';

  let total = 0;
  filtered.forEach(c => {
    const card = document.createElement('div');
    card.textContent = c.course;
    card.style.background = c.completed ? '#c8e6c9' : '#f0f0f0';
    card.style.padding = '1rem';
    card.style.borderRadius = '5px';
    container.appendChild(card);
    total += c.credit;
  });

  document.getElementById('total-credits').textContent = total;
}

document.getElementById('show-all').addEventListener('click', () => displayCourses('all'));
document.getElementById('show-cse').addEventListener('click', () => displayCourses('CSE'));
document.getElementById('show-wdd').addEventListener('click', () => displayCourses('WDD'));

displayCourses('all');