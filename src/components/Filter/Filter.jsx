import React from 'react';
import uniqid from "uniqid";

import SelectedFilter from "./SelectedFilter";
import FilterItem from "./FilterItem";


const Filter = (props) => {
    const {products, filterItems} = props
    return (
        <div className="filter">
            <SelectedFilter filterItems={filterItems}/>
            {
                filterItems && filterItems.map(filter => (
                    filter.filter_list.length > 1 && <FilterItem products={products} filter={filter} key={uniqid()}/>
                ))
            }
        </div>
    );
};

export default Filter;