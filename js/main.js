
/*----- app's state (variables) -----*/
var input, firstNum, op, result;

/*----- cached element references -----*/
var displayEl = document.getElementById('display');

/*----- event listeners -----*/
document.querySelector('table').addEventListener('click', handleClick);

/*----- functions -----*/
initialize();
render();

function handleClick(evt){
    if(evt.target === displayEl) return;
    var text = evt.target.textContent;
    switch(text){
        case 'CA':
            initialize();
            break;
        case '←':
            input = input.substr(0, input.length - 1);
            break;    
        case '.':
            if(!input.includes('.')) input += text;
            break;  
        case '=':
            if(!op || !input) return;
            result = op(firstNum, input);
            input = firstNum = '';
            op = null;
            break;     
        case '+':
            if(!input) return;
            firstNum = input;
            input = '';
            op = add;
            break;
        case '−':
            if(!input) return;
            firstNum = input;
            input = '';
            op = sub;
            break;        
        default:
            input += text;
    }
    render();
}

function initialize(){
    input = firstNum = '';
    op = result = null;
}

function render(){
    var text;
    if (op && !input) {
        text = firstNum;
    } else {
        text = result || input || '0';
    }    
    displayEl.textContent = text;
}

/*----- op functions -----*/
function add(n1, n2){
    return parseFloat(n1) + parseFloat(n2);
}

function sub(n1, n2){
    return parseFloat(n1) - parseFloat(n2);
}