import React, {Component} from 'react';
import styled from 'styled-components';
//import { FaAngleDoubleLeft, FaAngleDoubleRight, FaAngleLeft, FaAngleRight }  from 'react-icons/fa'
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
        //angle right - left
        //angle double right - left
        return (
            <div>
            <Wrapper className="wrapp" onClick={e => onClick(e,players.length)}>

                <div className="firstPage">Första</div>

                <div className="backward">Bakåt</div>

                <div className="forward">Framåt</div>

                <div className="lastPage">Sista</div>

            </Wrapper>
        {<div>{pageNumber + '/' + Math.ceil(players.length/pageSize)}</div>}
            </div>
        )
    }

}
