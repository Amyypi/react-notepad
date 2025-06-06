import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faNoteSticky } from '@fortawesome/free-regular-svg-icons';
import { faHouse, faGear } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

const ListItem = ({ to, children }) => {
    return (
        <li>
            <Link to={to}>{children}</Link>
        </li>
    );
};

export default function Sidebar({ isOpen, setIsOpen }) {
    return (
        <div
            className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg transform transition-transform duration-300 z-50
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      `}
        >
            <div className="flex items-center justify-between p-4 border-b">
                <h3 className="text-lg font-semibold">Menu</h3>
                <button onClick={() => setIsOpen(false)} className="text-gray-500 hover:text-black">
                    ✕
                </button>
            </div>
            <ul className="p-4">
                <li className={"text-start p-2 hover:bg-gray-100"}>
                    <FontAwesomeIcon icon={faHouse} className={"pr-4 text-gray-800"}/>
                    <a className="text-gray-800">Dashboard</a>
                </li>
                <li className={"text-start p-2 hover:bg-gray-100"}>
                    <FontAwesomeIcon icon={faNoteSticky} className={"pr-4 text-gray-800"}/>
                    <a className="text-gray-800">Notes</a>
                </li>
                <li className={"text-start p-2 hover:bg-gray-100"}>
                    <FontAwesomeIcon icon={faGear} className={"pr-4 text-gray-800"}/>
                    <a className="text-gray-800">Settings</a>
                </li>
            </ul>
        </div>
    )
}