import React, {Component} from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
    display:flex;  
        * {
            margin-right: 5px;
        } 
`

export default class Paginate extends Component {
    constructor(props) {
        super(props)

        //this.onClickhandler = this.onClickhandler.bind(this)
    }
    

    render() {
        const { players, onClick} = this.props
        const { pageNumber, pageSize } = this.props.state
        return (
            <div>
            <Wrapper className="wrapp" onClick={e => onClick(e,players)}>
                
                <div className="firstPage">första</div>

                <div className="backward">bakåt</div>

                <div className="forward">framåt</div>

                <div className="lastPage">sista</div>

            </Wrapper>
        {<div>{pageNumber + '/' + Math.ceil(players.length/pageSize)}</div>}
            </div>
        )
    }

}
