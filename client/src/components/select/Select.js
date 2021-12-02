import React, {useRef, useContext, memo} from 'react';
import {getSelectData} from "../../http";
import {Context} from "../../index";
import "./Select.css";

const Select = memo(({setLocalSeData, setIsSelect, localData }) => {
        const { dataStore } = useContext(Context);

        const selectRef = useRef();

        const changeSelect = () => {
            let option = selectRef.current.options[selectRef.current.selectedIndex].value;
            getSelectData(option)
                .then(data => {
                    setLocalSeData(data);
                    dataStore.setTotalCount(data.count);
                })
                .finally(() => {
                    setIsSelect(true);
                });
        };


        return (
            <div>
                <select
                    ref={selectRef}
                    name="dog"
                    className="main__select"
                    onChange={changeSelect}
                >
                    <option>Выберите породу</option>
                    {localData.data.map(obj => {
                        return (
                            <option
                                key={obj.obj._id}
                                value={obj.obj.title}
                            >
                                {obj.obj.title}
                            </option>
                        )
                    })}
                </select>

            </div>
        );
    }
);

export default Select;