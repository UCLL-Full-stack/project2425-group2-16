import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import userService from '@services/UserService'; // Assume this fetches user data
import { User } from '@types';


const UserPage = () => {
    const router = useRouter();
    const { username } = router.query; // Extract the dynamic route parameter
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [role, setRole] = useState<string | null>(null);

    useEffect(() => {
        setRole('');
        const user = sessionStorage.getItem("loggedInUser");
        const role = user ? JSON.parse(user).role : null;
        setRole(role);
        const fetchUser = async () => {
            if (!username) return; // Wait until the `username` is available
            try {
                const fetchedUser = await userService.getUserByUsername(username as string);
                setUser(fetchedUser);
            } catch (err) {
                setError("Failed to fetch user information.");
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, [username]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div>
            <h1>User Profile</h1>
            {role === "moderator" ? (
                user ? (
                    <div>
                        <p><strong>Username:</strong> {user.username}</p>
                        <p><strong>Email Address:</strong> {user.emailAddress}</p>
                        <p><strong>Country:</strong> {user.country}</p>
                        <p><strong>Age:</strong> {user.age}</p>
                        <p><strong>Role:</strong> {user.role}</p>
                    </div>
                ) : (
                    <p>No user found with username: {username}</p>
                )
            ) : (
                <p>You are not authorized to view this page. Please log in as a moderator.</p>
            )}
        </div>
    );
}


export default UserPage;
