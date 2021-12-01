import React, {useEffect, useState} from 'react';
import './MainPage.css'
import getDataServer from '../../http/index.js';

const MainPage = () => {
    const [localData, setLocalData] = useState({})
    const [isLoading, setIsLoading] = useState(true)

    console.log(localData);

    useEffect(() => {
        try{
            getDataServer()
                .then(data => {
                    setLocalData(data)
                })
                .catch(function (error) {
                console.log('error: ', error);
                })
                .finally(() => {
                    setIsLoading(false)
                })
        } catch(err) {
            console.log('err: ', err)
        }

    }, [])

    if(isLoading){
        return <div>ddd</div>
    }


    return (
        <div className='main'>
            <div className='main__block'>
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
                    {localData.breeds.map((obj,  count) => {
                        return localData.dogs.map(el => {
                            return obj._id === el.breed && (
                                <tr key={obj._id}>
                                    <td>{count + 1}</td>
                                    <td>{el.title}</td>
                                    <td>
                                        <img
                                            src={el.image}
                                            alt={obj.title}
                                            className='table__img'
                                        />
                                    </td>
                                    <td>{obj.title}</td>
                                </tr>
                            )
                        })

                    })}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MainPage;