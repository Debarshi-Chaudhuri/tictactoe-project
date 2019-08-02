import React,{Component} from 'react'
import Game from './Game.js'
class Tictactoe extends Component{
    constructor(props){
        super(props)
        this.state={player1:'',player2:'',s:false}
    }
    change1=(event)=>{
        this.setState({player1:event.target.value})
    }
    change2=(event)=>{
        this.setState({player2:event.target.value})
    }
    submit=()=>{
        if(this.state.player1!=='' && this.state.player2!=='' && this.state.player1!==this.state.player2)
        this.setState({s:true})
    }
    render(){
        if(this.state.s)
        return(
            <div>
                <Game p1={this.state.player1} p2={this.state.player2}/>
            </div>
        )
        else
        return(
            <div>
                <p>Enter Player 1 name : &nbsp;<input onChange={this.change1} placeholder="Enter player 1 name"/></p>
                
                <p>Enter Player 2 name : &nbsp;<input onChange={this.change2} placeholder="Enter player 2 name"/></p>
                
                <p><button style={{height:'33px',width:'64px'}}onClick={this.submit}>Submit</button></p>
            </div>
        )
    }
}
export default Tictactoe;