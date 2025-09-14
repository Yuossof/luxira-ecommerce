import React, { useState } from 'react';
import { Sidebar } from "flowbite-react";
import { FaCheck } from "react-icons/fa";
import '../Aside.css';

const DressStyle = () => {

    const [isChecked10, setIsChecked10] = useState(false);
    const [isChecked11, setIsChecked11] = useState(false);
    const [isChecked12, setIsChecked12] = useState(false);
    const [isChecked13, setIsChecked13] = useState(false);

  return (
    <div className='border-b-2 border-main'>
    <Sidebar aria-label="Sidebar with multi-level dropdown example" className="font-primary !p-0">
        <Sidebar.Items className="custom-sidebar-items !p-0">
            <Sidebar.ItemGroup className='!p-0'>
                <Sidebar.Collapse label="Dress Style" className='font-primary font-semibold text-[22px] tracking-wide !p-0 text-activeDark'>
                    <div className={`${isChecked10 ? 'text-dark' : 'text-gray'} hover:text-dark transition-all duration-300  mt-4 pb-2`}>
                        <label
                            className="flex items-center justify-between custom-checkbox pr-1"
                        >
                            <div className='pl-4'>Casual</div>
                            <input
                                type="checkbox"
                                checked={isChecked10}
                                onChange={() => setIsChecked10(!isChecked10)}
                            />
                            <span className="checkmark">
                                {isChecked10 && <FaCheck color="white" size={11} />}
                            </span>
                        </label>
                    </div>
                    <div className={`${isChecked11 ? 'text-dark' : 'text-gray'} hover:text-dark transition-all duration-300  mt-4 pb-2`}>
                        <label
                            className="flex items-center justify-between custom-checkbox pr-1"
                        >
                            <div className='pl-4'>Formal</div>
                            <input
                                type="checkbox"
                                checked={isChecked11}
                                onChange={() => setIsChecked11(!isChecked11)}
                            />
                            <span className="checkmark">
                                {isChecked11 && <FaCheck color="white" size={11} />}
                            </span>
                        </label>
                    </div>
                    <div className={`${isChecked12 ? 'text-dark' : 'text-gray'} hover:text-dark transition-all duration-300  mt-4 pb-2`}>
                        <label
                            className="flex items-center justify-between custom-checkbox pr-1"
                        >
                            <div className='pl-4'>Party</div>
                            <input
                                type="checkbox"
                                checked={isChecked12}
                                onChange={() => setIsChecked12(!isChecked12)}
                            />
                            <span className="checkmark">
                                {isChecked12 && <FaCheck color="white" size={11} />}
                            </span>
                        </label>
                    </div>
                    <div className={`${isChecked13 ? 'text-dark' : 'text-gray'} hover:text-dark transition-all duration-300  mt-4 pb-2`}>
                        <label
                            className="flex items-center justify-between custom-checkbox pr-1"
                        >
                            <div className='pl-4'>Gym</div>
                            <input
                                type="checkbox"
                                checked={isChecked13}
                                onChange={() => setIsChecked13(!isChecked13)}
                            />
                            <span className="checkmark">
                                {isChecked13 && <FaCheck color="white" size={11} />}
                            </span>
                        </label>
                    </div>
                </Sidebar.Collapse>
            </Sidebar.ItemGroup>
        </Sidebar.Items>
    </Sidebar>
</div>
  )
}

export default DressStyle