import * as puppeteer from 'puppeteer';
import * as readline from 'readline';

let headless:boolean = false;

// activates i.o stream to prompt user questions
let rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

// delays program by x milliseconds (used for scraping)
function delay(time: number | undefined) {
    return new Promise(function(resolve) { 
        setTimeout(resolve, time)
    });
 }

let diningHall = "Manzanita"; // hardcoded for now, to speed up testing

// storing dining hall homepages in a Map
const dict = new Map<string, string>([
    ['Barrett','https://asu.campusdish.com/DiningVenues/TempeBarrettDiningCenter'],
    ['Hassayampa','https://asu.campusdish.com/DiningVenues/TempeHassayampaDiningCenter'],
    ['Manzanita','https://asu.campusdish.com/DiningVenues/TempeManzanitaResidentialRestaurant'],
    ['Pitchforks','https://asu.campusdish.com/DiningVenues/TempePitchforksRestaurant'],
    ['Tooker','https://asu.campusdish.com/DiningVenues/TookerHouseDining'],
    ['Taylor Place','https://asu.campusdish.com/DiningVenues/DowntownTaylorPlaceResidentialRestaurant'],
    ['Citrus','https://asu.campusdish.com/DiningVenues/PolytechnicCitrusDiningPavilion'],
    ['Verde','https://asu.campusdish.com/DiningVenues/WestVerdeDiningPavilion'],
]);
  
// Asks user what dining hall they want, and stores response
function getNameDiningHall(){
    rl.question('Type name of dining hall:\n1: Barrett\n2:Hassayampa\n3:Manzanita\n4:Pitchforks\n5:Tooker\n6:Taylor Place\n7:Citrus\n8:Verde\nAnswer: ', (answer) => {
    switch(answer.toLowerCase()) {
        case '1':
            diningHall = 'Barrett'
            console.log('Your selection: '+diningHall)
            break;
        case '2':
            diningHall = 'Hassayampa'
            console.log('Your selection: '+diningHall)
            break;
        case '3':
            diningHall = 'Manzanita'
            console.log('Your selection: '+diningHall)
            break;
        case '4':
            diningHall = 'Pitchforks'
            console.log('Your selection: '+diningHall)
        break;
        case '5':
            diningHall = 'Tooker'
            console.log('Your selection: '+diningHall)
            break;
        case '6':
            diningHall = 'Taylor Place'
            console.log('Your selection: '+diningHall)
            break;
        case '7':
            diningHall = 'Citrus'
            console.log('Your selection: '+diningHall)
        case '8':
            diningHall = 'Verde'
            console.log('Your selection: '+diningHall)
        default:
        
        console.log('Invalid answer!');
    }
    rl.close();
    });
}

// returns current [day, hours] in MST
function getDateTime(){

    let date = new Date()
    let day = date.getDay() // 1 = mon, 2= tues, etc
    let hours = date.getHours() // 24-hour clock (17 = 5pm, etc)
    return [day, hours] as const

}

console.log("Tooker Meal Type: "+getTookerMealType())
console.log("Hassayampa Meal Type: " +getHassayampaMealType())
console.log("Manzanita Meal Type: " +getManzanitaMealType())

// Uses current time and date to find which meal it currently is at Tooker Dining Hall
function getTookerMealType():String{

    const [day, hours] = getDateTime()
    let mealType = ""

    /*
    Monday - Thursday: 7 a.m. - 9 p.m.
    Friday: 7 a.m. - 7 p.m.
    Saturday: 10 a.m. - 7 p.m.
    Sunday: 10 a.m. - 8 p.m.
    */

    switch(day){

        // friday
        case 5: {
            if(hours>=7 && hours <11) {
                mealType = "breakfast"
            } else if(hours >= 11 && hours < 14){
                mealType = "lunch"
            } else if(hours >= 14 && hours < 16){
                mealType = "light lunch"
            } else if(hours >= 16 && hours < 19){
                mealType = "dinner"
            } else {
                mealType = "closed"
            }    
            break;
        } 
        // saturday
        case 6: {
            if(hours >= 10 && hours < 14){
                mealType = "brunch"
            } else if(hours >= 14 && hours < 16){
                mealType = "no food"
            } else if(hours >= 16 && hours < 19){
                mealType = "dinner"
            } else {
                mealType = "closed"
            }    

            break;
        }

        // sunday
        case 7: {
            
            if(hours > 10 && hours < 14){
                mealType = "brunch"
            } else if(hours > 14 && hours < 16){
                mealType = "no food"
            } else if(hours > 16 && hours < 20){
                mealType = "dinner"
            } else {
                mealType = "closed"
            }   
            break;
        } 

        // mon - thurs
        default: {      
            if(hours > 7 && hours < 11){
                mealType = "breakfast"
            } else if(hours > 11 && hours < 14){
                mealType = "lunch"
            } else if(hours > 14 && hours < 16){
                mealType = "light lunch"
            } else if(hours > 16 && hours < 21){
                mealType = "dinner"
            } else {
                mealType = "closed"
            }   
            break;
        }

    } 

    return mealType

}

