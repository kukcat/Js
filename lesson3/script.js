// let showText = () =>{
//     console.log('show something')
// }


// let timerId = setInterval(() => console.log('tick'), 2000);

const USER_URL = 'http://swpai.dev/api/people/1'

async function showHero(){
    for(i=1; i<=10; i++){
        let response = await fetch(`https://swapi.dev/api/people/${i}`);
        let userInfo = await response.json();
        console.log(userInfo.name)
        console.log(userInfo.created)

    }
}

showHero()