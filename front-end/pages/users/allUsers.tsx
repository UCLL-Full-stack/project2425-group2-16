import NavBar from '@components/navbar';
import userService from '@services/UserService';
import { User } from '@types';
import { GetServerSideProps } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Head from 'next/head';
import { useEffect, useState } from 'react';



const AllUsers = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const { t } = useTranslation();

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await userService.getAllUsers();
                setUsers(response);
            } catch (err) {
                setError('You are not authorized to view this page.');
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <>
        <Head>
        <title>{t('pages.Home')}</title>
        <meta name="description" content="Courses app"/>
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
        <link rel="icon" href="/favicon.ico" />
        </Head>
        <header>
            <NavBar></NavBar>
        </header>
        <div>
            <h1>All Users</h1>
            <ul className="custom-ul">
                {users.map(user => (
                    <li key={user.id}>
                        {user.username} - {user.emailAddress}
                    </li>
                ))}
            </ul>
        </div>
        </>
    );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
    const { locale } = context;
  
    return {
      props: {
        ...(await serverSideTranslations(locale ?? "en", ["common"])),
      },
    };
  };

export default AllUsers;