// Uses current time and date to find which meal it currently is at Hassayampa Dining Hall
function getHassayampaMealType():String{
    // mon - thurs 7am - 9pm
    // friday 7am - 7pm
    // saturday 8am - 7pm
    // sunday 8am - 8pm

    const [day, hours] = getDateTime()
    let mealType = ""

    switch(day){
        // friday
        case 5: {
            if(hours>7 && hours <11) {
                mealType = "breakfast"
            } else if(hours > 11 && hours < 14){
                mealType = "lunch"
            } else if(hours > 14 && hours < 16){
                mealType = "light lunch"
            } else if(hours > 16 && hours < 19){
                mealType = "dinner"
            } else {
                mealType = "closed"
            }    
            
            break;
        } 
        // saturday
        case 6: {
             
            if(hours > 8 && hours < 15){
                mealType = "brunch"
            } else if(hours > 15 && hours < 19){
                mealType = "dinner"
            } else {
                mealType = "closed"
            }   
            break;
        }

        // sunday
        case 7: {
            
            if(hours > 8 && hours < 15){
                mealType = "brunch"
            } else if(hours > 15 && hours < 20){
                mealType = "dinner"
            } else {
                mealType = "closed"
            }   
            break;
        } 

        // mon - thurs
        default: {      
            if(hours > 7 && hours < 11){
                mealType = "breakfast"
            } else if(hours > 11 && hours < 14){
                mealType = "lunch"
            } else if(hours > 14 && hours < 16){
                mealType = "light lunch"
            } else if(hours > 16 && hours < 21){
                mealType = "dinner"
            } else {
                mealType = "closed"
            }   
            break;
        }

    } 

    return mealType

}

// Uses current time and date to find which meal it currently is at Pitchforks, Barrett, Manzanita Dining Hall (They all have the same hours)
function getManzanitaMealType():String{ 

    const [day, hours] = getDateTime()
    let mealType = ""

    switch(day){
        // friday
        case 5: {
            if(hours>= 7 && hours < 11) {
                mealType = "breakfast"
            } else if(hours >= 11 && hours < 14){
                mealType = "lunch"
            } else if(hours >= 14 && hours < 16){
                mealType = "light lunch"
            } else if(hours >= 16 && hours < 19){
                mealType = "dinner"
            } else {
                mealType = "closed"
            }    
            break;
        } 
        // saturday
        case 6: {
            if(hours >= 10 && hours < 14){
                mealType = "brunch"
            } else if(hours >= 14 && hours < 16){
                mealType = "no food"
            } else if(hours >= 16 && hours < 19){
                mealType = "dinner"
            } else {
                mealType = "closed"
            }    
            break;
        }

        // sunday
        case 7: {
            
            if(hours >= 10 && hours < 14){
                mealType = "brunch"
            } else if(hours >= 14 && hours < 16){
                mealType = "no food"
            } else if(hours >= 16 && hours < 20){
                mealType = "dinner"
            } else {
                mealType = "closed"
            }   
            break;
        } 

        // mon - thurs
        default: {      
            if(hours >= 7 && hours < 11){
                mealType = "breakfast"
            } else if(hours >= 11 && hours < 14){
                mealType = "lunch"
            } else if(hours >= 14 && hours < 16){
                mealType = "light lunch"
            } else if(hours >= 16 && hours < 21){
                mealType = "dinner"
            } else {
                mealType = "closed"
            }   
            break;
        }
    }
return mealType
}

