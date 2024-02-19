import "./Header.scss";

export default function Header(){

    return(
        <header className="header">
            <nav className="header__nav">
                <ul className="header__navli">
                    <li className="header__navli--item">Home</li>
                    <li className="header__navli--item">My Profile</li>
                    <li className="header__navli--item">Log In</li>
                </ul>
            </nav>
        </header>
    );
}