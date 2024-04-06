import React from 'react';
import { Link } from "@magicjs.dev/frontend";
import FacebookIcon from "./assets/icons/facebook_icon.svg";
import TwitterIcon from "./assets/icons/twitter_icon.svg";
import LinkedinIcon from "./assets/icons/linkedin_social_icon.svg";
import useFooterHook from './footer.hook';

export default function Footer() {
  const hook: any = useFooterHook();

  return (
    <div>
      <footer className="md:h-44 h-52 flex items-center px-4 sm:px-32 bg-[#FCFCFC] border-t border-[#eeecec]">
        <div className="w-full md:flex md:items-center md:justify-between lg:px-8">
          <div className="flex md:w-[80%] flex-col md:items-start items-center mb-7 md:mb-0">
            <Link to={'/'} className="h-10 w-16 flex items-center">
              <img
                src={hook.imageSrc.getLink()}
                className="h-full w-full object-contain object-left"
              />
            </Link>
            <div className="mt-2 md:mt-7 text-sm text-gray-500 md:text-start text-center mr-[16px] truncate md:w-[40%] w-[85%]">© 2024 {hook.companyDetails?.companyName}</div>
          </div>
          <div className="flex flex-col md:items-start items-center">
            {
              hook.companyDetails?.facebookUrl || hook.companyDetails?.linkedinUrl || hook.companyDetails?.twitterUrl ? (
                <span className="text-sm sm:text-base font-semibold text-[#0B0B0B] sm:text-center">Connect with us</span>
              ) : null
            }
            <ul className="flex flex-row justify-center gap-2 sm:gap-4 flex-wrap items-center mt-2 text-sm font-medium text-gray-500 md:mt-5">
              {hook.companyDetails?.facebookUrl ? (
                <a target="_blank" href={hook.companyDetails.facebookUrl} className='hover:opacity-80'><FacebookIcon className="w-8 h-8" /></a>
              ) : (
                <div />
              )}
              {hook.companyDetails?.linkedinUrl ? (
                <a target="_blank" href={hook.companyDetails.linkedinUrl} className='hover:opacity-80'><LinkedinIcon className="w-8 h-8" /></a>
              ) : (
                <div />
              )}
              {hook.companyDetails?.twitterUrl ? (
                <a target="_blank" href={hook.companyDetails.twitterUrl} className='hover:opacity-80'><TwitterIcon className="w-8 h-8" /></a>
              ) : (
                <div />
              )}
            </ul>
          </div>
        </div>
      </footer>
    </div>
  )
}; 