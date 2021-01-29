import React from 'react'
import { useHistory, useLocation, useParams, useRouteMatch } from 'react-router-dom'

const WithRouterSample = () => {
    let history = useHistory();
    let location = useLocation();
    let params = useParams()    
    let match = useRouteMatch()

    console.log(params)

    return (
        <div>
            <h4>location </h4>
            <textarea 
                value={JSON.stringify(location, null, 2)} 
                readOnly
                cols='40'
                rows='7'
            />
            <h4>match </h4>
            <textarea 
                value={JSON.stringify(match, null, 2)} 
                readOnly 
                cols='40'
                rows='7'
            />
            <br/>
            <button onClick={() => history.push('/')}>홈으로</button>
        </div>
    )
}

export default WithRouterSample;