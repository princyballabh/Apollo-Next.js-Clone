import React from 'react';

type FilterChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => void;

const Filters = ({ onFilterChange }: { onFilterChange: FilterChangeHandler }) => {
    return (
        <aside className="filters">
            <h3>Filters</h3>
            <div>
                <h4>Mode of Consult</h4>
                <label>
                    <input type="checkbox" name="hospitalVisit" onChange={onFilterChange} />
                    Hospital Visit
                </label>
                <label>
                    <input type="checkbox" name="onlineConsult" onChange={onFilterChange} />
                    Online Consult
                </label>
            </div>
            <div>
                <h4>Experience (In Years)</h4>
                <label>
                    <input type="radio" name="experience" value="0-5" onChange={onFilterChange} />
                    0-5
                </label>
                <label>
                    <input type="radio" name="experience" value="6-10" onChange={onFilterChange} />
                    6-10
                </label>
                <label>
                    <input type="radio" name="experience" value="11-16" onChange={onFilterChange} />
                    11-16
                </label>
            </div>
            <div>
                <h4>Fees (In Rupees)</h4>
                <label>
                    <input type="radio" name="fee" value="100-500" onChange={onFilterChange} />
                    100-500
                </label>
                <label>
                    <input type="radio" name="fee" value="500-1000" onChange={onFilterChange} />
                    500-1000
                </label>
            </div>
        </aside>
    );
};

export default Filters;