import * as puppeteer from 'puppeteer';
import * as readline from 'readline';

let headless: boolean = false;

// activates i.o stream to prompt user questions
let rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// delays program by x milliseconds (used for scraping)
function delay(time: number | undefined) {
    return new Promise(function (resolve) {
        setTimeout(resolve, time)
    });
}

let diningHall = "Barrett"; // hardcoded for now, to speed up testing

// storing dining hall homepages in a Map
const dict = new Map<string, string>([
    ['Barrett', 'https://asu.campusdish.com/DiningVenues/TempeBarrettDiningCenter']
]);


// returns current [day, hours] in MST
function getDateTime() {
    let date = new Date()
    let day = date.getDay() // 1 = mon, 2= tues, etc
    let hours = date.getHours() // 24-hour clock (17 = 5pm, etc)
    let mins = date.getMinutes()
    return [day, hours, mins] as const

}

// testing
console.log("Barrett Meal Type: " + getBarrettMealType())

// | 0 = not open/null | 1 = breakfast | 2 = brunch | 3 = lunch | 4 = light lunch | 5 = dinner | 6 = no food |
function getBarrettMealType(): number {
    const [day, hour, mins] = getDateTime()
    let hoursmins = hour + (mins / 100) // (ex:) 12:49 = 12.49
    console.log({ hoursmins })
    let mealType = 0

    switch (day) {
        //monday - thurs (all have same hours)
        case 1: case 2: case 3: case 4: {
            if (hour >= 7 && hour < 10.30) mealType = 1
            else if (hour >= 10.30 && hour < 14) mealType = 3
            else if (hour >= 2 && hour < 4.30) mealType = 4
            else if (hour >= 4.30 && hour < 5) mealType = 6
            else if (hour >= 5 && hour < 9) mealType = 5
            else mealType = 0
            break;
        }
        //friday
        case 5: {
            if (hour >= 7 && hour < 10.30) mealType = 1
            else if (hour >= 10.30 && hour < 14) mealType = 2
            else if (hour >= 2 && hour < 4.30) mealType = 3
            else if (hour >= 5 && hour < 7) mealType = 5
            else mealType = 0
            break;
        }
        //saturday
        case 6: {
            if (hour >= 11 && hour < 2) mealType = 2
            else if (hour >= 2 && hour < 4.3) mealType = 4
            else if (hour >= 4.3 && hour < 7) mealType = 5
            break;
        }
        //sunday 
        case 7: {
            if (hour >= 11 && hour < 2) mealType = 2
            else if (hour >= 2 && hour < 4.3) mealType = 4
            else if (hour >= 4.3 && hour < 8) mealType = 5
            break;
        }
    }
    return mealType
}

(async () => {

    //launches browser and navigates to link
    const browser = await puppeteer.launch({ headless: headless });
    const page = await browser.newPage();

    //launches site from dict
    let diningHallUrl: string = dict.get(diningHall)!
    await page.goto(diningHallUrl);

    // set dimensions of screen
    await page.setViewport({ width: 896, height: 896 });

    // close popups
    try { await page.click('#onetrust-close-btn-container > button') } catch (error) { console.error({ error }) }
    try { await page.click('#modal-root-mail-subsription > div > div > div > div > div.sc-jZiqTT.iVZZTI > div.sc-fSUSjI.giaxuC.Header > button') } catch (error) { console.error({ error }) }

    // take screenshots

    delay(5000)
    const grill = await page.$('#\\39 120')
    await grill?.screenshot({ path: 'grill.png' })
    console.log("hello")

    const trueBalance = await page.$('#\\39 122')
    await trueBalance?.screenshot({ path: 'true_balance.png' })



    //await browser.close()
})();