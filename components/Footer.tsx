import Image from 'next/image';
import React from 'react';
import { footerLinks } from '@/constants';
import Link from 'next/link';


const Footer = () => {
  return (
    <footer className="flex flex-col text-black-100 mt-5 border-t border-gray-100">
      <div className="flex max-md:flex-col flex-wrap justify-between gap-5 sm:px-16 px-6 py-10">
        <div className="flex flex-col justify-start items-start gap-6">
          <Image src="/logo.svg" alt="logo" width={118} height={18} className="object-contain" />
          <p className="text-base text-gray-700">
            Car Hub 2024 <br />
            All Right Reserved &copy;
          </p>
        </div>
        <div className='footer__links'>
      {footerLinks.map((link:any)=>(
        <div key={link.title} className="footer__link"> 
        <h3 className="font-bold">{link.title}</h3>
        {link.links.map((item:any)=> (
            <Link 
            key={item.title}
            href={item.url}
            className="text-gray-500"

            >
              {item.title}
</Link>
        ))}
         </div>
      ))}
      </div>

       

      </div>
    </footer>
  );
};

export default Footer;
