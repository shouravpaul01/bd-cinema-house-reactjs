<<<<<<< HEAD
import movieIcon from "/movie.svg";

const Footer = () => {
  return (
    <footer className="border-t border-dashed border-violet-900 pb-2">
      <div className="bg-base-200 ">
        <div className="my-container footer p-10">
          <aside>
            <img src={movieIcon} alt="logo" className="w-12 h-12" />
            <p className="text-2xl md:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-fuchsia-500  to-red-500">
              BD-Cinema House
            </p>
          </aside>
          <nav>
            <header className="footer-title">Services</header>
            <a className="link link-hover">Branding</a>
            <a className="link link-hover">Design</a>
            <a className="link link-hover">Marketing</a>
            <a className="link link-hover">Advertisement</a>
          </nav>
          <nav>
            <header className="footer-title">Company</header>
            <a className="link link-hover">About us</a>
            <a className="link link-hover">Contact</a>
            <a className="link link-hover">Jobs</a>
            <a className="link link-hover">Press kit</a>
          </nav>
          <nav>
            <header className="footer-title">Legal</header>
            <a className="link link-hover">Terms of use</a>
            <a className="link link-hover">Privacy policy</a>
            <a className="link link-hover">Cookie policy</a>
          </nav>
        </div>
      </div>
      <div className="bg-violet-900 p-4 text-white text-opacity-20 text-center">
        <p>Copyright © 2023 - All right reserved by BD-Cinema House</p>
      </div>
    </footer>
  );
};

export default Footer;
=======

import movieIcon from '../../../public/movie.svg'

const Footer = () => {
    return (
        <footer className="border-t border-dashed border-violet-900 pb-2">
            <div className='bg-base-200 '>
                <div className="my-container footer p-10">
                    <aside>
                        <img src={movieIcon} alt="logo" className="w-12 h-12" />
                        <p className="text-2xl md:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-fuchsia-500  to-red-500">BD-Cinema House</p>
                    </aside>
                    <nav>
                        <header className="footer-title">Services</header>
                        <a className="link link-hover">Branding</a>
                        <a className="link link-hover">Design</a>
                        <a className="link link-hover">Marketing</a>
                        <a className="link link-hover">Advertisement</a>
                    </nav>
                    <nav>
                        <header className="footer-title">Company</header>
                        <a className="link link-hover">About us</a>
                        <a className="link link-hover">Contact</a>
                        <a className="link link-hover">Jobs</a>
                        <a className="link link-hover">Press kit</a>
                    </nav>
                    <nav>
                        <header className="footer-title">Legal</header>
                        <a className="link link-hover">Terms of use</a>
                        <a className="link link-hover">Privacy policy</a>
                        <a className="link link-hover">Cookie policy</a>
                    </nav>
                </div>
            </div>
            <div className="bg-violet-900 p-4 text-white text-opacity-20 text-center">
                <p>Copyright © 2023 - All right reserved by BD-Cinema House</p>
            </div>
        </footer>

    );
};

export default Footer;
>>>>>>> bcfcce7bc1edc90517adfaee3cd2fcdce67708a0