(async () => {
    if(diningHall ==''){
        await(getNameDiningHall())
    }

    // chooses which MealType function to call based on DiningHall
    switch(diningHall){
        case "Barrett":{

            break;
        }
        case "Hassayampa":{

            break;
        }
        case "Manzanita":{

            break;
        }
        case "Pitchforks":{

            break;
        }
        case "Tooker":{
            await getTookerMealType();
            break;
        }
        case "Taylor Place":{

            break;
        }
        case "Citrus":{

            break;
        }
        case "Verde":{

            break;
        }
    }

    //launches browser and navigates to link
    const browser = await puppeteer.launch({headless:headless});
    const page = await browser.newPage();
    await page.goto('https://asu.campusdish.com/DiningVenues',{ waitUntil: 'networkidle0' });

    //clicks 'x' on popups
    await page.click('#onetrust-accept-btn-handler');
    await page.click('#modal-root-mail-subsription > div > div > div > div > div.sc-caXVBt.elLbBy > div.sc-eGAhfa.gGtvhK.Header > button');
    //await page.waitForNetworkIdle();

    //launches site from dict
    
    //getNameDiningHall();
    //await delay(4);
    let diningHallUrl:string = dict.get(diningHall)!
    await page.goto(diningHallUrl);


    // navigating buttons for meal

    /*

    await page.click('#react_menus > nav > div.sc-brCFrO.eKXXzC > div.sc-eGAhfa.lctCvP.DateMealFilter > div > button')
    await page.click('#modal-root > div > div > div > div > div.sc-gXmSlM.iTlHgL > div > div > div.sc-yeoIj.eGQvq > div > div > div.css-18hlnx5 > div > svg')

    */

    //const element = page.waitForSelector('#modal-root > div > div > div > div > div.sc-gXmSlM.iTlHgL > div > div > div.sc-yeoIj.eGQvq > div > div > div.css-1d8n9bt > div.css-vq1ixw-singleValue');
    //await page.click('#modal-root > div > div > div > div > div.sc-gXmSlM.iTlHgL > div > div > div.sc-yeoIj.eGQvq > div > div > div.css-1d8n9bt > div.css-vq1ixw-singleValue')

    // navigate menu, from default option -> option below

    /*
    await page.click('#modal-root > div > div > div > div > div.sc-gXmSlM.iTlHgL > div > div > div.sc-yeoIj.eGQvq > div > div > div.css-1d8n9bt > div.css-ackcql');
    await page.click('#modal-root > div > div > div > div > div.sc-gXmSlM.iTlHgL > div > div > div.sc-yeoIj.eGQvq > div > div > div.css-1d8n9bt > div.css-ackcql');
    await page.keyboard.press('ArrowDown')
    await page.keyboard.press('Enter')
    //await page.keyboard.press('Enter')
    */

   // await page.click('#modal-root > div > div > div > div > div.sc-cCsOjp.gvlGSX > button.sc-bczRLJ.sc-gsnTZi.gObyWR.SlTeX.Done')

   // set dimensions of screen
   await page.setViewport({ width: 896, height: 896 });
   delay(2000)

   


    if(diningHall == 'Tooker'){

        // ensure a random element on the page is loaded
        await page.waitForSelector('#\\32 2794')

        // finding and storing selectors for each meal type
        const dailyRoot = await page.$('#\\32 2794')
        const homeZone = await page.$('#\\32 2792')
        const grill = await page.$('#\\32 2793')
        const pizza = await page.$('#\\32 2796')
        const trueBalance = await page.$('#\\33 0185')

        // screenshotting each selector
        await dailyRoot?.screenshot({path: 'Daily_Root.png'})
        await homeZone?.screenshot({path: 'HomeZone.png'})
        await grill?.screenshot({path: 'Grill.png'})
        await pizza?.screenshot({path: 'Pizza.png'})
        await trueBalance?.screenshot({path: 'TrueBalance.png'})

    } else if(diningHall == 'Hassayampa'){

        await page.waitForSelector('#\\33 0687')

        // finding and storing selectors for each meal type

        const dailyRoot = await page.$('#\\33 0687')
        const homeZone = await page.$('#\\34 2068')
        const grill = await page.$('#\\34 2074')
        const pizza = await page.$('#\\34 2072')
        const trueBalance = await page.$('#\\34 2070')

        // screenshotting each selector

        await dailyRoot?.screenshot({path: 'Daily_Root.png'})
        await homeZone?.screenshot({path: 'Home_Zone.png'})
        await grill?.screenshot({path: 'Grill.png'})
        await pizza?.screenshot({path: 'Pizza.png'})
        await trueBalance?.screenshot({path: 'True_Balance.png'})

    } else if(diningHall == 'Manzanita'){

        let [day, hours] = getDateTime()
        await page.waitForSelector('#\\39 139')

        // finding and storing selectors for each meal type

        const homeZone = await page.$('#\\39 1398')
        const grill = await page.$('#\\34 2074')
        const pizza = await page.$('#\\39 140')
        const trueBalance = await page.$('#\\34 2070')
        const sazon = await page.$('#\\31 3991')
        const homezone = await page.$('#\\39 139')

        // daily root and grill only opens at dinner on saturday
        if(day == 6 && getManzanitaMealType()=='Dinner'){
            let dailyRoot = await page.$('#\\33 0687')
            await dailyRoot?.screenshot({path: 'Daily_Root.png'})
        }

        switch(day){
            case(1):{

                
            break;
            }
        }

        //

        // screenshotting each selector
        await sazon?.screenshot({path: 'sazon.png'})
        await homezone?.screenshot({path: 'Home_Zone.png'})
        await grill?.screenshot({path: 'Grill.png'})
        await pizza?.screenshot({path: 'Pizza.png'})
        await trueBalance?.screenshot({path: 'True_Balance.png'})

    }

    await browser.close()
})();