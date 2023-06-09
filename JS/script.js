{
	let tasks = [];
	let hideCompleted = false;


	const addNewTask = (newTaskContent) => {
		tasks = [
			...tasks,
			{ content: newTaskContent },
		];

		render();
	};


	const removeTask = (taskIndex) => {
		tasks = tasks.filter((task, index) => index !== taskIndex);

		render();
	};


	const toggleTaskDone = (taskIndex) => {
		tasks = tasks.map((task, index) =>
			(index === taskIndex ? { ...task, done: !task.done } : task));

		render();
	};

	const markAllTasksDone = () => {
		tasks = tasks.map((task) => ({
			...task,
			done: true,
		}));

		render();
	};

	const hideCompletedTasks = () => {
		hideCompleted = !hideCompleted;
		render();
	};

	const renderNewTask = () => {
		let htmlString = "";

		for (const task of tasks) {
			htmlString += hideCompleted && task.done ? "" : `
			<li class="taskList__item">
			  <button class="button js-done">
				${task.done ? "✓" : ""}
			  </button>
			  <span class=${task.done ? "taskList__done" : ""}>
				${task.content}
			  </span>
			  <button class="button button--remove js-remove">
				🗑
			  </button>
			</li>`;

		}

		document.querySelector(".js-taskList").innerHTML = htmlString;
	};

	const renderButtons = () => {
		const theButtons = document.querySelector(".js-theButtons")

		if (!tasks.length) {
			theButtons.innerHTML = "";
			return;
		};

		theButtons.innerHTML = `
    		<button class="js-hideCompleted">
      			${hideCompleted ? "Pokaż ukończone" : "Ukryj ukończone"}
    		</button>
    		<button class="js-markAllDone">
      			Ukończ wszystkie
    		</button>`;
	};

	const bindButtonEvents = () => {
		const markAllDoneButton = document.querySelector(".js-markAllDone");
		if (markAllDoneButton) {
			markAllDoneButton.addEventListener("click", markAllTasksDone)
		};

		const hideCompletedButton = document.querySelector(".js-hideCompleted");
		if (hideCompletedButton) {
			hideCompletedButton.addEventListener("click", hideCompletedTasks)
		};
	};

	const bindRemoveEvents = () => {
		const removeButtons = document.querySelectorAll(".js-remove");

		removeButtons.forEach((removeButton, index) => {
			removeButton.addEventListener("click", () => {
				removeTask(index);
			});
		});
	};

	const bindToggleDoneEvents = () => {
		const toggleDoneButtons = document.querySelectorAll(".js-done");

		toggleDoneButtons.forEach((toggleDoneButton, index) => {
			toggleDoneButton.addEventListener("click", () => {
				toggleTaskDone(index);
			});
		});
	}

	const render = () => {
		renderNewTask();
		renderButtons();

		bindButtonEvents();
		bindRemoveEvents();
		bindToggleDoneEvents();
	};

	const onFormSubmit = (event) => {
		event.preventDefault();

		const newTaskElement = document.querySelector(".js-newTask");
		const newTaskContent = newTaskElement.value.trim();

		if (newTaskContent !== "") {
			addNewTask(newTaskContent);
			newTaskElement.value = "";
		};

		newTaskElement.focus();
	};

	const init = () => {
		render();

		const form = document.querySelector(".js-form");

		form.addEventListener("submit", onFormSubmit);
	};

	init();
}
