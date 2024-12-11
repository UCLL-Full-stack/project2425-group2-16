import { User } from "@types";

type Props = { 
    user: User;
}

const userOverview: React.FC<Props> = ({ user }) => {
    return (
        <div>
            <h1>{user.username}</h1>
            <p>{user.emailAddress}</p>
        </div>
    );
} 


export default userOverview;