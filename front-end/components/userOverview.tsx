import { User } from "@types";
import styles from '@styles/Profile.module.css'
import { useTranslation } from "next-i18next";

type Props = { 
    user: User;
}

const userOverview: React.FC<Props> = ({ user }) => {
    const { t } = useTranslation();
    return (
        
    <div className={styles['profile-cont']}>
        <img 
        src="https://wallpapers-clan.com/wp-content/uploads/2022/08/default-pfp-36.jpg" 
        alt="Profile Picture" 
        className={styles['profile-img']}
        />
        <div>
        <h1 className={styles['profile-info']}>{t('info.greet')}, {user.username}!</h1>
        <p className={styles['profile-info']}>{t('info.email')}: {user.emailAddress}</p>
        <p className={styles['profile-info']}>{t('info.phone')}: {user.phoneNumber}</p>
        <p className={styles['profile-info']}>{t('info.country')}: {user.country}</p>
        </div>
    </div>
    );
} 


export default userOverview;