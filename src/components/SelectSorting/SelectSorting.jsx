import React, { useState } from 'react';
import Select from 'react-select';
import './SelectSorting.css'

const options = [
    { value: 'default', label: 'Default sorting' },
    { value: 'bestsales', label: 'Best Sales' },
    { value: 'hightolow', label: 'Price: High to Low' },
    { value: 'lowtohigh', label: 'Price: Low to High' },
];

const SelectSorting = () => {
    const [selectedOption, setSelectedOption] = useState(null);

    return (
        <div className="choices__list choices__list--dropdown">
            <Select
                defaultValue={options[0]}
                onChange={setSelectedOption}
                options={options}
                className="choices__list--single"
            />
        </div>
    );
}

export default SelectSorting;