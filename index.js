/* global React ReactDOM */

const projectName='';

class Buttons extends React.Component {
  constructor(props){
    super(props);
    this.state={
      action: undefined,
      newEnterText:"",
      currentNumber:""
    }
  }

  render(){
    return (
      React.createElement("button",{
        id:this.props.id,
        className:this.props.className,
        onClick:()=> {
          return this.props.onClick(this);
        },
      },this.props.text)
    );
  }
}

class NumberButton extends React.Component {
  constructor(props) {
    super(props);
    this.handleNumber=this.handleNumber.bind(this);
  }

  handleNumber(ancient){
    let judge=()=>{
      switch(ancient.state.action){
        case 'number': 
          return ancient.state.currentNumber.concat(this.props.text);
        case 'calculor':
        case undefined:
          return this.props.text;
        default:
          alert("Warning! You can't enter a number in this situation!\npleace check your text.\nthis action was ignored.")
          return "WRONG";
      }
    }
    if(judge()!=="WRONG"){
      ancient.setState({
        action:'number',
        currentNumber:judge(),
        newEnterText:this.props.text
      });
    }
    // I don't know why it will show the old state.
    // Maybe the ancient bring the old state, but not reflash?
    console.log(this.props.text);
    console.log(ancient.state);
  }

  render(){
    return (
      React.createElement(Buttons,{
        id:this.props.id,
        className:this.props.className,
        text:this.props.text,
        onClick:this.handleNumber
      })
    );
  }
}

ReactDOM.render(React.createElement(NumberButton,{id:"zreo",className:"number",text:"0"}),document.getElementById("root"));