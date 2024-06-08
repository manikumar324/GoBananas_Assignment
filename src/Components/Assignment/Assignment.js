import React, { useState, useEffect } from 'react';
import { ThreeDots } from 'react-loader-spinner';
import "./Assignment.css";

const Assignment = () => {
    const [data, setData] = useState([]);
    const [filterdata, setFilterData] = useState([]);
    const [load, setLoad] = useState(false);

    const url = "https://jsonplaceholder.typicode.com/photos";
    useEffect(() => {
        const fetchData = async () => {
            setLoad(true);
            try {
                const response = await fetch(url);
                const result = await response.json();
                setData(result);
                setFilterData(result);
            } catch (error) {
                console.log(error);
            }
            setLoad(false);
        }
        fetchData();
    }, []);

    const handleChange = (e) => {
        const searchedItem = e.target.value.toLowerCase();
        const filtered = data.filter(item => item.title.toLowerCase().includes(searchedItem));
        setLoad(true)
        setTimeout(()=>{                       // here we have used setTimeout() method to load tghe list items for some time.
            setFilterData(filtered)
            setLoad(false)
        },500)

    }

    return (
        <div>
            <div className='searchbar'>
                <input type='search' onChange={handleChange} placeholder="You Can Search Here . . . . ." className='set-search' />
            </div>
            <div className='list-items'>
                {load ? (
                    <div className='loader'><ThreeDots color="red" height={20} /></div>
                ) : (
                    filterdata.map((item, index) => (
                        <ol key={index}>{index + 1}. {item.title}</ol>
                    ))
                )}
            </div>
        </div>
    )
}

export default Assignment;