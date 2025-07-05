'use client'

import { useState } from 'react'
import { useAccount, useBalance } from 'wagmi'

import DropDownNavbarComponents from './dropdownNavbarComponents'

export default function MenusNavbarComponents() {
    const { address } = useAccount()

    const { data: balanceData, isLoading } = useBalance({
        address: address,
    })

    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    return (
        <div className="menus flex items-center gap-[24px] ">
            {/* Notif Icon */}
            <div className="normalButtonComponent flex size-[48px] py-[12px] px-[16px] justify-center gap-[16px] rounded-[6px] border border-[#2C2C2C] bg-[#1C1C1C] hover:bg-[#2C2C2C] disabled:bg-[#333] disabled:cursor-not-allowed disabled:opacity-50 transition-colors">
                <div className='text-[#fff]'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M9.23452 3.80856C9.56864 2.6864 10.5486 1.5415 12.0001 1.5415C13.452 1.5415 14.4309 2.68645 14.7676 3.80649C14.7693 3.80858 14.7715 3.81121 14.7744 3.81424C14.7813 3.82144 14.7892 3.82806 14.7966 3.83319C14.8022 3.8371 14.8056 3.83878 14.806 3.83898C15.6509 4.18686 16.6454 4.74256 17.4233 5.75997C18.2074 6.78556 18.7174 8.20928 18.7174 10.1956C18.7174 12.176 18.9264 13.262 19.2341 14.0076C19.5038 14.6612 19.8586 15.0909 20.3634 15.7024C20.4371 15.7917 20.5141 15.8848 20.5944 15.9832L20.5946 15.9834C21.525 17.1231 20.6464 18.7236 19.2133 18.7236H4.79154C3.36103 18.7236 2.46769 17.1312 3.40576 15.9832C3.48616 15.8848 3.56314 15.7915 3.63692 15.7022C4.14165 15.0908 4.49645 14.6611 4.76647 14.0074C5.07444 13.2618 5.28389 12.1757 5.28506 10.1956M9.23452 3.80856C9.23322 3.81008 9.23161 3.81189 9.22964 3.81394C9.22328 3.82053 9.21576 3.82689 9.20826 3.83206C9.2013 3.83686 9.19712 3.83873 9.19712 3.83874L9.19667 3.83892C8.35137 4.18702 7.3565 4.74167 6.5786 5.75883C5.79455 6.78402 5.28514 8.20754 5.28506 10.1951M12.0001 3.0356C11.4249 3.0356 10.8756 3.51522 10.6631 4.24655L10.6625 4.24841C10.5255 4.71544 10.1459 5.06401 9.76559 5.22046C9.76554 5.22049 9.76548 5.22051 9.76542 5.22053C9.05178 5.51443 8.32221 5.9384 7.7654 6.66647C7.21474 7.38649 6.77916 8.47479 6.77916 10.1956V10.196C6.77796 12.2613 6.563 13.5716 6.14741 14.5777C5.78586 15.4531 5.28115 16.0614 4.78039 16.6649C4.70761 16.7526 4.63492 16.8402 4.56277 16.9285L4.56273 16.9286C4.53299 16.9649 4.52467 16.9948 4.52263 17.0173C4.52033 17.0427 4.52512 17.0731 4.54112 17.1045C4.56888 17.1588 4.638 17.2295 4.79154 17.2295H19.2133C19.3613 17.2295 19.4293 17.1612 19.4576 17.1053C19.4879 17.0455 19.4842 16.9859 19.4374 16.9285C19.3653 16.8402 19.2926 16.7527 19.2199 16.665C18.7191 16.0614 18.2143 15.4531 17.853 14.5775C17.4377 13.5713 17.2233 12.2609 17.2233 10.1956C17.2233 8.47699 16.7875 7.3883 16.2363 6.66743C15.679 5.93846 14.9491 5.51367 14.237 5.22049C13.8524 5.0623 13.4769 4.70884 13.3406 4.2496L13.34 4.24771C13.1247 3.51486 12.5753 3.0356 12.0001 3.0356Z" fill="white" />
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M9.0117 17.2295C9.42428 17.2295 9.75874 17.564 9.75874 17.9765V18.7236C9.75874 19.318 9.99486 19.888 10.4152 20.3083C10.8355 20.7286 11.4055 20.9647 11.9999 20.9647C12.5943 20.9647 13.1643 20.7286 13.5846 20.3083C14.0049 19.888 14.241 19.318 14.241 18.7236V17.9765C14.241 17.564 14.5755 17.2295 14.9881 17.2295C15.4007 17.2295 15.7351 17.564 15.7351 17.9765V18.7236C15.7351 19.7142 15.3416 20.6643 14.6411 21.3648C13.9406 22.0653 12.9905 22.4588 11.9999 22.4588C11.0092 22.4588 10.0592 22.0653 9.35867 21.3648C8.65818 20.6643 8.26465 19.7142 8.26465 18.7236V17.9765C8.26465 17.564 8.59911 17.2295 9.0117 17.2295Z" fill="white" />
                    </svg>
                </div>
            </div>

            {/* Balance Info */}
            <div className='coin flex items-center gap-[5px] '>
                <p className="text-white text-[16px] font-semibold leading-4 tracking-[0.5px] font-['D-DIN-PRO']">
                    {isLoading && <span>...</span>}
                    {balanceData && (
                        <span>
                            {parseFloat(balanceData.formatted).toFixed(1)}
                        </span>
                    )}
                </p>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M8 16C12.4183 16 16 12.4183 16 8C16 3.58172 12.4183 0 8 0C3.58172 0 0 3.58172 0 8C0 12.4183 3.58172 16 8 16ZM12.3715 12.3344H9.36801L7.18005 8.8442C6.66789 9.42083 6.15214 11.2721 5.97011 12.3344H3.72507C4.48353 11.09 6.71724 8.71066 7.05937 8.6621L3.60372 3.71517H6.57688L8.49558 6.99289C9.36517 5.41612 9.497 4.47918 9.56754 3.97783C9.58254 3.87124 9.59476 3.78434 9.61072 3.71517H12.0985C11.6737 4.3525 10.3995 5.83962 8.63726 7.20534L12.3715 12.3344Z" fill="white" fill-opacity="0.7" />
                </svg>
            </div>
            
            <svg xmlns="http://www.w3.org/2000/svg" width="2" height="32" viewBox="0 0 2 32" fill="none">
                <path d="M1 0V32" stroke="#2C2C2C" />
            </svg>

            {/* Address */}
            <p className="text-white text-[16px] font-semibold leading-4 tracking-[0.5px] font-['D-DIN-PRO'] opacity-70">
                {isLoading && <span>...</span>}
                {address && (
                    <span>
                        {address.slice(0, 6)}...{address.slice(-4)}
                    </span>
                )}
            </p>

            {/* Profile Picture & Dropdown Wrapper */}
            <div className='relative'>
                <div 
                    className='profile-pictures flex size-[48px] justify-center items-center cursor-pointer'
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)} 
                >
                    <div className='flex size-[48px] justify-center items-center shrink-0 rounded-[92px] border border-[#2C2C2C] bg-[#fff]'>
                    </div>
                </div>

                {/* Dropdown Menu */}
                {isDropdownOpen && (
                    <DropDownNavbarComponents/>
                )}
            </div>
        </div>
    )
}