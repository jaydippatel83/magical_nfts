import Link from "next/link";
import { footerMenuList, socialIcons } from "../data/footer_data";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter, faDiscord } from '@fortawesome/free-brands-svg-icons';

const footer = () => {
  return (
    <>
      {/* <!-- Footer --> */}
      <footer className="dark:bg-jacarta-900 page-footer ">
        <div className="container">
          <div className="flex flex-col items-center justify-between space-y-2 py-8 sm:flex-row sm:space-y-0 footer-center">
            <span className="dark:text-jacarta-400 text-sm ">
              <span>Bringing the coolest things to life!</span>
            </span>
            <ul className="dark:text-jacarta-400 flex flex-wrap space-x-4 text-sm">
              <li>
                {/* <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer"> */}
                <FontAwesomeIcon icon={faTwitter} className="social-icon" style={{ fontSize: "20px" }} />
                {/* </a> */}
              </li>
              <li>
                {/* <a className="hover:text-accent dark:hover:text-white"> */}
                <FontAwesomeIcon icon={faDiscord} className="social-icon" style={{ fontSize: "20px" }} />
                {/* </a> */}
              </li>
            </ul>
          </div>
        </div>
      </footer>
    </>
  );
};

export default footer;