import React, { useState, useEffect } from "react";

const SeatSelector = () => {
	const [userName, setUserName] = useState("");
	const [seatNumber, setSeatNumber] = useState("");
	const [userList, setUserList] = useState([]);
	const [editingIndex, setEditingIndex] = useState(null); // Track the index of the user being edited

	useEffect(() => {
		const storedList = JSON.parse(localStorage.getItem("userList")) || [];
		setUserList(storedList);
	}, []);

	const onSubmitHandler = (e) => {
		e.preventDefault();

		const seatExists = userList.some((user) => user.seatNumber === seatNumber);

		if (editingIndex !== null) {
			// Edit existing user
			const updatedList = [...userList];
			updatedList[editingIndex] = { userName, seatNumber };
			setUserList(updatedList);
			localStorage.setItem("userList", JSON.stringify(updatedList));
			setEditingIndex(null); // Reset editingIndex after editing
		} else if (seatExists) {
			alert("Seat is occupied");
		} else {
			// Add new user
			const newUser = { userName, seatNumber };
			const updatedList = [...userList, newUser];
			setUserList(updatedList);
			localStorage.setItem("userList", JSON.stringify(updatedList));
		}

		setUserName("");
		setSeatNumber("");
	};

	const handleEdit = (index) => {
		setEditingIndex(index);
		const userToEdit = userList[index];
		setUserName(userToEdit.userName);
		setSeatNumber(userToEdit.seatNumber.toString()); // Convert seatNumber to string for input field
	};

	const handleDelete = (index) => {
		const updatedList = [...userList];
		updatedList.splice(index, 1);
		setUserList(updatedList);
		localStorage.setItem("userList", JSON.stringify(updatedList));
	};

	return (
		<div className="container">
			<form onSubmit={onSubmitHandler}>
				<input
					type="text"
					placeholder="Username"
					value={userName}
					onChange={(e) => setUserName(e.target.value)}
					required
				/>
				<input
					type="number"
					placeholder="Seat Number"
					value={seatNumber}
					onChange={(e) => setSeatNumber(e.target.value)}
					required
				/>
				<button type="submit">
					{editingIndex !== null ? "Update User" : "Add"}
				</button>
			</form>

			{userList.length === 0 ? (
				<h1>No Seats Booked</h1>
			) : (
				<div>
					<h2>List of Users:</h2>
					<ul>
						{userList.map((user, index) => (
							<li key={index}>
								{user.userName} {user.seatNumber}
								<button onClick={() => handleEdit(index)}>Edit</button>
								<button onClick={() => handleDelete(index)}>Delete</button>
							</li>
						))}
					</ul>
					<p>Total Bookings: {userList.length}</p>
				</div>
			)}
		</div>
	);
};

export default SeatSelector;
