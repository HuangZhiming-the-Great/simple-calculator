/* global React ReactDOM */

const projectName='';

// the data container of all the buttons,to store the information of all.
const initial_store={
  mode:0,
  action: undefined,
  hasDecimal:false,
  newEnterText:"",
  oldNumber:"",
  calculorArray:[],
  numberArray:[]
};

class Buttons extends React.Component {
  constructor(props){
    super(props);
    this.store=initial_store;
    this.setStore=this.setStore.bind(this);
  }

  setStore(newStore){
    //newStore must be an object that create directly by Object function.
    if(typeof newStore==='object' && newStore.__proto__===Object.prototype){
      for (let item in newStore){
        if(this.store.hasOwnProperty(item)){
          this.store[item]=newStore[item];
        }
      }
    }else{
      console.log("Error! Please use the {...} to set the store's data!");
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

    console.log(this.props.text);
    console.log(ancient.store);

    switch(ancient.store.action){
      case 'number': 
        ancient.setStore({
          action:'number',
          oldNumber:ancient.store.oldNumber.concat(ancient.store.newEnterText),
          newEnterText:this.props.text
        });
        break;
      case 'calculor':
        ancient.setStore({
          action:'number',
          calculorArray:[...ancient.store.calculorArray,ancient.store.newEnterText],
          newEnterText:this.props.text
        });
        break;
      case 'equal':
        ancient.setStore({
          action:'number',
          newEnterText:this.props.text
        });
        break;
      case undefined:
        ancient.setStore({
          action:'number',            newEnterText:this.props.text
        });
        break;
      default:
        alert("Warning! You can't enter a number in this situation!\npleace check your text.\nthis action was ignored.");
      }
    
    /* I don't know why it will show the old state when I use react state.

    console.log(ancient.state);

     Maybe the ancient bring the old state, but not reflash?
     */

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

class DecimalNumberButton extends React.Component {
  constructor(props){
    super(props);
    this.handleDecimalNumber=this.handleDecimalNumber.bind(this);
  }
  
  handleDecimalNumber(ancient){
      switch(ancient.store.action){
        case 'number':
          if(ancient.store.hasDecimal){
            alert("Wrong! One number can't have two decimals!\nThis operation was ignored.");
            break;
          }
          ancient.setStore({
            action:'number',
            hasDecimal:true,
            oldNumber:ancient.store.oldNumber.concat(ancient.store.newEnterText),
            newEnterText:this.props.text
          });
          break;
        case undefined:
          // If you want the float number less than one sames beautiful, you can do this:
          // newEnterText: "0".concat(this.props.text),
          ancient.setStore({
            action:'number',
            hasDecimal:true,
            newEnterText:this.props.text
          });
          break;
        case 'calculor':
          ancient.setStore({
            action:'number',
            hasDecimal:true,
            calculorArray:[...ancient.store.calculorArray,ancient.store.newEnterText],
            newEnterText:this.props.text
          });
          break;
        default:
          alert("Warning! You can't enter a decimal in this situation!\npleace check your text.\nthis action was ignored.");
          break;
      }
    
  }

  render(){
    return (
      React.createElement(Buttons,{
        id:this.props.id,
        className:this.props.className,
        text:this.props.text,
        onClick:this.handleDecimalNumber
      })
    );
  }
}

class CalcButton extends React.Component {
  constructor(props){
    super(props);
    this.handleCalculor=this.handleCalculor.bind(this);
  }

  handleCalculor(ancient){
    switch(ancient.store.action){
      case 'number':
        ancient.setStore({
          action:'calculor',
          hasDecimal:false,
          numberArray:[...ancient.store.numberArray,ancient.store.oldNumber.concat(ancient.store.newEnterText)],
          oldNumber:"",
          newEnterText:this.props.text
        });
        break;
      case 'calculor':
        // If you want, you can add a warning before.
        ancient.setStore({
          newEnterText:this.props.text
        });
        break;
      case undefined:
      default:
        alert("Warning! You can't enter a calculor in this situation!\npleace check your text.\nthis action was ignored.");
        break;
    }
  }

  render(){
    return (
      React.createElement(Buttons,{
        id:this.props.id,
        className:this.props.className,
        text:this.props.text,
        onClick:this.handleCalculor
      })
    );
  }
}

class ClearAll extends React.Component {
  constructor(props){
    super(props);
    this.handleClearAll=this.handleClearAll.bind(this);
  }

  handleClearAll(ancient){
    ancient.setStore(initial_store);
  }

  render(){
    return (
      React.createElement(Buttons,{
        id:this.props.id,
        className:this.props.className,
        text:this.props.text,
        onClick:this.handleClearAll
      })
    );
  }
}

class  EqualButton extends React.Component {
  constructor(props){
    super(props);
    this.handleEqual=this.handleEqual.bind(this);
    this.getAnswer=this.getAnswer.bind(this);
  }

  getAnswer(numberArray,calculorArray,mode){
    if(numberArray.length==calculorArray.length+1){
      if(mode===0){
        let answer=numberArray[0];
        for(let i=0;i<calculorArray.length;i++){
          switch(calculorArray[i]){
            case '+':
              answer+=numberArray[i+1];
              break;
            case '-':
              answer-=numberArray[i+1];
              break;
            case '*':
              answer*=numberArray[i+1];
              break;
            case '/':
              if(numberArray[i+1]===0){
                alert("Wrong! 0 couldm't to be a divider!\nCalculation is over.\nYou may need enter clearAll to re-calculate.");
                break;
              }
              answer/=numberArray[i+1];
              break;
          }

        }
        return answer;
      }
      if(mode===1){


      }

    }
    return 0;
  }

  handleEqual(ancient){
    switch(ancient.store.action){
      case 'number':
        ancient.setStore(Object.assign({},initial_store,{
          action:'equal',
          numberArray:[this.getAnswer([...ancient.store.numberArray,ancient.store.oldNumber.concat(ancient.store.newEnterText)],ancient.store.calculorArray,ancient.store.mode)],
          newEnterText:this.props.text
        }));
        break;
      case 'calculor':
        alert("Attention! Maybe you should enter a number before!\npleace check your text.\nthis action was ignored.");
        break;
      case 'equal':
        alert("Attention! We think you have got the answer right before now!\npleace check again.\nthis action was ignored.");
        break;
      case undefined:
        alert("Warning! We have nothing to calculate in this situation!\npleace check your text.\nthis action was ignored.");
        break;
    }
      
  }
}

class App extends React.Component {
  constructor(props) {
    super(props);

  }
  render(){
    const numberButtonInformationArray=[
      {
        id:"one",
        className:'number',
        text:"1",
      },
      {
        id:"two",
        className:'number',
        text:"2",
      },
      {
        id:"three",
        className:'number',
        text:"3",
      },
      {
        id:"four",
        className:'number',
        text:"4",
      },
      {
        id:"five",
        className:'number',
        text:"5",
      },
      {
        id:"six",
        className:'number',
        text:"6",
      },
      {
        id:"seven",
        className:'number',
        text:"7",
      },
      {
        id:"eight",
        className:'number',
        text:"8",
      },
      {
        id:"nine",
        className:'number',
        text:"9",
      },
      {
        id:"zero",
        className:'number',
        text:"0",
      }
    ];
    let numberButtonArray=[];
    for(let i=0;i<numberButtonInformationArray.length;i++){
      numberButtonArray.push(React.createElement(NumberButton,numberButtonInformationArray[i]));
    }

    const calculorButtonInformationArray=[
      {
        id:'add',
        className:'calculor',
        text:'+',
      },
      {
        id:'subtract',
        className:'calculor',
        text:'-',
      },
      {
        id:'multiply',
        className:'calculor',
        text:'*',
      },
      {
        id:'divide',
        className:'calculor',
        text:'/',
      },
    ];
    let calculorButtonArray=[];
    for(let i=0; i<calculorButtonInformationArray.length;i++){
      calculorButtonArray.push(React.createElement(CalcButton,calculorButtonInformationArray[i]));
    }

    return(
      React.createElement("div",{
        className:"app"
      },

      numberButtonArray,

      React.createElement(DecimalNumberButton,{
        id:'decimal',
        className:'number number-decimal',
        text:'.'
      }),

      calculorButtonArray,
      )
    );
  }
}

ReactDOM.render(React.createElement(App,null),document.getElementById("root"));