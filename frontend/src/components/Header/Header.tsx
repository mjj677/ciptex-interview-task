import styles from './styles.module.css'

const Header: React.FC = () => {
    return(
        <div className={styles.container}>
        <h1>Ciptex Pre-Interview Task Management System</h1>
        <h3>Built by Matt Johnston</h3>
        </div>
    );
}

export default Header