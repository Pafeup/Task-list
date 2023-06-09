{
	let tasks = [];

	const addNewTask = (newTaskContent) => {
		tasks = [
			...tasks,
			{ content: newTaskContent },
		];
		render();
	};


	const removeTask = (index) => {
		tasks.splice(index, 1);
		render();
	};

	const toggleTaskDone = (index) => {
		tasks[index].done = !tasks[index].done;
		render();
	};

	const markAllTasksDone = () => {
		const updatedTasks = tasks.map((task) => ({
		  ...task,
		  done: true,
		}));
	  
		tasks = updatedTasks;
		render();
	  };
	  

	const bindEvents = () => {
		const removeButtons = document.querySelectorAll(".js-remove");

		removeButtons.forEach((removeButton, index) => {
			removeButton.addEventListener("click", () => {
				removeTask(index);
			});
		});

		const toggleDoneButtons = document.querySelectorAll(".js-done");
		console.log(toggleDoneButtons);

		toggleDoneButtons.forEach((toggleDoneButton, index) => {
			toggleDoneButton.addEventListener("click", () => {
				toggleTaskDone(index);
			});
		});
	};

	const renderNewTask = () => {
		let htmlString = "";

		for (const task of tasks) {
			htmlString +=
				`<li class="taskList__item">
        		<button class="button js-done">
        			${task.done ? "✓" : ""}
       			</button>
        		<span class="${task.done ? "taskList__done" : ""}">
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

		theButtons.innerHTML += `
		<button>
			Ukryj ukończone
		</button>
		<button class="js-markAllDone">
			Ukończ wszystkie
		</button>`

		const markAllDoneButton =document.querySelector(".js-markAllDone");
		markAllDoneButton.addEventListener("click", markAllTasksDone);

	};

	const render = () => {
		renderNewTask();
		renderButtons();
		bindEvents();
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
