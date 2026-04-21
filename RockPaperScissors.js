const score= JSON.parse(localStorage.getItem('score')) || {
    wins:0,
    losses:0,
    ties:0
    };
const pElem=document.querySelector('.score');
const movesElem=document.querySelector('.moves');
const resultElem=document.querySelector('.result');
changeScore();
function changeScore()
{
    pElem.innerText=`Wins:${score.wins}, Losses:${score.losses}, Ties:${score.ties}`;
}
function resetScore()
{
    const pElem=document.querySelector('.conform');
    pElem.innerHTML=`
    Are you sure you want to reset the score ?
    <button class="yesbtn yb">Yes</button>
    <button class="nobtn nb">No</button>
    `;
    document.querySelector('.yesbtn').addEventListener('click',()=>{
        score.wins=0;
        score.losses=0;
        score.ties=0;
        localStorage.setItem('score',JSON.stringify(score));
        changeScore();
        resultElem.innerText=``;
        movesElem.innerText=``;
        pElem.innerHTML=``;
    });
    document.querySelector('.nobtn').addEventListener('click',()=>
    {
        pElem.innerHTML=``;
    })
}
function pickComputerMove()
{
    let computerMove='';
    let dec= Math.random();
    if(dec>=0&&dec<1/3)
    {
        computerMove='Rock';
    }
    else if(dec>=1/3 && dec<2/3)
    {
        computerMove='Paper';
    }
    else
    {
        computerMove='Scissors';
    }
    return computerMove
}
document.querySelector('.rockbtn').addEventListener('click',() => {
    playGame('Rock')
});
document.querySelector('.paperbtn').addEventListener('click',() => {
    playGame('Paper')
});
document.querySelector('.scissorsbtn').addEventListener('click',() => {
    playGame('Scissors')
});
document.body.addEventListener('keydown',(event) => {
    if(event.key==='r')
        playGame('Rock')
    else if(event.key==='p')
        playGame('Paper')
    else if(event.key==='s')
        playGame('Scissors')
    else if(event.key==='a')
        autoPlay();
    else if(event.key==='Backspace')
        resetScore();
});
document.querySelector('.js-resetbutton').addEventListener('click',() => {
    resetScore();
})
document.querySelector('.js-ap').addEventListener('click',() => {
    autoPlay();
})
function playGame(playerMove)
{
    const computerMove=pickComputerMove();
    let result='';
    if(computerMove===playerMove)
    {
        result='Tie';
        score.ties++;
    }
    else if(playerMove==='Rock' && computerMove==='Scissors' ||
            playerMove==='Paper' && computerMove==='Rock' ||
            playerMove==='Scissors' && computerMove==='Paper'
            )
    {
        result='You Win' ;
        score.wins++;
    }
    else
    {
        result='You Lose';
        score.losses++;
    }

    localStorage.setItem('score',JSON.stringify(score));
    resultElem.innerText=`${result}`
    movesElem.innerHTML=`<div class="s"><span class="c">You</span><img class="emoji" src="Images/${playerMove}-emoji.png"> <img class="emoji" src="Images/${computerMove}-emoji.png"><span class="d">Computer</span></div>`;
    changeScore();
}
let isAutoplaying=false;
let intervalId;
function autoPlay()
{
    const bElem=document.querySelector('.js-ap');
    if(!isAutoplaying)
    {
        intervalId=setInterval(() => {
        const playerMove=pickComputerMove();
        playGame(playerMove);
        },1000)
        isAutoplaying=true;
        bElem.innerText='Stop Play'
    }
    else
    {
        clearInterval(intervalId);
        bElem.innerText='Auto Play';
        isAutoplaying=false;
    }
}