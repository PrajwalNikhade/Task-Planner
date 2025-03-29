import React from "react";

const Navbar = () => {
	return (
		<nav className="flex justify-between py-2 bg-emerald-500">
			<div className="logo font-bold text-lg mx-10">Task Planer</div>
			<ul className="flex justify-between ">
				<li className="mx-10 my-auto hover:font-bold transition-all duration-100">
					Home
				</li>
				<li className="mx-10 my-auto hover:font-bold transition-all duration-100">
					Your Tasks
				</li>
			</ul>
		</nav>
	);
};

export default Navbar;
