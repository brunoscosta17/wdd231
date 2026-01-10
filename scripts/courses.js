const courses = [
    {
        subject: 'CSE',
        number: 110,
        title: 'Introduction to Programming',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description:
            'This course will introduce students to programming. It will introduce the building blocks of programming languages (variables, decisions, calculations, loops, array, and input/output) and use them to solve problems.',
        technology: ['Python'],
        completed: false
    },
    {
        subject: 'WDD',
        number: 130,
        title: 'Web Fundamentals',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description:
            'This course introduces students to the World Wide Web and to careers in web site design and development.',
        technology: ['HTML', 'CSS'],
        completed: true
    },
    {
        subject: 'CSE',
        number: 111,
        title: 'Programming with Functions',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description:
            'CSE 111 students become more organized, efficient, and powerful computer programmers by learning to research and call functions.',
        technology: ['Python'],
        completed: false
    },
    {
        subject: 'CSE',
        number: 210,
        title: 'Programming with Classes',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description:
            'This course will introduce the notion of classes and objects.',
        technology: ['C#'],
        completed: false
    },
    {
        subject: 'WDD',
        number: 131,
        title: 'Dynamic Web Fundamentals',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description:
            'This course builds on prior experience in Web Fundamentals and programming.',
        technology: ['HTML', 'CSS', 'JavaScript'],
        completed: true
    },
    {
        subject: 'WDD',
        number: 231,
        title: 'Frontend Web Development I',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description:
            'This course builds on prior experience with Dynamic Web Fundamentals.',
        technology: ['HTML', 'CSS', 'JavaScript'],
        completed: false
    }
];

const grid = document.querySelector("#coursesGrid");
const creditsTotalEl = document.querySelector("#creditsTotal");
const filterButtons = document.querySelectorAll(".filter-btn");

let currentFilter = "all";

function filteredCourses() {
    if (currentFilter === "all") return courses;
    return courses.filter(c => c.subject === currentFilter);
}

function renderCourses() {
    const list = filteredCourses();

    grid.innerHTML = "";
    list.forEach(course => {
        const card = document.createElement("div");
        card.className = "course" + (course.completed ? " is-completed" : "");

        const left = document.createElement("div");
        left.innerHTML = `
      <div class="course__name">${course.subject} ${course.number}</div>
      <div class="course__meta">${course.title} • ${course.credits} cr</div>
    `;

        const badge = document.createElement("span");
        badge.className = "badge";
        badge.textContent = course.completed ? "Completed" : "In Progress";

        card.append(left, badge);
        grid.appendChild(card);
    });

    const total = list.reduce((sum, c) => sum + c.credits, 0);
    creditsTotalEl.textContent = total;
}

filterButtons.forEach(btn => {
    btn.addEventListener("click", () => {
        currentFilter = btn.dataset.filter;

        filterButtons.forEach(b => b.classList.remove("is-selected"));
        btn.classList.add("is-selected");

        renderCourses();
    });
});

renderCourses();
