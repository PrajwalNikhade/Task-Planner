import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import { v4 as uuidv4 } from "uuid";
import { IoAddSharp } from "react-icons/io5";
import { MdDeleteOutline } from "react-icons/md";
import { CiEdit } from "react-icons/ci";

function App() {
	const [todo, setTodo] = useState("");
	const [todos, setTodos] = useState([]);
	const [editingId, setEditingId] = useState(null);
	const [show_finished, setshow_finished] = useState(true);
	useEffect(() => {
		try {
			const todoString = localStorage.getItem("todos");
			if (todoString) {
				
				const storedTodos = JSON.parse(todoString);
				setTodos(storedTodos);
			}
		} catch (error) {
			console.error("Error parsing todos from local storage:", error);
			
			localStorage.removeItem("todos");
		}
	}, []);

	const toggle_finish = () => {
		setshow_finished(!show_finished);
	};

	const saveToLocalStorage = (todosToSave) => {
		try {
			
			localStorage.setItem("todos", JSON.stringify(todosToSave));
		} catch (error) {
			console.error("Error saving todos to local storage:", error);
		}
	};

	const handleEdit = (id) => {
		const todoToEdit = todos.find((item) => item.id === id);
		setTodo(todoToEdit.todo);
		setEditingId(id);
	};

	const handleDelete = (id) => {
		const newTodos = todos.filter((item) => item.id !== id);
		setTodos(newTodos);
		saveToLocalStorage(newTodos);
	};

	const handleChange = (e) => {
		setTodo(e.target.value);
	};

	const handleAdd = () => {
		if (todo.trim() === "") return;

		if (editingId) {
			// Update existing todo
			const updatedTodos = todos.map((item) =>
				item.id === editingId ? { ...item, todo } : item
			);
			setTodos(updatedTodos);
			saveToLocalStorage(updatedTodos);
			setEditingId(null);
		} else {
			// Add new todo
			const newTodos = [...todos, { id: uuidv4(), todo, isCompleted: false }];
			setTodos(newTodos);
			saveToLocalStorage(newTodos);
		}

		setTodo("");
	};

	const handleCheckbox = (id) => {
		const updatedTodos = todos.map((item) =>
			item.id === id ? { ...item, isCompleted: !item.isCompleted } : item
		);
		setTodos(updatedTodos);
		saveToLocalStorage(updatedTodos);
	};

	return (
		<>
			<Navbar />
			<div className="container bg-emerald-50 mx-auto my-5 overflow-hidden p-10 rounded-2xl min-h-[70vh] w-2/3  flex flex-col">
				<div className="add-to-do flex flex-col">
					<h2 className="text-xl font-bold m-auto flex flex-row justify-center items-center">
						<p className="mr-2">{editingId ? "Edit Todo" : "Add a Todo"}</p>
						{editingId ? (
							<CiEdit className="text-lg" />
						) : (
							<IoAddSharp className="text-lg" />
						)}
					</h2>
					<div className="inputs my-4 flex-col flex sm:flex-row justify-center  items-center">
						<input
							type="text"
							className="border-black sm:w-1/3 w-5/6 mx-5 my-4 bg-emerald-200 rounded-lg p-2"
							onChange={handleChange}
							value={todo}
							placeholder="Enter todo item"
						/>
						<button
							className="bg-emerald-600 hover:bg-emerald-800 hover:cursor-pointer py-2 sm:w-1/3 w-5/6 px-4 text-white rounded-xl hover:font-bold  flex flex-row justify-center items-center"
							onClick={handleAdd}>
							<p className="mr-2">{editingId ? "Edit Todo" : "Add a Todo"}</p>
							{editingId ? (
								<CiEdit className="text-lg" />
							) : (
								<IoAddSharp className="text-lg" />
							)}
						</button>
					</div>
				</div>
				<div className="sm:mx-10 mb-3 flex flex-row gap-1">
					<input
						type="checkbox"
						name=""
						id=""
						value={show_finished}
						onClick={toggle_finish}
					/>
					<p className="text-nowrap m-auto sm:m-2">Show Finished Todos</p>
				</div>
				<h2 className="font-bold text-lg">Your Todos</h2>
				<div className="todos">
					{todos.length === 0 && (
						<div className="m-5 text-lg">No todos here</div>
					)}
					{todos.map(
						(item) =>
							(show_finished || !item.isCompleted) && (
								<div
									className="todo flex justify-between items-center my-2"
									key={item.id}>
									<div className="flex items-center">
										<input
											type="checkbox"
											checked={item.isCompleted}
											className="mr-3"
											onChange={() => handleCheckbox(item.id)}
										/>
										<div
											className={
												item.isCompleted
													? "line-through text-gray-500 flex-wrap"
													: "flex-wrap"
											}>
											{item.todo}
										</div>
									</div>
									<div className="button m-3 flex-col flex sm:flex-row flex-wrap">
										<button
											className="bg-emerald-600 hover:bg-emerald-800 hover:cursor-pointer py-1 px-4 text-white rounded-xl hover:font-bold mx-1 my-2"
											onClick={() => handleEdit(item.id)}>
											<CiEdit />
											Edit
										</button>
										<button
											className="bg-emerald-600 hover:bg-emerald-800 hover:cursor-pointer py-1 px-4 text-white rounded-xl hover:font-bold mx-1"
											onClick={() => handleDelete(item.id)}>
											<MdDeleteOutline />
											Delete
										</button>
									</div>
								</div>
							)
					)}
				</div>
			</div>
		</>
	);
}

export default App;
