import React,{Component} from 'react'
import io from 'socket.io-client'
import './App.css'
class Game extends Component{
    constructor(props){
        super(props)
        this.state={a:Array(9).fill('-'),player:this.props.p1,condition:true,draw:true,game:'WON',winner:''}
        this.socket=io('localhost:4001',{query:`username=${props.name}`})
        this.socket.on('server:message',messageObj=>{this.addMessage(messageObj)})
    }
    click=(i,j)=>{
        const temp=this.state.a;
        console.log(this.props.p1+','+this.props.p2
        )
        if(this.state.condition){
            temp.splice(i*3+j,1,'X')
            this.setState({a:temp,player:this.props.p2,condition:false},()=>{
                this.check('X',this.props.p1);
            })
        }
        else{
            temp.splice(i*3+j,1,'O')
            this.setState({a:temp,player:this.props.p1,condition:true},()=>{
                this.check('O',this.props.p2)
            })
        }
    }
    check=(ch,p)=>{
        var f=true,k=4,d=true,g='WON';
        console.log(this.state.a)
        for(var i=1,j=3 ;i<=7 && d,j<=5 && d ;i+=3,j++){
            
            if(this.state.a[i-1]===ch && this.state.a[i]===ch && this.state.a[i+1]===ch)
            d=false
            if(this.state.a[j-3]===ch && this.state.a[j]===ch && this.state.a[j+3]===ch)
            d=false
        }
        if((this.state.a[0]===ch && this.state.a[4]===ch && this.state.a[8]===ch) || 
            (this.state.a[2]===ch && this.state.a[4]===ch && this.state.a[6]===ch))
            d=false

        
        for(i=0;i<9;i++)
        if(this.state.a[i]==='-')
        f=false;
        if(f && d)
        {
            d=false;
            g='DRAW'
        }
        console.log(p)
        this.setState({draw:d,game:g,winner:p})
        
        
    }
    render(){
        if(this.state.draw)
        return(
            <div >
                <p>{this.state.player}'s turn</p>
                <div >
                {
                    Array(3).fill(null).map(
                        (item,i)=><p className='box'>{
                            Array(3).fill(null).map(
                            (item,j)=><button className='container' onClick={()=>this.click(i,j)}>{this.state.a[i*3+j]}</button>
                        )
                        }</p>
                        
                    )
                }
                </div>
            </div>
        )
        else
        return(
            <div>
                {this.state.game==='WON'?<p>{this.state.winner} Won the match</p>:<p>The Game is a Draw</p>}
            </div>
        )
    }
}
export default Game;