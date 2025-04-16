import React from "react";
import { useState, useEffect } from "react";
import { User } from "../types/auths";
import { getAllUsers } from "../services/userService";

const Dashboard: React.FC = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchUsers = async () => {
            setLoading(true);
            setError(null);

            try{
                const fetchedUsers = await getAllUsers();
                setUsers(fetchedUsers);
            } catch(err){
                setError("Failed To Fetch Users");
                throw(err);
            } finally{
                setLoading(false);
            };
        };
        fetchUsers();
    }, [])

    return(
        <div className="container max-w-4xl p-6 mx-auto">
            <h1 className="mb-8 text-4xl font-bold text-center text-indigo-600">User Dashboard</h1>

            {/* Search by Email */}
            {/* <form
                onSubmit={handleSearch}
                className="mb-10 p-6 bg-white rounded-2xl shadow-md border border-gray-200"
            >
                <h2 className="mb-4 text-2xl font-semibold text-gray-800">Search User by Email</h2>
                {error && <p className="mb-3 text-sm text-red-500">{error}</p>}

                <div className="flex flex-col sm:flex-row items-center gap-4">
                <input
                    type="email"
                    placeholder="Enter email address"
                    value={searchEmail}
                    onChange={(e) => setSearchEmail(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-300 transition"
                />
                <button
                    type="submit"
                    disabled={loading}
                    className="w-full sm:w-auto px-6 py-2 font-semibold text-white bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl hover:from-indigo-600 hover:to-purple-600 transition disabled:opacity-50"
                >
                    {loading ? 'Searching...' : 'Search'}
                </button>
                </div>

                {foundUser && (
                <div className="p-4 mt-6 bg-green-100 border border-green-300 rounded-xl">
                    <h3 className="mb-2 font-semibold text-green-800">Found User:</h3>
                    <p><span className="font-medium">Name:</span> {foundUser.name}</p>
                    <p><span className="font-medium">Email:</span> {foundUser.email}</p>
                    { Add other user details as needed }
                </div>
                )}

                {error && !foundUser && <p className="mt-3 text-sm text-red-600">{error}</p>}
            </form> */}

            {/* Display All Users */}
            <div className="p-6 bg-white rounded-2xl shadow-md border border-gray-200">
                <h2 className="mb-5 text-2xl font-semibold text-gray-800">All Registered Users</h2>

                {loading && users.length === 0 && <p>Loading users...</p>}
                {error && users.length === 0 && <p className="text-red-600">{error}</p>}

                {users.length > 0 ? (
                <ul className="space-y-4">
                    {users.map((user) => (
                    <li
                        key={user.email}
                        className="p-4 bg-gray-50 rounded-xl border border-gray-200 hover:shadow transition"
                    >
                        <p><span className="font-medium">First Name:</span> {user.firstName}</p>
                        <p><span className="font-medium">Last Name:</span> {user.lastName}</p>
                        <p><span className="font-medium">Role:</span> {user.role}</p>
                        <p><span className="font-medium">Email:</span> {user.email}</p>
                    </li>
                    ))}
                </ul>
                ) : (
                !loading && <p className="text-gray-600">No users found.</p>
                )}
            </div>
        </div>

    );
};

export default Dashboard;