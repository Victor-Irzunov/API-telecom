import React, {useEffect, useState, useContext, useCallback} from 'react';
import './MainPage.css';
import { observer } from "mobx-react-lite";
import {getDataServer} from '../../http/index.js';
import {getSearchData} from '../../http/index.js';
import PaginationPage from "../../components/pagination/PaginationPage";
import {Context} from "../../index";
import Search from "../../components/search/Search";
import Select from "../../components/select/Select";

import { Spinner } from "react-bootstrap";

const MainPage = observer(() => {
    const { dataStore } = useContext(Context);
    const [localData, setLocalData] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [localSeData, setLocalSeData] = useState('');
    const [isSelect, setIsSelect] = useState(false);
    const [isReload, setIsReload] = useState(false);

    useEffect(() => {
        try{
            getDataServer(dataStore.page, dataStore.limit)
                .then(data => {
                    setIsSelect(false);
                    setLocalData(data);
                    dataStore.setTotalCount(data.count);
                })
                .catch(error => {
                    console.log('error: ', error);
                })
                .finally(() => {
                    setIsLoading(false);
                })

        } catch(err) {
            console.log('err: ', err);
        }
    }, [isReload, dataStore.page, dataStore]);


    const sendServerSearch = useCallback(str => {
        getSearchData(str)
            .then(data => {
            setLocalSeData(data);
            dataStore.setTotalCount(data.count);
        })
            .finally(() => {
            setIsSelect(true);
        })
    },[dataStore]);

    if (isLoading) {
        return <Spinner animation={"grow"} />
    }

    return (
        <div className="main">
            <div className="main__block">
                <div className="main__block_header">

                   <Search sendServerSearch={sendServerSearch} />

                    <Select
                        setLocalSeData={setLocalSeData}
                        setIsSelect={setIsSelect}
                        localData={localData}
                    />

                    <div onClick={() => setIsReload(i=>!i)}
                         className="fa__icon"
                    >
                        <i className="fa fa-undo" aria-hidden="true" />
                    </div>

                </div>
                <table>
                    <caption>Copyright © 2021 Victor Irzunov</caption>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Заголовок</th>
                            <th>Картинка</th>
                            <th>Порода</th>
                        </tr>
                    </thead>
                    <tbody>
                    {(!isSelect ? localData : localSeData).data.map((obj,  count) => {
                        return (
                            <tr key={obj.obj._id}>
                                <td>{count + 1}.</td>
                                <td>{obj.el.title}</td>
                                <td>
                                    <img
                                        src={obj.el.image}
                                        alt={obj.obj.title}
                                        className="table__img"
                                    />
                                </td>
                                <td>{obj.obj.title}</td>
                            </tr>
                        )
                    })}
                    </tbody>
                </table>
                <PaginationPage />
            </div>
        </div>
    );
});

export default MainPage;